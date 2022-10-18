import { UserEntity } from './../users/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    img: string;

    @Column({ nullable: true, })
    cat: string;

    @ManyToOne(() => UserEntity, user => user.post, { cascade: ["insert", "remove", "update"] })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @Column({ type: "int" })
    userId: number;

    @CreateDateColumn({type: 'timestamp' })
    createdAt: Date;
}
