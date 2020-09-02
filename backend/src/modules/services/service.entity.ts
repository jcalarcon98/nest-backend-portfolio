import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Service extends BaseEntity{

  @PrimaryGeneratedColumn()
  id:  number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title : string;

  @Column('text')
  description : string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image : string;

  @ManyToOne(
    type => User,
    user => user.services,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}
