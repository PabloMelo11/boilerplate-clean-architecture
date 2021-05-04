import { sign, verify } from 'jsonwebtoken';

import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';

import { GenerateTokenDTO } from '@/infra/providers/TokenProvider/dtos/GenerateTokenDTO';
import { VerifyTokenDTO } from '@/infra/providers/TokenProvider/dtos/VerifyTokenDTO';

class TokenProviderJsonWebToken implements ITokenProvider {
  public generateToken({
    payload = {},
    secret,
    subject,
    expiresIn,
  }: GenerateTokenDTO): string {
    const token = sign(payload, secret, {
      subject,
      expiresIn,
    });

    return token;
  }

  public verifyToken({ token, secret }: VerifyTokenDTO): string | object {
    return verify(token, secret);
  }
}

export { TokenProviderJsonWebToken };
