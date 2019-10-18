import { isHttps, log, ENVS } from "../../lib/utils";

describe("/lib/utils.ts", () => {
  describe("#log()", () => {
    let currentEnv: string | undefined;

    beforeAll(() => {
      // Keep track of the current env
      currentEnv = process.env.NODE_ENV;
      // Mock the console
      jest.spyOn(global.console, "log")
        .mockImplementation((message) => {
          // Do not display anything
        });
    });

    afterAll(() => {
      if (currentEnv) {
        // Set the env to its original state
        process.env.NODE_ENV = currentEnv;
      }
    });

    test("Expect data to be logged in a non-production env", () => {
      log("This is some test in dev env");
      expect(console.log).toBeCalled;
    });

    test("Do not expect data to be logged in a production env without override", () => {
      process.env.NODE_ENV = ENVS.PROD;
      log("This is some test in dev env");
      expect(console.log).not.toBeCalled;
    });

    test("Expect data to be logged in a production env with override", () => {
      process.env.NODE_ENV = ENVS.PROD;
      log("This is some test in dev env", true);
      expect(console.log).toBeCalled;
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