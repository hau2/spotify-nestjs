export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  dbName: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD
})
