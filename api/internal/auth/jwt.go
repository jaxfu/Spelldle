package auth

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"strconv"
	"time"
)

func CreateJWTFromUserID(userID uint64) (string, error) {
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
			"sub": strconv.FormatUint(userID, 10),
			"exp": strconv.FormatInt(expiryTime, 10),
		})
	s, err = t.SignedString(key)
	if err != nil {
		return "", errors.New("error creating signed string")
	}

	return s, nil
}
