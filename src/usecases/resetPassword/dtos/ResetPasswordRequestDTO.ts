type ResetPasswordRequestDTO = {
  token: string;
  password: string;
  password_confirmation: string;
};

export { ResetPasswordRequestDTO };
