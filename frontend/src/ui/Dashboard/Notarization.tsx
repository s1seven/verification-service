import React, {useState} from 'react';
import {FileUploaderBox} from '../common/FileUploaderBox';
import {useServices} from '../hooks/useServices';
import {useSnackbar} from '../hooks/useSnackbar';
import {Box} from '../common/Box';

export const Notarization = () => {
  const {notarizationService} = useServices();
  const [notarization, setNotarization] = useState();
  const {show} = useSnackbar();

  const onUpload = async (file: File) => {
    try {
      const result = await notarizationService.notarize(file);
      setNotarization(result.file);
    } catch (err) {
      show(err.message);
    }
  };

  return (
    <>
      <FileUploaderBox
        hintText='You can upload the certificates here'
        titleText='Upload certificates'
        onFileUploaded={onUpload}
      />
      <Box>{notarization}</Box>
    </>
  );
};
