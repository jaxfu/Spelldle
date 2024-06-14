package auth

import (
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"spelldle.com/server/shared/types"
	"strconv"
	"time"
)

func CreateJWTFromUserID(userID types.UserID) (string, error) {
	var (
		key []byte
		t   *jwt.Token
		s   string
		err error
	)

	expiryTime := time.Now().Unix() + 604800

	key = []byte(os.Getenv("JWT_SECRET"))
	t = jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"iss": "spelldle.com/api",
			"sub": strconv.FormatUint(uint64(userID), 10),
			"exp": expiryTime,
		})
	s, err = t.SignedString(key)
	if err != nil {
		return "", errors.New("error creating signed string")
	}

	return s, nil
}

func ParseAndValidateJWT(tokenString string, secretKey []byte) (*jwt.Token, error) {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Make sure that the token's algorithm matches the expected algorithm
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		return nil, err
	}

	// Validate the token
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token, nil
}
