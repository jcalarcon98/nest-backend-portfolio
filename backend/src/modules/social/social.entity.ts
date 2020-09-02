import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Social extends BaseEntity{

  @PrimaryGeneratedColumn()
  id : number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name : string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  url : string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image : string;

	@ManyToOne(
    type => User,
    user => user.socials,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}