import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PatientEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 name: string;
 
 @Column()
 email: string;
 
 @Column()
 password: string;
 
 @Column()
 birthDate: Date;

 @Column()
 country: string;

 @Column()
 skinType: string;

 @Column()
 profilePicture: string;

 //@OneToMany(() => ConsultationEntity, consultation => consultation.patient)
 //consultations: ConsultationEntity[];
}