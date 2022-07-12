interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

type UserRegister = Omit<User, 'id' | 'createdAt'>;

export { User, UserRegister };
