import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';
import { GenerateTokenDTO } from '@/infra/providers/TokenProvider/dtos/GenerateTokenDTO';
import { VerifyTokenDTO } from '@/infra/providers/TokenProvider/dtos/VerifyTokenDTO';

interface IPayload {
  token: string | object;
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
      this.payloads.push({ token: payload });
    }

    this.tokens.push(token);

    return token;
  }

  public verifyToken({ token }: VerifyTokenDTO): string | object {
    const [subject] = token.split('.');

    if (this.payloads) {
      const payload = this.payloads.find(payload => {
        for (const key in this.payloads) {
          if (key === token) {
            return Object.values(payload)[0];
          }
        }
      });

      return { payload, subject };
    }

    return subject;
  }
}

export { TokenProviderInMemory };