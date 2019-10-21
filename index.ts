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
    const service = new WebService(email);
    await service.initValues();
    const ipHostname = service.getIPHostname();
    const hostname = hostnames.getHostnames()
      .find(kh => (new RegExp(kh, "ig").test(ipHostname)));
    return Boolean(hostname);
  } catch (err) {
    log(err);
    return false;
  }
}
