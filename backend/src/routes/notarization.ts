import multer from 'multer';
import {Router as expressRouter} from 'express';

const fileHandler = multer({
  storage: multer.memoryStorage()
});

export const notarization = () => {
  const router = expressRouter();

  router.post('/',
    fileHandler.single('file'),
    ({file}, res) => res.send({
      file: file.buffer.toString('utf8')
    })
  );

  return router;
};
