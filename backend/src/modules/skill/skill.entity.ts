import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { SkillLevelsEnum } from '../../common/enums/skill-levels.enum';
import { User } from '../user/user.entity';

@Entity()
export class Skill extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id:  number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name : string;

  @Column()
  level : SkillLevelsEnum;

  @Column('text')
  description : string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image : string;

  @ManyToOne(
    type => User,
    user => user.skills,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}