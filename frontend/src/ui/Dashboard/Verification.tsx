import React, {useState} from 'react';
import {FileUploaderBox} from '../common/FileUploaderBox';
import {useServices} from '../hooks/useServices';
import {useSnackbar} from '../hooks/useSnackbar';
import {Box} from '../common/Box';
import {Verification as VerificationResult} from 'verification-service-common/models';

export const Verification = () => {
  const {verificationService} = useServices();
  const [verification, setVerification] = useState<VerificationResult>();
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
        hintText='Upload a document to validate it'
        titleText='SBS Validation Service'
        onFileUploaded={onUpload}
      />
      <Box className='verification-details'>
        {verification && <VerifiedDocument verification={verification}/>}
      </Box>
    </>
  );
};

const VerifiedDocument = ({verification}: {verification: VerificationResult}) => {
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
