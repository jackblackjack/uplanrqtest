import { IsJSON, IsString } from 'class-validator';

export class CreatePlanDTO {
  @IsString()
  id: string;

  @IsJSON()
  data: JSON;
}
