import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Options,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlanDTO } from '../dto/create-plan.dto';
import { PlansService } from './plans.service';
import { Request as ExpressRequest } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('plan')
export class PlansController {
  constructor(private plansService: PlansService) { }

  //@UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Options()
  async getOptions(@Request() req: ExpressRequest) {
    //return this.authService.login(req.user);
  }

  @Post()
  async createOne(@Body() planBody: CreatePlanDTO) {
    return this.plansService.createOne(planBody);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.plansService.findOne(id);
  }
}
