import "reflect-metadata";
import Chance from "chance";
import AuthService from "../../src/service/AuthService";
import PgUserRepo from "../../src/repository/PgUserRepo";
import { AuthnBuilder, UserBuilder } from "../builders";

let chance: Chance.Chance;

let userRepo: PgUserRepo;
let authService: AuthService;

let authnBuilder: AuthnBuilder;
let userBuilder: UserBuilder;

describe("AuthService", () => {
  beforeAll(() => {
    chance = Chance();
    userRepo = new PgUserRepo(null);
    authService = new AuthService(userRepo);
  });
  beforeEach(() => {
    authnBuilder = new AuthnBuilder();
    userBuilder = new UserBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("authenticateUser -- success", async () => {
    const authn = authnBuilder.build();
    const user = userBuilder.build();
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getUserIdByLoginAndPassword")
      .mockResolvedValue(user.id);
    jest.spyOn(PgUserRepo.prototype, "createSession").mockResolvedValue(token);

    const response = await authService.authenticateUser(authn);
    expect(userRepo.getUserIdByLoginAndPassword).toHaveBeenCalledTimes(1);
    expect(userRepo.createSession).toHaveBeenCalledTimes(1);
    expect(response).toEqual(token);
  });
  it("authenticateUser -- user not found", async () => {
    const authn = authnBuilder.build();
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getUserIdByLoginAndPassword")
      .mockResolvedValue(null);
    jest.spyOn(PgUserRepo.prototype, "createSession").mockResolvedValue(token);

    const response = await authService.authenticateUser(authn);
    expect(userRepo.getUserIdByLoginAndPassword).toHaveBeenCalledTimes(1);
    expect(userRepo.createSession).not.toHaveBeenCalled();
    expect(response).toEqual(null);
  });
  it("getUserIdByToken -- success", async () => {
    const user = userBuilder.build();
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getUserIdByToken")
      .mockResolvedValue(user.id);

    const response = await authService.getUserIdByToken(token);
    expect(userRepo.getUserIdByToken).toHaveBeenCalledTimes(1);
    expect(response).toEqual(user.id);
  });
  it("getUserIdByToken -- user not found", async () => {
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getUserIdByToken")
      .mockResolvedValue(null);

    const response = await authService.getUserIdByToken(token);
    expect(userRepo.getUserIdByToken).toHaveBeenCalledTimes(1);
    expect(response).toEqual(null);
  });
  it("getWorkerIdByToken -- success", async () => {
    const worker = userBuilder.withWorker(true).build();
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getWorkerIdByToken")
      .mockResolvedValue(worker.id);

    const response = await authService.getWorkerIdByToken(token);
    expect(userRepo.getWorkerIdByToken).toHaveBeenCalledTimes(1);
    expect(response).toEqual(worker.id);
  });
  it("getWorkerIdByToken -- worker not found", async () => {
    const token = chance.string();

    jest
      .spyOn(PgUserRepo.prototype, "getWorkerIdByToken")
      .mockResolvedValue(null);

    const response = await authService.getWorkerIdByToken(token);
    expect(userRepo.getWorkerIdByToken).toHaveBeenCalledTimes(1);
    expect(response).toEqual(null);
  });
});
