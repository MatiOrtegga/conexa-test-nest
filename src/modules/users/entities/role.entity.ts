import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    // 👇 Relación inversa con User
    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
