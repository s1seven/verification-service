import React, {useState} from 'react';
import {FileUploaderBox} from '../common/FileUploaderBox';
import {useServices} from '../hooks/useServices';
import {useSnackbar} from '../hooks/useSnackbar';
import {Box} from '../common/Box';
import {Verification} from 'verification-service-common/dist/models';

export const Verificaiton = () => {
  const {verificationService} = useServices();
  const [verification, setVerification] = useState<Verification>();
  const {show} = useSnackbar();

  const onUpload = async (file: File) => {
    try {
      const result = await verificationService.verify(file);
      setVerification(result);
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
      <Box className='verification-details'>
        {verification && <VerifiedDocument verification={verification}/>}
      </Box>
    </>
  );
};

const VerifiedDocument = ({verification}: {verification: Verification}) => {
  if (!verification.isVerified) {
    return <p>Verified: <span role='img' aria-label='No'>❌</span></p>;
  }
  return (
    <>
      <p>Verified: <span role='img' aria-label='Yes'>✅</span></p>
      <p>Creator: {verification.creator}</p>
      <p>Timestamp: {new Date(verification.timestamp).toLocaleString()}</p>
      <a className='bcdb-link' href={verification.link} target='_blank' rel='noopener noreferrer'>See transaction</a>
    </>
  );
};
