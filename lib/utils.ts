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
 * @param hide is set to true to prevent the data from being logged
 */
export const log = <T>(message: T, hide = true) => {
  if (process.env.NODE_ENV === ENVS.PROD || hide) return;
  console.log(message);
};
