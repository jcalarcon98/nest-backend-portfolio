import { PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export abstract class Content extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
  })
  institution : string;

  @Column({ type: "int" })
  initYear : number;

  @Column({ type: "int" })
  endYear : number;

  @Column('text', {
    nullable: true
  })
  description : string;

}