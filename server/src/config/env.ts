import 'dotenv/config';

const env = process.env as unknown as {
  CLIENT_URL: string,
  SERVER_HOST: string,
  SERVER_PORT: number,
  MYSQL_HOST: string,
  MYSQL_PORT: number,
  MYSQL_USER: string,
  MYSQL_PASSWORD: string,
  MYSQL_DATABASE: string
};

env.SERVER_PORT = Number(env.SERVER_PORT);
env.MYSQL_PORT = Number(env.MYSQL_PORT);

export default env;