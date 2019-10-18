export const ENVS = {
  DEV: "development",
  PROD: "production"
};

export const log = <T>(message: T, override = false) => {
  if (process.env.NODE_ENV === ENVS.PROD && !override) return;
  console.log(message);
};

export const isHttps = (url: string): boolean =>  /^https:\/\//i.test(url);
