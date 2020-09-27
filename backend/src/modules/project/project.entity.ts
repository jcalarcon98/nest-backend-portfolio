import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ProjectStatusEnum } from '../../common/enums/project-status.enum';

/**
 * Project Entity
 * Contains the all properties a user will have.
 */
@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  urlDemo: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true
  })
  urlRepository: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image: string;

  @Column()
  status : ProjectStatusEnum;

  @ManyToOne(
    type => User,
    user => user.projects,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

}
