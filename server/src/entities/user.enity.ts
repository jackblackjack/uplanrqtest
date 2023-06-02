import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_entity')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;
}
