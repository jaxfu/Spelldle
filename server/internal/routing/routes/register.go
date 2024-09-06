package routes

import (
	crypto "crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"net/http"

	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
	"spelldle.com/server/internal/auth"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"

	"github.com/gin-gonic/gin"
)

type responseRegister struct {
	Tokens types.AllTokens `json:"tokens"`
	Valid  bool            `json:"valid"`
}

// Register recieves a RequestPayloadRegister, then checks if the username is valid,
// inserts into user_info, generates UserDataSession, then sends a ResponseRegisterLogin
func Register(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var registerPayload types.RequestPayloadRegister
		response := responseRegister{
			Valid: false,
		}

		// Bind request body
		if err := ctx.BindJSON(&registerPayload); err != nil {
			fmt.Printf("Error binding json: %+v\n", err)
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}
		fmt.Printf("%+v\n", registerPayload)

		// Check if username currently exists
		_, err := db.GetUserIDByUsername(registerPayload.Username)
		if err != nil {
			if !errors.Is(err, pgx.ErrNoRows) {
				fmt.Printf("Error checking username validity: %+v\n", err)
				ctx.JSON(http.StatusInternalServerError, response)
				return
			}
		} else {
			fmt.Printf("Username '%s' already exists", registerPayload.Username)
			ctx.JSON(http.StatusUnauthorized, response)
			return
		}

		// Insert User
		userID, err := db.InsertUser()
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			fmt.Printf("Error inserting user: %+v\n", err)
			return
		}

		// salt and hash password
		salt, err := generateSalt(16)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			fmt.Printf("error generating salt: %+v\n", err)
			return
		}

		hashed, err := bcrypt.GenerateFromPassword([]byte(registerPayload.Password+salt), bcrypt.DefaultCost)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			fmt.Printf("error hashing password: %+v\n", err)
			return
		}

		UserData := types.UserData{
			UserID:    userID,
			Username:  registerPayload.Username,
			Password:  string(hashed),
			Salt:      salt,
			FirstName: registerPayload.FirstName,
			LastName:  registerPayload.LastName,
		}

		// Insert UserData
		if err := db.InsertUserData(UserData); err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			fmt.Printf("Error inserting user: %+v\n", err)
			return
		}

		// create and insert game session
		gameSession, err := utils.SpawnNewGameSession(userID, db)
		fmt.Printf("created game session: %+v\n", gameSession)
		if err := db.InsertGameSession(gameSession); err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			fmt.Printf("error spawning game session: %+v", err)
			return
		}

		// generate JWT
		accessToken, err := auth.CreateJWTFromUserID(userID)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			return
		}

		response.Valid = true
		response.Tokens = types.AllTokens{
			AccessToken:  accessToken,
			RefreshToken: accessToken,
		}

		ctx.JSON(http.StatusCreated, response)

		// Backup
		//cmd := exec.Command("./backup.sh")
		//if err := cmd.Run(); err != nil {
		//	log.Printf("cError backing up Postgres: %+v\n", err)
		//}
	}
}

// generate a random salt of specified length
func generateSalt(size int) (string, error) {
	salt := make([]byte, size)
	_, err := io.ReadFull(crypto.Reader, salt)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(salt), nil
}
