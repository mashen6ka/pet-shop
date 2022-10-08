import { CompanyEntity, OrderEntity, UserEntity } from "../entity";
import { PgUserRepo } from "../repository";

export default class PgUserRepoMock extends PgUserRepo {
  user: UserEntity;
  token: string;
  company: CompanyEntity;
  order: OrderEntity;

  constructor() {
    super(null);
    this.user = new UserEntity({
      id: 256,
      login: "mashenka",
      password: "ZehL4zUy+3hMSBKWdfnv86aCsnFowOp0Syz1juAjN8U=",
      worker: true,
      firstName: "Maria",
      lastName: "Slepokurova",
      middleName: "Fedorovna",
      birthday: new Date("2001-11-05"),
      email: "marislepokurova@gmail.com",
      phone: "+79104135660",
      personalDiscount: 0,
    });
    this.token = "73xsq1xq0ffl0amlq";
    this.company = new CompanyEntity({
      id: 256,
      name: "Lapka",
      KPP: "123456789",
      INN: "123456789012",
      address: "Proletarskiy pr-t 7a",
    });
    this.order = new OrderEntity({
      id: 256,
      userId: 256,
      companyId: 64,
      statusId: 2,
      createdAt: new Date("2022-11-05"),
      completedAt: new Date("2022-11-10"),
      shopId: 32,
    });

    jest
      .spyOn(PgUserRepoMock.prototype, "getUserIdByLoginAndPassword")
      .mockImplementation((login: string, password: string) => {
        const res = this.user.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgUserRepoMock.prototype, "createSession")
      .mockImplementation((userId: number) => {
        const res = this.token;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgUserRepoMock.prototype, "getUserIdByToken")
      .mockImplementation((token: string) => {
        const res = this.user.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgUserRepoMock.prototype, "getWorkerIdByToken")
      .mockImplementation((token: string) => {
        const res = this.user.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgUserRepoMock.prototype, "createUser")
      .mockImplementation((user: UserEntity) => {
        const res = this.user.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgUserRepo.prototype, "updateUser")
      .mockImplementation((user: UserEntity) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgUserRepo.prototype, "deleteUser")
      .mockImplementation((id: Number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgUserRepo.prototype, "getUser")
      .mockImplementation((id: number) => {
        const res = this.user;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest.spyOn(PgUserRepo.prototype, "getUserList").mockImplementation(() => {
      const res = [this.user];
      return new Promise(function (resolve, reject) {
        resolve(res);
      });
    });

    jest
      .spyOn(PgUserRepo.prototype, "getUserCompanyList")
      .mockImplementation((userId: number) => {
        const res = [this.company];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgUserRepo.prototype, "getUserOrderList")
      .mockImplementation((userId: number) => {
        const res = [this.order];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgUserRepo.prototype, "createUserCompany")
      .mockImplementation((userId: number, companyId: number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgUserRepo.prototype, "deleteUserCompany")
      .mockImplementation((userId: number, companyId: number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });
  }
}
