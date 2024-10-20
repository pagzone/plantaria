import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Tutorial } from "./tutorial";
import { Story } from "./story";
import { Favorite } from "./favorite";

@Entity({
	name: "users",
})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", nullable: true })
	email: string;

	@Column({ type: "text", nullable: true })
	password_hash: string;

	@Column({ type: "text", nullable: true })
	principal_id: string;

	@Column({ type: "text" })
	name: string;

	@Column({ type: "text", nullable: true })
	location: string;

	@Column({ type: "text", nullable: true })
	avatar_link: string;

	@CreateDateColumn()
	created_at: Date;

	@OneToMany(() => Tutorial, (tutorial) => tutorial.user)
	tutorials: Tutorial[];

	@OneToMany(() => Story, (story) => story.user)
	stories: Story[];

	@OneToMany(() => Favorite, (favorite) => favorite.user)
	favorites: Favorite[];
}
