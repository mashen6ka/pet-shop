import "reflect-metadata";
import Chance from "chance";
import PgUserRepo from "../../src/repository/PgUserRepo";
import UserService from "../../src/service/UserService";
import {
  AuthnBuilder,
  UserBuilder,
  CompanyBuilder,
  OrderBuilder,
} from "../builders";

let chance: Chance.Chance;

let userRepo: PgUserRepo;
let userService: UserService;

let userBuilder: UserBuilder;
let authnBuilder: AuthnBuilder;
let companyBuilder: CompanyBuilder;
let orderBuilder: OrderBuilder;

describe("UserService", () => {
  beforeAll(() => {
    chance = Chance();
    userRepo = new PgUserRepo(null);
    userService = new UserService(userRepo);
  });
  beforeEach(() => {
    userBuilder = new UserBuilder();
    authnBuilder = new AuthnBuilder();
    companyBuilder = new CompanyBuilder();
    orderBuilder = new OrderBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("authenticateUser -- success", async () => {
    const user = userBuilder.build();
    const authn = authnBuilder
      .withLogin(user.login)
      .withPassword(user.password)
      .build();
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getUserIdByLoginAndPassword")
      .mockResolvedValue(user.id);
    jest.spyOn(PgUserRepo.prototype, "createSession").mockResolvedValue(token);

    const response = await userService.authenticateUser(authn);
    expect(userRepo.getUserIdByLoginAndPassword).toBeCalledTimes(1);
    expect(userRepo.createSession).toBeCalledTimes(1);
    expect(response).toEqual(token);
  });

  it("authenticateUser -- user not found", async () => {
    const user = userBuilder.build();
    const authn = authnBuilder
      .withLogin(user.login)
      .withPassword(user.password)
      .build();
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getUserIdByLoginAndPassword")
      .mockResolvedValue(null);
    jest.spyOn(PgUserRepo.prototype, "createSession").mockResolvedValue(token);

    const response = await userService.authenticateUser(authn);
    expect(userRepo.getUserIdByLoginAndPassword).toBeCalledTimes(1);
    expect(userRepo.createSession).not.toBeCalled();
    expect(response).toEqual(null);
  });

  it("getUserIdByToken -- success", async () => {
    const user = userBuilder.build();
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getUserIdByToken")
      .mockResolvedValue(user.id);

    const response = await userService.getUserIdByToken(token);
    expect(userRepo.getUserIdByToken).toBeCalledTimes(1);
    expect(response).toEqual(user.id);
  });

  it("getUserIdByToken -- user not found", async () => {
    const user = userBuilder.build();
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getUserIdByToken")
      .mockResolvedValue(null);

    const response = await userService.getUserIdByToken(token);
    expect(userRepo.getUserIdByToken).toBeCalledTimes(1);
    expect(response).toEqual(null);
  });

  it("getUser -- success", async () => {
    const user = userBuilder.build();

    jest.spyOn(PgUserRepo.prototype, "getUser").mockResolvedValue(user);

    const response = await userService.getUser(user.id);
    expect(userRepo.getUser).toBeCalledTimes(1);
    expect(response).toEqual(user);
  });

  it("getUser -- user not found", async () => {
    const user = userBuilder.build();

    jest.spyOn(PgUserRepo.prototype, "getUser").mockResolvedValue(null);

    const response = await userService.getUser(user.id);
    expect(userRepo.getUser).toBeCalledTimes(1);
    expect(response).toEqual(null);
  });

  it("createUser", async () => {
    const user = userBuilder.build();

    jest.spyOn(PgUserRepo.prototype, "createUser").mockResolvedValue(user.id);

    const response = await userService.createUser(user);
    expect(userRepo.createUser).toBeCalledTimes(1);
    expect(response).toEqual(user.id);
  });

  it("updateUser", async () => {
    const user = userBuilder.build();

    jest.spyOn(PgUserRepo.prototype, "updateUser").mockResolvedValue();

    const response = await userService.updateUser(user);
    expect(userRepo.updateUser).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });

  it("deleteUser", async () => {
    const user = userBuilder.build();

    jest.spyOn(PgUserRepo.prototype, "deleteUser").mockResolvedValue();

    const response = await userService.deleteUser(user.id);
    expect(userRepo.deleteUser).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });

  it("getUserList -- non-empty list", async () => {
    const userList = [];
    for (let i = 0; i < 4; i++) userList.push(userBuilder.build());

    jest.spyOn(PgUserRepo.prototype, "getUserList").mockResolvedValue(userList);

    const response = await userService.getUserList();
    expect(userRepo.getUserList).toBeCalledTimes(1);
    expect(response.sort()).toEqual(userList.sort());
  });

  it("getUserList -- empty list", async () => {
    jest.spyOn(PgUserRepo.prototype, "getUserList").mockResolvedValue([]);

    const response = await userService.getUserList();
    expect(userRepo.getUserList).toBeCalledTimes(1);
    expect(response).toEqual([]);
  });

  it("getUserCompanyList -- non-empty list", async () => {
    const user = userBuilder.build();
    const userCompanyList = [];
    for (let i = 0; i < 4; i++) userCompanyList.push(companyBuilder.build());

    jest
      .spyOn(PgUserRepo.prototype, "getUserCompanyList")
      .mockResolvedValue(userCompanyList);

    const response = await userService.getUserCompanyList(user.id);
    expect(userRepo.getUserCompanyList).toBeCalledTimes(1);
    expect(response.sort()).toEqual(userCompanyList.sort());
  });

  it("getUserCompanyList -- empty list", async () => {
    const user = userBuilder.build();
    jest
      .spyOn(PgUserRepo.prototype, "getUserCompanyList")
      .mockResolvedValue([]);

    const response = await userService.getUserCompanyList(user.id);
    expect(userRepo.getUserCompanyList).toBeCalledTimes(1);
    expect(response).toEqual([]);
  });

  it("getUserOrderList -- non-empty list", async () => {
    const user = userBuilder.build();
    const userOrderList = [];
    for (let i = 0; i < 4; i++) userOrderList.push(orderBuilder.build());

    jest
      .spyOn(PgUserRepo.prototype, "getUserOrderList")
      .mockResolvedValue(userOrderList);

    const response = await userService.getUserOrderList(user.id);
    expect(userRepo.getUserOrderList).toBeCalledTimes(1);
    expect(response.sort()).toEqual(userOrderList.sort());
  });

  it("getUserOrderList -- empty list", async () => {
    const user = userBuilder.build();
    jest.spyOn(PgUserRepo.prototype, "getUserOrderList").mockResolvedValue([]);

    const response = await userService.getUserOrderList(user.id);
    expect(userRepo.getUserOrderList).toBeCalledTimes(1);
    expect(response).toEqual([]);
  });

  it("createUserCompany", async () => {
    const user = userBuilder.build();
    const company = companyBuilder.build();

    jest.spyOn(PgUserRepo.prototype, "createUserCompany").mockResolvedValue();

    const response = await userService.createUserCompany(user.id, company.id);
    expect(userRepo.createUserCompany).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });

  it("deleteUserCompany", async () => {
    const user = userBuilder.build();
    const company = companyBuilder.build();

    jest.spyOn(PgUserRepo.prototype, "deleteUserCompany").mockResolvedValue();

    const response = await userService.deleteUserCompany(user.id, company.id);
    expect(userRepo.deleteUserCompany).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
});
