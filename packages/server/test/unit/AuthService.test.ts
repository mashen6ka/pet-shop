import "reflect-metadata";
import { AuthnEntity } from "../../src/entity";
import AuthService from "../../src/service/AuthService";
import PgUserRepoMock from "../../src/test/PgUserRepoMock";

describe("Company", () => {
  it("Service", async () => {
    const userRepo = new PgUserRepoMock();
    const authService = new AuthService(userRepo);

    const user = userRepo.user;
    const token = userRepo.token;
    const company = userRepo.company;
    const order = userRepo.order;
    const authn = new AuthnEntity({
      login: user.login,
      password: user.password,
    });

    const authenticateUserRes = await authService.authenticateUser(authn);
    expect(authenticateUserRes).toEqual(token);

    const getUserIdByTokenRes = await authService.getUserIdByToken(token);
    expect(getUserIdByTokenRes).toEqual(user.id);

    const getWorkerIdByTokenRes = await authService.getWorkerIdByToken(token);
    expect(getWorkerIdByTokenRes).toEqual(user.id);
  });
});
