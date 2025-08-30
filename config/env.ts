import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

export const env = new Proxy({}, {
  get: (_, prop: string) => process.env[prop],
}) as any;