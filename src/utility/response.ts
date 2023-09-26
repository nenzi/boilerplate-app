import { HttpStatus } from '@nestjs/common';

export interface IRes {
  status: boolean;
  message: string;
  data?: any;
}

export class Res {
  code: HttpStatus;
  status: boolean;
  message: string;
  data: any;
  constructor() {}

  success(data?: any) {
    this.code = HttpStatus.OK;
    this.message = 'success';
    this.status = true;
    this.data = data || null;
    return this;
  }

  fail(code?: HttpStatus) {
    this.code = code ? code : HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = 'success';
    this.status = true;
    this.data = null;
    return this;
  }

  response(): IRes {
    return { message: this.message, status: this.status, data: this.data };
  }
}
