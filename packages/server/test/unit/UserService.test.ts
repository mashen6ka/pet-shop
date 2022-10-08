import { padStart } from "lodash";
import "reflect-metadata";
import { AuthnEntity } from "../../src/entity";
import UserService from "../../src/service/UserService";
import PgUserRepoMock from "../../src/test/PgUserRepoMock";

describe("User", () => {
  it("Service", async () => {
    const userRepo = new PgUserRepoMock();
    const userService = new UserService(userRepo);

    const user = userRepo.user;
    const token = userRepo.token;
    const company = userRepo.company;
    const order = userRepo.order;
    const authn = new AuthnEntity({
      login: user.login,
      password: user.password,
    });

    const authenticateUserRes = await userService.authenticateUser(authn);
    expect(authenticateUserRes).toEqual(token);

    const getUserIdByTokenRes = await userService.getUserIdByToken(token);
    expect(getUserIdByTokenRes).toEqual(user.id);

    const createUserRes = await userService.createUser(user);
    expect(createUserRes).toEqual(user.id);

    const updateUserRes = await userService.updateUser(user);
    expect(updateUserRes).toEqual(undefined);

    const deleteUserRes = await userService.deleteUser(user.id);
    expect(deleteUserRes).toEqual(undefined);

    const getUserRes = await userService.getUser(user.id);
    expect(getUserRes).toEqual(user);

    const getUserListRes = await userService.getUserList();
    expect(getUserListRes).toEqual([user]);

    const getUserCompanyListRes = await userService.getUserCompanyList(user.id);
    expect(getUserCompanyListRes).toEqual([company]);

    const getUserOrderListRes = await userService.getUserOrderList(user.id);
    expect(getUserOrderListRes).toEqual([order]);

    const createUserCompanyRes = await userService.createUserCompany(
      user.id,
      company.id
    );
    expect(createUserCompanyRes).toEqual(undefined);

    const deleteUserCompanyRes = await userService.deleteUserCompany(
      user.id,
      company.id
    );
    expect(deleteUserCompanyRes).toEqual(undefined);
  });
});
