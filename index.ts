import WebService from "./lib/webservice";
import knownHosts from "./lib/hostnames";
import { log } from "./lib/utils";

export async function isTempMail(email: string): Promise<boolean> {
  try {
    const service = new WebService(email);
    await service.initValues();
    const ipHostname = service.getIPHostname();
    return Boolean(knownHosts.find(kh => (new RegExp(kh, "ig").test(ipHostname))));
  } catch (err) {
    log(err);
    return false;
  }
}
