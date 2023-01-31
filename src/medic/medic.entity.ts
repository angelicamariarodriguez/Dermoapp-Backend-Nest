import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedicEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column()
    name: string;
    
    @Column()
    lastName: string;
    
    @Column()
    country: string;
    
    @Column()
    profLicense: string;
   
    @Column()
    profilePicture: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    specialty: string;

    //@OneToMany(() => ConsultationEntity, consultation => consultation.medic)
    //consultations: ConsultationEntity[];
}
