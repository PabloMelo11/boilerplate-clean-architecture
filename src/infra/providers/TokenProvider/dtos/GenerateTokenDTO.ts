type GenerateTokenDTO = {
  payload?: string | object | Buffer;
  secret: string;
  subject: string;
  expiresIn: string;
};

export { GenerateTokenDTO };
