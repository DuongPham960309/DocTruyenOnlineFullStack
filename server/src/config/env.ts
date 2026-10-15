import 'dotenv/config';

const env = process.env as unknown as {
  CLIENT_URL: string,
  HOST: string,
  PORT: number,
  MYSQL_HOST: string,
  MYSQL_PORT: number,
  MYSQL_USER: string,
  MYSQL_PASSWORD: string,
  MYSQL_DATABASE: string
};

env.PORT = Number(env.PORT);
env.MYSQL_PORT = Number(env.MYSQL_PORT);

export default env;