import { sign, verify, decode } from 'jsonwebtoken';

import { ITokenProvider } from '@/usecases/_helpers_/providers/ITokenProvider';

import { GenerateTokenDTO } from '@/usecases/_helpers_/providers/dtos/GenerateTokenDTO';
import { VerifyTokenDTO } from '@/usecases/_helpers_/providers/dtos/VerifyTokenDTO';
import { DecodeTokenDTO } from '@/usecases/_helpers_/providers/dtos/DecodeTokenDTO';

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

  public decode(token: string): DecodeTokenDTO {
    return decode(token) as DecodeTokenDTO;
  }
}

export { TokenProviderJsonWebToken };