import { promises } from "dns";
import { isTempMail } from "../../index";
import hostnames from "../../lib/hostnames";
import WebService from "../../lib/webservice";
import dns, { addressPairs } from "../mocks/dns.mock";

const testHostnames = addressPairs.map(ap => ap.hostname);

describe("/index.ts", () => {
  describe("#isTempMail()", () => {
    let lookupMockFn: jest.Mock;
    let lookupServiceMockFn: jest.Mock;
    let resolveMxMockFn: jest.Mock;
    let hostsnamesSpy: jest.SpyInstance;

    beforeAll(() => {
      lookupMockFn = jest.fn();
      lookupServiceMockFn = jest.fn();
      resolveMxMockFn = jest.fn();
      promises.lookup = lookupMockFn.mockImplementation(dns.promises.lookup);
      promises.lookupService = lookupServiceMockFn.mockImplementation(dns.promises.lookupService);
      promises.resolveMx = resolveMxMockFn.mockImplementation(dns.promises.resolveMx);
      hostsnamesSpy = jest.spyOn(hostnames, "getHostnames")
        .mockReturnValue(testHostnames);
    });

    afterAll(() => {
      lookupMockFn.mockClear();
      lookupServiceMockFn.mockClear();
      resolveMxMockFn.mockClear();
      hostsnamesSpy.mockRestore();
    });


    test("Returns true for temp email from known hosts", async () => {
      const email = `jane.john@${addressPairs[0].hostname}`;
      const result = await isTempMail(email);
      expect(result).toBe(true);
    });

    test("Handles case insensitivity for known hosts", async () => {
      const email = `Jane.John@${addressPairs[0].hostname.toUpperCase()}`;
      const result = await isTempMail(email);
      expect(result).toBe(true);
    });

    test("Returns false for non-temp email from unknown hosts", async () => {
      const email = "leo.kay@gmail.com";
      const result = await isTempMail(email);
      expect(result).toBe(false);
    });

    test("Returns false for empty string", async () => {
      const result = await isTempMail("");
      expect(result).toBe(false);
    });

    test("Returns false for string without @ symbol", async () => {
      const result = await isTempMail("invalid-email-address.com");
      expect(result).toBe(false);
    });

    test("Returns false for non-string input safely", async () => {
      // @ts-expect-error testing invalid input at runtime
      const result = await isTempMail(null);
      expect(result).toBe(false);
    });

    test("Returns false and logs when an unexpected error is thrown", async () => {
      jest.spyOn(WebService.prototype, "initValues").mockImplementationOnce(() => {
        throw new Error("Unexpected error");
      });
      const result = await isTempMail("error@test.com");
      expect(result).toBe(false);
    });
  });
});


