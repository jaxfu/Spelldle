package auth

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"
	"testing"
)

func TestJWT(t *testing.T) {
	if err := godotenv.Load("../../config.env"); err != nil {
		fmt.Printf("Error loading env vars: %+v\n", err)
		os.Exit(1)
	}

	t.Run("JWT creation test", func(t *testing.T) {
		jwt, err := CreateJWTFromUserID(1)
		if err != nil {
			t.Errorf("Error creating JWT: %+v\n", err)
		}
		fmt.Println(jwt)
	})
}
