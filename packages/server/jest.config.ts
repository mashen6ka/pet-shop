module.exports = {
  reporters: ["default", "jest-allure", "jest-junit"],
  testRunner: "jest-jasmine2",
  setupFilesAfterEnv: ["jest-allure/dist/setup"],
};
