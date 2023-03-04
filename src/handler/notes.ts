import { ReqRefDefaults, Lifecycle } from '@hapi/hapi';
import { nanoid } from 'nanoid';

interface Payload {
  title: string;
  tags: string[];
  body: string;
}

interface Note extends Payload {
  id: string;
  createdAt: string;
  updatedAt: string;
}

type reqHandler = Lifecycle.Method<ReqRefDefaults, Lifecycle.ReturnValue<ReqRefDefaults>>;

const notes: Note[] = [];

const getNotes: reqHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNote: reqHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter(note => note.id === id)[0];

  if (note !== undefined) {
    return h.response({
      status: 'success',
      data: {
        note,
      },
    });
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);
};

const postNote: reqHandler = (req, h) => {
  const { title, tags, body } = req.payload as Payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  notes.push({ id, title, createdAt, updatedAt, tags, body });

  const isSuccess = notes.filter(note => note.id === id).length > 0;

  if (isSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      })
      .code(201);
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    })
    .code(500);
};

const putNote: reqHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload as Payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex(note => note.id === id);

  if (index >= 0) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    })
    .code(404);
};

const deleteNote: reqHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex(note => note.id === id);

  if (index >= 0) {
    notes.splice(index, 1);

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
};

export const notesHandlers = { getNotes, getNote, postNote, putNote, deleteNote };
