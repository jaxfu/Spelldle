package types

type AccessToken struct {
	AccessToken string `json:"access_token"`
}

type RefreshToken struct {
	RefreshToken string `json:"refresh_token"`
}

type AllTokens struct {
	AccessToken
	RefreshToken
}
