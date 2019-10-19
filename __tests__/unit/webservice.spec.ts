import { promises } from "dns";
import dns, { addressPairs } from "../mocks/dns.mock";
import WebService from "../../lib/webservice";

describe("/lib/webservice.ts", () => {
  let lookupMockFn: jest.Mock;
  let lookupServiceMockFn: jest.Mock;

  beforeAll(() => {
    lookupMockFn = jest.fn();
    lookupServiceMockFn = jest.fn();
    promises.lookup = lookupMockFn.mockImplementation(dns.promises.lookup);
    promises.lookupService = lookupServiceMockFn.mockImplementation(dns.promises.lookupService);
  });

  afterAll(() => {
    lookupMockFn.mockClear();
    lookupServiceMockFn.mockClear();
  });

  describe("#initValues()", () => {
    test("Verify that the IP address and hostname are not empty after init", async (done) => {
      const service = new WebService(`john.jane@${addressPairs[0].hostname}`);
      await service.initValues();
      // Ensure the IP address to be a non-empty string
      expect(service.getIpAddress()).not.toEqual("");
      // Ensure the IP Hostname to be a non-empty string
      expect(service.getIPHostname()).not.toEqual("");
      done();
    });
  });
});