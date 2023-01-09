module.exports = {
  reporters: ["default", "jest-allure"],
  testRunner: "jest-jasmine2",
  setupFilesAfterEnv: ["jest-allure/dist/setup"],
};
