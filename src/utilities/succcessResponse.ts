import { Logger } from '@nestjs/common';

export class SuccessResponse {
  message: string;
  data: unknown;
  logger = new Logger();

  constructor(message = 'Successful', data: unknown = null) {
    this.message = message;
    this.data = data;
  }

  toJSON() {
    this.logger.log(`(LOGS) Success - ${this.message}`);

    if (this.data) {
      return {
        status: 'success',
        message: this.message,
        data: this.data,
      };
    }

    return {
      status: 'success',
      message: this.message,
    };
  }
}
