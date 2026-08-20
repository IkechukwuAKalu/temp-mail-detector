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
    lookup: async (domain: string, family?: number): Promise<{ address: string; family: number }> => {
      const addressPair = addressPairs.find(ap => ap.hostname === domain);
      if (addressPair) {
        return { address: addressPair.address, family: 4 };
      }
      throw new Error(`ENOTFOUND ${domain}`);
    },

    // Returns the hostname for an IP address
    lookupService: async (ipAddress: string, port: number): Promise<{ hostname: string; service: string }> => {
      const addressPair = addressPairs.find(ap => ap.address === ipAddress);
      if (addressPair) {
        return { hostname: addressPair.hostname, service: "http" };
      }
      throw new Error(`ENOTFOUND ${ipAddress}`);
    },

    // Returns MX records for a domain
    resolveMx: async (domain: string): Promise<{ exchange: string; priority: number }[]> => {


      const addressPair = addressPairs.find(ap => ap.hostname === domain);
      if (addressPair) {
        return [{ exchange: `mail.${addressPair.hostname}`, priority: 10 }];
      }
      return [];
    }
  }
};


