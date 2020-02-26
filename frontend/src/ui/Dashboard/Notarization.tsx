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
        hintText='Upload a document to validate it'
        titleText='SBS Validation Service'
        onFileUploaded={onUpload}
      />
      <Box>{notarization}</Box>
    </>
  );
};
