const apiURL = process.env.BASE_URL;

export default class Config {
  /* auth */
  static GOOGLE_SIGN_UP = `${apiURL}/api/auth/google-auth-signup`;
  static GOOGLE_SIGN_IN = `${apiURL}/api/auth/google-auth-signin`;
  static GET_USER_INFO = `${apiURL}/api/auth/get-userinfo`;
  static REGISTER = `${apiURL}/api/auth/register`;
  static LOGIN = `${apiURL}/api/auth/login`;
}
