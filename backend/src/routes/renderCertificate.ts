import {Router as expressRouter} from 'express';
import {asyncHandler, responseOf} from '@restless/restless';
import multer from 'multer';
import {generateHtml} from '@s1seven/schema-tools-generate-html';

const fileHandler = multer({
  storage: multer.memoryStorage()
});

export const renderCertificate = () => {
  const router = expressRouter();

  router.post('/',
    fileHandler.single('certificate'),
    asyncHandler(
      async (_, {file}) => {
        const certificateHtml = await generateHtml(JSON.parse(file.buffer.toString()));
        return responseOf({certificateHtml});
      }
    ));

  return router;
};
