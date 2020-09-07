import { Experience } from '../experience/experience.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Project } from '../project/project.entity';

import * as bcrypt from 'bcryptjs';
import { Service } from '../services/service.entity';
import { Skill } from '../skill/skill.entity';
import { Education } from '../education/education.entity';
import { Social } from '../social/social.entity';
import { Phone } from '../phone/phone.entity';
/**
 * User Entity
 * Contains the all properties a user will have.
 */
@Entity()
export class User extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar',length: 60})
  firstNames: string;

  @Column({type: 'varchar',length: 80})
  lastNames: string;

  @Column('varchar')
  password: string;

  @Column({type: 'text', nullable: true})
  description: string;

  @Column({type: 'varchar', length: 50, unique: true})
  email: string;

  @Column({type: 'varchar', length: 30})
  country: string;

  @Column({type: 'varchar', length: 30})
  city: string;

  @Column({type: 'varchar', length: 100, nullable: true})
  address: string;

  @Column({type: 'varchar', nullable: true})
  image: string;

  @Column({default: false})
  confirmed: boolean;

  @Column({nullable: true})
  apiToken : string;

  @OneToMany(
    type => Project,
    project => project.user,
    { eager: true },
  )
  projects: Project[];

  @OneToMany(
    type => Service,
    service => service.user,
    { eager: true },
  )
  services: Service[];

  @OneToMany(
    type => Skill,
    skill => skill.user,
    { eager: true },
  )
  skills: Skill[];

  @OneToMany(
    type => Education,
    education => education.user,
    { eager: true },
  )
  educations: Education[];

  @OneToMany(
    type => Experience,
    experience => experience.user,
    { eager: true },
  )
  experiences: Experience[];

  @OneToMany(
    type => Social,
    social => social.user,
    { eager: true },
  )
  socials: Social[];
  
  @OneToMany(
    type => Phone,
    phone => phone.user,
    { eager: true },
  )
  phones: Phone[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
