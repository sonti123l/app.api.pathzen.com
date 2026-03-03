class AuthController {
  getLoginDetails<
    T extends string,
    V extends string,
    K extends string | undefined,
  >(email: T, password: V, authorizationToken: K) {
    const emailRegex =
      /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

    if (emailRegex.test(email) && !password) {
        
    } else {
    }
  }
}

export const authController = new AuthController();
