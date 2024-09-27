import { makeRegisterCustomerController } from '@/factories';
import { makeNestRouter } from '@/factories/adapter/nest/nest-router-factory';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RegisterCustomerRoutesDto } from './dtos';

@ApiTags('User')
@Controller('/user')
export class RegisterCustomerRoute {
  @Post()
  @ApiOperation({
    summary: 'Registra um novo usuário',
    description: 'Cadastra informações referente ao novo usuário',
  })
  @ApiBody({ type: RegisterCustomerRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Usuário Cadastrado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  async handle(@Req() req: Request, @Res() res: Response): Promise<void> {
    const adapterNest = makeNestRouter(makeRegisterCustomerController());
    await adapterNest.adapt(req, res);
  }
}
