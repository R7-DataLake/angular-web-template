export interface UserList {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  enabled: string;
  last_login: string;
}

export interface ICreateUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  enabled: string;
}

export interface IUpdateUser {
  firstName: string;
  lastName: string;
  role: string;
  enabled: string;
}