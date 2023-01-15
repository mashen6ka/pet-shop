module.exports = {
  reporters: ["default", "jest-allure", "jest-junit"],
  setupFilesAfterEnv: ["jest-allure/dist/setup"],
  testEnvironment: "node",
};
