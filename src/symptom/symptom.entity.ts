import { ConsultationEntity } from '../consultation/consultation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SymptomEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column()
    typeOfInjury: string;
    
    @Column()
    specialty: string;

    @OneToMany(() => ConsultationEntity, consultation => consultation.patient)
    consultations: ConsultationEntity[];
    
}
