import dns from "dns";
import { log } from "./utils";

const dnsPromises = dns.promises;

export default class WebService {
  private domain: string;
  private ipAddress: string;
  private ipHostname: string;

  constructor(email: string) {
    const startIndex = email.indexOf("@") + 1;
    this.domain = email.substring(startIndex);
    this.ipAddress = "";
    this.ipHostname = "";
  }

  public async initValues() {
    await this.initIPAddress();
    await this.initIPHostname();
  }

  public getIpAddress(): string {
    return this.ipAddress;
  }

  public getIPHostname(): string {
    return this.ipHostname;
  }

  private async initIPAddress() {
    try {
      const result = await dnsPromises.lookup(this.domain, 4);
      this.ipAddress = result.address;
    } catch (err) {
      log(err);
    }
  }

  private async initIPHostname() {
    try {
      if (!this.ipAddress) await this.initIPAddress();
      const result = await dnsPromises.lookupService(this.ipAddress, 80);
      this.ipHostname = result.hostname;
    } catch (err) {
      log(err);
    }
  }
}