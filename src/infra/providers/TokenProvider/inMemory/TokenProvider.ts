import { ITokenProvider } from '@/domain/usecases/_common_/providers/ITokenProvider';

import { GenerateTokenDTO } from '@/domain/usecases/_common_/providers/dtos/GenerateTokenDTO';
import { VerifyTokenDTO } from '@/domain/usecases/_common_/providers/dtos/VerifyTokenDTO';
import { DecodeTokenDTO } from '@/domain/usecases/_common_/providers/dtos/DecodeTokenDTO';

interface IPayload {
  payload: string | object;
}

class TokenProviderInMemory implements ITokenProvider {
  private tokens: string[] = [];
  private payloads: IPayload[] = [];

  public generateToken({
    payload,
    secret,
    subject,
    expiresIn = '1d',
  }: GenerateTokenDTO): string {
    const token = `${subject}.${secret}.${expiresIn}`;

    if (payload) {
      this.payloads.push({ payload: payload });
    }

    this.tokens.push(token);

    return token;
  }

  public verifyToken({ token }: VerifyTokenDTO): string | object {
    const [subject] = token.split('.');

    let keyPayload = null;
    let valuePayload = null;

    const data: any = {};

    if (this.payloads) {
      this.payloads.forEach(payload => {
        let payloadValuesArray = null;
        let payloadKeysArray = null;

        for (const key in payload) {
          payloadKeysArray = Object.keys(payload[key]);
          payloadValuesArray = Object.values(payload[key]);
        }

        keyPayload = payloadKeysArray[0];
        valuePayload = payloadValuesArray[0];
      });

      data[keyPayload] = valuePayload;
      data.sub = subject;

      return data;
    }

    return subject;
  }

  public decode(token: string): DecodeTokenDTO {
    const [subject] = token.split('.');

    return {
      sub: subject,
    };
  }
}

export { TokenProviderInMemory };
