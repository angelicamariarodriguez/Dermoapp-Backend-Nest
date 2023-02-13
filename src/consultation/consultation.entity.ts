import { MedicEntity } from '../medic/medic.entity';
import { PatientEntity } from '../patient/patient.entity';
import { SymptomEntity } from '../symptom/symptom.entity';
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

 @ManyToOne(() => SymptomEntity, symptom => symptom.consultations)
 symptom: SymptomEntity;

 @ManyToOne(() => MedicEntity, medic => medic.consultations)
 medic: MedicEntity;

 @ManyToOne(() => PatientEntity, patient => patient.consultations)
 patient: PatientEntity;
    
}
