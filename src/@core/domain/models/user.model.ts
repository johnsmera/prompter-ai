export interface IUser {
	id: string;
	name: string;
  email: string;
	createdAt: string;
}

export class User implements IUser {
	id: string;
	name: string;
	createdAt: string;
  email: string;

	constructor(data: IUser) {
		this.id = data.id;
		this.name = data.name;
		this.createdAt = data.createdAt;
    this.email = data.email;
	}
}
