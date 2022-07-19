import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  message: string;
}
