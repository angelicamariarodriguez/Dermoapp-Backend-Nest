import { MedicEntity } from '../medic/medic.entity';
import { PatientEntity } from '../patient/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConsultationEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 shape: string;
 
 @Column()
 numberOfInjuries: string;
 
 @Column()
 distribution: string;
 
 @Column()
 comment: string;

 @Column()
 image: string; //cambiar cuando se defina como se va a hacer el upload

 @Column()
 creationDate: string;

 @Column()
 typeOfInjury: string;

 @Column()
 specialty: string;

 @Column()
 diagnosis: string;

 @Column()
 asigned: boolean;

 @ManyToOne(() => MedicEntity, medic => medic.consultations)
 medic: MedicEntity;

 @ManyToOne(() => PatientEntity, patient => patient.consultations)
 patient: PatientEntity;

 
    
}
