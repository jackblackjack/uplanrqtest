import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlanDTO } from '../dto/create-plan.dto';
import { PlansService } from './plans.service';

@UseGuards(AuthGuard('jwt'))
@Controller('plan')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Post()
  async createOne(@Body() planBody: CreatePlanDTO) {
    return this.plansService.createOne(planBody);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.plansService.findOne(id);
  }
}
