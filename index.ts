import WebService from "./lib/webservice";
import hostnames from "./lib/hostnames";
import { log } from "./lib/utils";

/**
 * This checks an email address to know if it is a temporary email address
 * @param email is the email address to check
 * @returns true if it is a temporary email address, else false
 */
export async function isTempMail(email: string): Promise<boolean> {
  try {
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return false;
    }
    const service = new WebService(email);
    await service.initValues();

    const candidates = [
      service.getDomain(),
      service.getIPHostname(),
      ...service.getMxHostnames()
    ].filter(Boolean).map(h => h.toLowerCase());

    if (candidates.length === 0) {
      return false;
    }

    const knownHosts = hostnames.getHostnames().map(h => h.toLowerCase());

    const matched = knownHosts.find(kh =>
      candidates.some(candidate =>
        candidate === kh ||
        candidate.endsWith(`.${kh}`) ||
        candidate.includes(kh)
      )
    );

    return Boolean(matched);
  } catch (err) {
    log(err);
    return false;
  }
}

