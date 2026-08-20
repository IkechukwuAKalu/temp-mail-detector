import { log, ENVS } from "../../lib/utils";

describe("/lib/utils.ts", () => {
  describe("ENVS constants", () => {
    test("Exposes expected environment values", () => {
      expect(ENVS.DEV).toBe("development");
      expect(ENVS.PROD).toBe("production");
      expect(ENVS.TEST).toBe("testing");
    });
  });

  describe("#log()", () => {
    let currentEnv: string | undefined;
    let spy: jest.SpyInstance;

    beforeAll(() => {
      currentEnv = process.env.NODE_ENV;
      spy = jest.spyOn(global.console, "log")
        .mockImplementation(() => undefined);
    });


    afterAll(() => {
      if (currentEnv) {
        process.env.NODE_ENV = currentEnv;
      }
      spy.mockRestore();
    });

    test("Logs data when hide is false and not in production", () => {
      process.env.NODE_ENV = ENVS.DEV;
      const message = "Test dev message";
      log(message, false);
      expect(console.log).toHaveBeenCalledWith(message);
    });

    test("Does not log data when hide is true (default)", () => {
      process.env.NODE_ENV = ENVS.DEV;
      const message = "Test dev hidden message";
      log(message);
      expect(console.log).not.toHaveBeenCalledWith(message);
    });

    test("Does not log data in production environment even if hide is false", () => {
      process.env.NODE_ENV = ENVS.PROD;
      const message = "Test prod message";
      log(message, false);
      expect(console.log).not.toHaveBeenCalledWith(message);
    });
  });
});