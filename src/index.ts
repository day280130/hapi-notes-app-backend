import 'dotenv-safe/config.js';
import { server } from './config/server.js';
import { routes } from './routes/index.js';

server.route(routes);

await server.start();
console.log(`Server berjalan pada ${server.info.uri}`);
