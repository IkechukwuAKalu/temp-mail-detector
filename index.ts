import WebService from "./lib/webservice";
import hostnames from "./lib/hostnames";
import { log } from "./lib/utils";

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
