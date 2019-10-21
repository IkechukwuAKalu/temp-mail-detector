import { promises } from "dns";
import { isTempMail } from "../../index";
import hostnames from "../../lib/hostnames";
import dns, { addressPairs } from "../mocks/dns.mock";

const testHostnames = addressPairs.map(ap => ap.hostname);

describe("/index.ts", () => {
  describe("#isTempMail()", () => {
    let lookupMockFn: jest.Mock;
    let lookupServiceMockFn: jest.Mock;
    let hostsnamesSpy: jest.SpyInstance;

    beforeAll(() => {
      lookupMockFn = jest.fn();
      lookupServiceMockFn = jest.fn();
      promises.lookup = lookupMockFn.mockImplementation(dns.promises.lookup);
      promises.lookupService = lookupServiceMockFn.mockImplementation(dns.promises.lookupService);
      hostsnamesSpy = jest.spyOn(hostnames, "getHostnames")
        .mockReturnValue(testHostnames);
    });

    afterAll(() => {
      lookupMockFn.mockClear();
      lookupServiceMockFn.mockClear();
      hostsnamesSpy.mockClear();
    });

    test("Expect it to be a temp email from known hosts", async (done) => {
      const email = `jane.john@${addressPairs[0].hostname}`;
      const result = await isTempMail(email);
      expect(result).toEqual(true);
      done();
    });

    test("Expect it not to be temp email from known hosts", async (done) => {
      const email = "leo.kay@gmail.com";
      const result = await isTempMail(email);
      expect(result).toEqual(false);
      done();
    });
  });
});
