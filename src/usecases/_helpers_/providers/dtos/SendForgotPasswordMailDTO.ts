type SendForgotPasswordMailDTO = {
  to: string;
  subject: string;
  variables: any;
  path: string;
};

export { SendForgotPasswordMailDTO };
