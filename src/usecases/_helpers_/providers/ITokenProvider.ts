import { GenerateTokenDTO } from '@/infra/providers/TokenProvider/dtos/GenerateTokenDTO';
import { VerifyTokenDTO } from '@/infra/providers/TokenProvider/dtos/VerifyTokenDTO';
import { DecodeTokenDTO } from '@/infra/providers/TokenProvider/dtos/DecodeTokenDTO';

export interface ITokenProvider {
  generateToken(data: GenerateTokenDTO): string;
  verifyToken(data: VerifyTokenDTO): string | object;
  decode(token: string): DecodeTokenDTO;
}
