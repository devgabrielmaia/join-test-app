export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/login',
  registerEndpoint: '/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
