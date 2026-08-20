import { promises } from "dns";
import dns, { addressPairs } from "../mocks/dns.mock";
import WebService from "../../lib/webservice";

describe("/lib/webservice.ts", () => {
  let lookupMockFn: jest.Mock;
  let lookupServiceMockFn: jest.Mock;
  let resolveMxMockFn: jest.Mock;

  beforeAll(() => {
    lookupMockFn = jest.fn();
    lookupServiceMockFn = jest.fn();
    resolveMxMockFn = jest.fn();
    promises.lookup = lookupMockFn.mockImplementation(dns.promises.lookup);
    promises.lookupService = lookupServiceMockFn.mockImplementation(dns.promises.lookupService);
    promises.resolveMx = resolveMxMockFn.mockImplementation(dns.promises.resolveMx);
  });

  afterAll(() => {
    lookupMockFn.mockClear();
    lookupServiceMockFn.mockClear();
    resolveMxMockFn.mockClear();
  });


  describe("Constructor & Domain Extraction", () => {
    test("Extracts domain correctly from valid email", () => {
      const service = new WebService("user@example.com");
      expect(service.getDomain()).toBe("example.com");
    });

    test("Handles email with subdomains correctly", () => {
      const service = new WebService("user@mail.example.co.uk");
      expect(service.getDomain()).toBe("mail.example.co.uk");
    });

    test("Handles invalid email without @ symbol", () => {
      const service = new WebService("invalidemail.com");
      expect(service.getDomain()).toBe("");
    });

    test("Handles non-string input safely", () => {
      // @ts-expect-error testing invalid input runtime safety
      const service = new WebService(null);
      expect(service.getDomain()).toBe("");
    });
  });

  describe("#initValues()", () => {
    test("Verify that the IP address, hostname, and MX records are populated after init", async () => {
      const service = new WebService(`john.jane@${addressPairs[0].hostname}`);
      await service.initValues();
      expect(service.getIpAddress()).toBe(addressPairs[0].address);
      expect(service.getIPHostname()).toBe(addressPairs[0].hostname);
      expect(service.getMxHostnames()).toContain(`mail.${addressPairs[0].hostname}`);
    });


    test("Handles empty domain without making DNS requests", async () => {
      const service = new WebService("");
      await service.initValues();
      expect(service.getIpAddress()).toBe("");
      expect(service.getIPHostname()).toBe("");
    });

    test("Handles DNS lookup failure gracefully", async () => {
      const service = new WebService("user@nonexistent-domain-test.xyz");
      await service.initValues();
      expect(service.getIpAddress()).toBe("");
      expect(service.getIPHostname()).toBe("");
    });
  });
});