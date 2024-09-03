package routes

import (
	crypto "crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	rand "math/rand"
	"net/http"

	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
	"spelldle.com/server/internal/auth"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"

	"github.com/gin-gonic/gin"
)

type responseRegister struct {
	Valid  bool            `json:"valid"`
	Tokens types.AllTokens `json:"tokens"`
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
		gameSession, err := spawnNewGameSession(userID, db)
		fmt.Printf("created game session: %+v\n", gameSession)
		if err := db.InsertGameSession(gameSession); err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			fmt.Printf("error inserting game session: %+v", err)
			return
		}

		// initialize guesses.spells
		if err := db.InitializeGuessSpell(gameSession.GameSessionID); err != nil {
			ctx.JSON(http.StatusInternalServerError, response)
			fmt.Printf("error in InitializeGuessSpell: %+v", err)
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

// generate new game session
func spawnNewGameSession(userID types.UserID, db *dbHandler.DBHandler) (types.GameSession, error) {
	var session types.GameSession
	session.GameSessionID = types.GameSessionID(fmt.Sprintf("%d", userID))
	session.UserID = userID
	session.CategoryRounds = 0
	session.SpellRounds = 0

	count, err := db.GetSpellsCount()
	if err != nil {
		return session, err
	}

	session.SpellID = randomUint(count)

	return session, nil
}

func randomUint(count uint) uint {
	return uint(rand.Intn(int(count))) + 1
}
