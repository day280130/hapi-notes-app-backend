import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import { notesRoutes } from './notes.js';

const path = '/';

export const routes: ServerRoute<ReqRefDefaults>[] = [
  ...notesRoutes,
  // {
  //   method: 'GET',
  //   path: '/hello/{name?}',
  //   handler: (request, h) => {
  //     const { name = 'stranger' } = request.params;
  //     const { lang } = request.query;
  //     if (lang === 'id') {
  //       return `Hai ${name}!`;
  //     }
  //     return `Hello ${name}!`;
  //   },
  // },
  // {
  //   method: 'GET',
  //   path,
  //   handler: (request, h) => {
  //     return 'Homepage';
  //   },
  // },
  // {
  //   method: '*',
  //   path,
  //   handler: (request, h) => {
  //     return 'Halaman tidak dapat diakses dengan method tersebut';
  //   },
  // },
  {
    method: '*',
    path: `${path}{any*}`,
    handler: (req, h) => {
      return h.response('Halaman tidak ditemukan').code(404);
    },
  },
];
