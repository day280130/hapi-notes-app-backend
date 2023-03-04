import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import { notesHandlers } from '../handler/notes.js';

const path = '/notes';

export const notesRoutes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path,
    handler: notesHandlers.getNotes,
  },
  {
    method: 'GET',
    path: `${path}/{id}`,
    handler: notesHandlers.getNote,
  },
  {
    method: 'POST',
    path,
    handler: notesHandlers.postNote,
  },
  {
    method: 'PUT',
    path: `${path}/{id}`,
    handler: notesHandlers.putNote,
  },
  {
    method: 'DELETE',
    path: `${path}/{id}`,
    handler: notesHandlers.deleteNote,
  },
];
