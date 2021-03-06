import { GenerateTokenDTO } from '@/domain/usecases/_common_/providers/dtos/GenerateTokenDTO';
import { VerifyTokenDTO } from '@/domain/usecases/_common_/providers/dtos/VerifyTokenDTO';
import { DecodeTokenDTO } from '@/domain/usecases/_common_/providers/dtos/DecodeTokenDTO';

export interface ITokenProvider {
  generateToken(data: GenerateTokenDTO): string;
  verifyToken(data: VerifyTokenDTO): string | object;
  decode(token: string): DecodeTokenDTO;
}
