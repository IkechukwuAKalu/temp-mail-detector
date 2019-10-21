import dns from "dns";
import { log } from "./utils";

const dnsPromises = dns.promises;

export default class WebService {
  private domain: string;
  private ipAddress = "";
  private ipHostname = "";

  constructor(email: string) {
    // extract the domain name
    const startIndex = email.indexOf("@") + 1;
    this.domain = email.substring(startIndex);
  }

  /**
   * Runs the initialization functions for the IP address and Hostname
   */
  public async initValues() {
    await this.initIPAddress();
    await this.initIPHostname();
  }

  /**
   * @returns the resolved domain's IP address or an empty string
   */
  public getIpAddress(): string {
    return this.ipAddress;
  }

  /**
   * @returns the resolved IP address' hostname or an empty string
   */
  public getIPHostname(): string {
    return this.ipHostname;
  }

  /**
   * Initializes the domain's IP address
   */
  private async initIPAddress() {
    try {
      const result = await dnsPromises.lookup(this.domain, 4);
      this.ipAddress = result.address;
    } catch (err) {
      log(err);
    }
  }

  /**
   * Initializes the IP address' hostname
   */
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