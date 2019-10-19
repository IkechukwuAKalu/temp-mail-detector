// Jest requires this to skip this file during testing
test.skip("skip", () => {});

export const addressPairs = [
  {
    address: "192.168.43.1",
    hostname: "aa-sample.com"
  },
  {
    address: "127.0.0.1",
    hostname: "local.host"
  },
  {
    address: "0.0.0.0",
    hostname: "localhost.net"
  }
];

export default {
  promises: {
    // Returns the IP address for a hostname
    lookup: async (domain: string, family: 4 | 6): Promise<Object> => {
      const addressPair = addressPairs.find(ap => ap.hostname === domain);
      return addressPair || {};
    },

    // Returns the hostname for an IP address
    lookupService: async (ipAddress: string, port: number): Promise<Object> => {
      const addressPair = addressPairs.find(ap => ap.address === ipAddress);
      return addressPair || {};
    }
  }
}
