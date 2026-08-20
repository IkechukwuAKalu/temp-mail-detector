import dns from "dns";
import { log } from "./utils";

const dnsPromises = dns.promises;

export default class WebService {
  private domain: string;
  private ipAddress = "";
  private ipHostname = "";
  private mxHostnames: string[] = [];

  constructor(email: string) {
    if (typeof email !== "string") {
      this.domain = "";
      return;
    }
    const atIndex = email.lastIndexOf("@");
    this.domain = atIndex !== -1 ? email.substring(atIndex + 1).trim().toLowerCase() : "";
  }

  /**
   * Runs the initialization functions for the IP address, Hostname, and MX records
   */
  public async initValues(): Promise<void> {
    if (!this.domain) return;
    await Promise.all([
      this.initIPAndHostname(),
      this.initMxHostnames()
    ]);
  }

  /**
   * @returns the domain name
   */
  public getDomain(): string {
    return this.domain;
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
   * @returns an array of resolved MX hostnames
   */
  public getMxHostnames(): string[] {
    return this.mxHostnames;
  }

  /**
   * Initializes the domain's IP address and reverse lookup hostname
   */
  private async initIPAndHostname(): Promise<void> {
    if (!this.domain) return;
    try {
      const result = await dnsPromises.lookup(this.domain, 4);
      this.ipAddress = result.address || "";
      if (this.ipAddress) {
        try {
          const serviceResult = await dnsPromises.lookupService(this.ipAddress, 80);
          this.ipHostname = serviceResult.hostname || "";
        } catch (serviceErr) {
          log(serviceErr);
        }
      }
    } catch (err) {
      log(err);
    }
  }

  /**
   * Initializes the domain's MX hostnames
   */
  private async initMxHostnames(): Promise<void> {
    if (!this.domain) return;
    try {
      const mxRecords = await dnsPromises.resolveMx(this.domain);
      if (Array.isArray(mxRecords)) {
        this.mxHostnames = mxRecords
          .map(r => (r.exchange || "").toLowerCase())
          .filter(Boolean);
      }
    } catch (err) {
      log(err);
    }
  }
}