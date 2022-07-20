import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  message: string;
}

export const sendMessageExample: SendMessageDto = {
  message: 'Hello everyone, Be reminded of next standup come friday!',
};
