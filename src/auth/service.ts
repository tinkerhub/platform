export interface AuthIinterface {
  getCurrentUser: (user: string) => { message: string };
}

export class AuthService implements AuthIinterface {
  getCurrentUser(user: string) {
    return {
      message: user,
    };
  }
}
