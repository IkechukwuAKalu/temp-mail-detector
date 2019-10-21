/**
 * The different environment constants available to the app
 */
export const ENVS = {
  DEV: "development",
  PROD: "production",
  TEST: "testing"
};

/**
 * This function logs data to the console
 * @param message is the data to log
 * @param override is set to true to log the data even in a production environment
 */
export const log = <T>(message: T, override = false) => {
  if (process.env.NODE_ENV === ENVS.PROD && !override) return;
  console.log(message);
};

/**
 * This validates a URL to know if it has an HTTPS scheme
 * @param url is a given url with scheme to know it it is HTTPS or not
 * @returns true if the URL has an HTTPS scheme
 */
export const isHttps = (url: string): boolean =>  /^https:\/\//i.test(url);
