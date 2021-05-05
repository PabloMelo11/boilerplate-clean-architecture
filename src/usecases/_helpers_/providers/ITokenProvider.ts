import { GenerateTokenDTO } from '@/infra/providers/TokenProvider/dtos/GenerateTokenDTO';
import { VerifyTokenDTO } from '@/infra/providers/TokenProvider/dtos/VerifyTokenDTO';

export interface ITokenProvider {
  generateToken(data: GenerateTokenDTO): string;
  verifyToken(data: VerifyTokenDTO): string | object;
}
