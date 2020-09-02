import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Phone extends BaseEntity{

  @PrimaryGeneratedColumn()
  id : number

  @Column()
  number : string;

  @ManyToOne(
    type => User,
    user => user.phones,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}