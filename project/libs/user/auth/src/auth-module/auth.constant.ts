export enum AuthError {
  UserExists = 'User with this email exists',
  UserNotFound = 'User not found',
  UserCredentialsWrong = 'User Password or Login is wrong',
}

export const AuthResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  UserFound: 'User found',
  UserCreated: 'The new user has been successfully created.',
} as const;
