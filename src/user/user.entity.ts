import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';


@Entity()
export class UserEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column({ unique: true })
 email: string;
 
 @Column()
 password: string;

 @Column("text", { array: true })
 roles: string[];

}