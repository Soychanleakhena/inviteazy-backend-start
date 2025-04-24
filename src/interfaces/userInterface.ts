export interface IUser {
  id?: string;
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "public" | "tourist";
  phone_number?: string;
  profile_picture?: string;
  address?: string;
}

export interface IUserWithoutPassword extends Omit<IUser, "password"> {}

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(user: Omit<IUser, "id">): Promise<IUser>;
}

export interface IUserService {
  getAllUsers(): Promise<IUserWithoutPassword[]>;
  getUserById(id: string): Promise<IUserWithoutPassword>;
  createUser(user: Omit<IUser, "id">): Promise<{ user: IUser; token: string }>;
  login(email: string, password: string): Promise<{ user: IUserWithoutPassword; token: string }>;
}
