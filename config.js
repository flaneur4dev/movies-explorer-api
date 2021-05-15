const {
  PORT = 5000,
  JWT_SECRET = 'dev-secret',
  DB_ADRESS = 'mongodb://localhost:27017/bitfilmsdb'
} = process.env;

module.exports = { PORT, JWT_SECRET, DB_ADRESS }
