import { isHttps, log, ENVS } from "../../lib/utils";

describe("/lib/utils.ts", () => {
  describe("#log()", () => {
    let currentEnv: string | undefined;
    let spy: jest.SpyInstance;

    beforeAll(() => {
      // Keep track of the current env
      currentEnv = process.env.NODE_ENV;
      // Mock the console
      spy = jest.spyOn(global.console, "log")
        .mockImplementation(message => null);
    });

    afterAll(() => {
      if (currentEnv) {
        // Set the env to its original state
        process.env.NODE_ENV = currentEnv;
        // Clear the mock
        spy.mockClear();
      }
    });

    test("Expect data to be logged in a non-production env", () => {
      const message = "This is some test in dev env";
      log(message, false);
      expect(console.log).toBeCalledWith(message);
    });

    test("Do not expect data to be logged in a production env without override", () => {
      process.env.NODE_ENV = ENVS.PROD;
      const message = "This is some test in dev env";
      log(message);
      expect(console.log).not.toBeCalledWith(message);
    });
  });

  describe("#isHttps()", () => {
    test("Return true for valid https scheme", () => {
      const url = "https://ikechukwuakalu.github.io";
      expect(isHttps(url)).toBe(true);
    });

    test("Return false for invalid https scheme", () => {
      const url = "http://github.com";
      expect(isHttps(url)).toBe(false);
    });
  });
});