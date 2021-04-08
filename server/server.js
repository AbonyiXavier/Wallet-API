import http from 'http';
import app from './app';
const { config } = require('dotenv');

config();

const PORT = process.env.NODE_ENV === 'test' ? 6378 : process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
