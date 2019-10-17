import WebService from "./webservice";
import knownHosts from "./hostnames";
import { log } from "./utils";

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
