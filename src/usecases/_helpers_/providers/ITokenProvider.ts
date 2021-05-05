import { GenerateTokenDTO } from '@/usecases/_helpers_/providers/dtos/GenerateTokenDTO';
import { VerifyTokenDTO } from '@/usecases/_helpers_/providers/dtos/VerifyTokenDTO';
import { DecodeTokenDTO } from '@/usecases/_helpers_/providers/dtos/DecodeTokenDTO';

export interface ITokenProvider {
  generateToken(data: GenerateTokenDTO): string;
  verifyToken(data: VerifyTokenDTO): string | object;
  decode(token: string): DecodeTokenDTO;
}
