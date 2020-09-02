import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Content } from '../../common/entities/content.entity';

@Entity()
export class Education extends Content{

  @Column({
    type: 'varchar',
    length: 100,
  })
  title : string;
  
  @ManyToOne(
    type => User,
    user => user.educations,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}