import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDTO } from '../dto/create-plan.dto';
import { PlanEntity } from '../entities/plan.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private plansRepository: Repository<PlanEntity>,
  ) {}

  async createOne(dto: CreatePlanDTO): Promise<any> {
    const entity: PlanEntity = dto;
    return this.plansRepository.save(this.plansRepository.create(entity));
  }

  async findOne(id: string): Promise<any> {
    return this.plansRepository.findOneByOrFail({ id });
  }
}
