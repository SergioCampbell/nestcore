import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  rol: string;

  @DeleteDateColumn()
  deleteAt: Date;
}
