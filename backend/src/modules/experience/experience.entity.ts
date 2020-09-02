import { Content } from '../../common/entities/content.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Experience extends Content{

  @Column({
    type: 'varchar',
    length: 200,
  })
  role : string;

  @ManyToOne(
    type => User,
    user => user.experiences,
    { eager: false },
  )
  user: User;
  
  @Column()
  userId: number;
}