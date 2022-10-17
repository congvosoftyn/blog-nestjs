import { UserEntity } from './../users/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: "datetime" })
    date: Date;

    @ManyToOne(() => UserEntity, user => user.post, { cascade: ["insert", "remove", "update"] })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @Column({ type: "int" })
    userId: number;
}
