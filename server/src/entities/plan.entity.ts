import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('plans_entity')
export class PlanEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'jsonb', nullable: false })
  data: JSON;
}
