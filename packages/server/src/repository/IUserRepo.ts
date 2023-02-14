import { CompanyEntity, UserEntity, OrderEntity } from "../entity";

export default interface IUserRepo {
  getUserIdByLoginAndPassword: (
    login: string,
    password: string
  ) => Promise<number>;
  getWorkerByUserId: (userId: number) => Promise<boolean>;
  createUser: (user: UserEntity) => Promise<number>;
  updateUser: (user: UserEntity) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  getUser: (id: number) => Promise<UserEntity>;
  getUserList: () => Promise<Array<UserEntity>>;
  getUserCompanyList: (userId: number) => Promise<Array<CompanyEntity>>;
  getUserOrderList: (userId: number) => Promise<Array<OrderEntity>>;
  createUserCompany: (userId: number, companyId: number) => Promise<void>;
  deleteUserCompany: (userId: number, companyId: number) => Promise<void>;
}
