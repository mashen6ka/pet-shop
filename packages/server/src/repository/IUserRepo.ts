import { CompanyEntity, UserEntity } from "../entity";

export default interface IUserRepo {
  createUser: (user: UserEntity) => Promise<Number>;
  updateUser: (user: UserEntity) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  getUser: (id: number) => Promise<UserEntity>;
  getUserCompanyList: (id: number) => Promise<Array<CompanyEntity>>;
  createUserCompany: (userId: number, companyId: number) => Promise<void>;
  deleteUserCompany: (userId: number, companyId: number) => Promise<void>;
}
