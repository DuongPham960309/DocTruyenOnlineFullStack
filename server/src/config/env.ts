import 'dotenv/config';

const env = process.env as unknown as {
  MYSQL_HOST: string,
  MYSQL_PORT: number,
  MYSQL_USER: string,
  MYSQL_PASSWORD: string,
  MYSQL_DATABASE: string,
  SERVER_PORT: number,
  SERVER_HOST: string
};

env.MYSQL_PORT = Number(env.MYSQL_PORT);
env.SERVER_PORT = Number(env.SERVER_PORT);

export default env;