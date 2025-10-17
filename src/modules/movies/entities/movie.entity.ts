import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    externalId: string;

    @Column({ default: 'Local' })
    source: string;

    @Column()
    title: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column({ type: 'timestamptz', nullable: true })
    releaseDate: Date | null;

    @Column({ default: '' })
    description: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata: Record<string, any> | null;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}
