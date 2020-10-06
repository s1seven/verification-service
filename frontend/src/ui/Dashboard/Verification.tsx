import React, {useState} from 'react';
import {FileUploaderBox} from '../common/FileUploaderBox';
import {useServices} from '../hooks/useServices';
import {useSnackbar} from '../hooks/useSnackbar';
import {Box} from '../common/Box';
import {Verification as VerificationResult} from 'verification-service-common/models';

type FileVerification = VerificationResult & {
  fileName: string;
};

export const Verification = () => {
  const {verificationService} = useServices();
  const [verification, setVerification] = useState<FileVerification>();
  const {show} = useSnackbar();

  const onUpload = async (file: File) => {
    try {
      const result = await verificationService.verify(file);
      setVerification({
        ...result,
        fileName: file.name
      });
    } catch (err) {
      show(err.message);
    }
  };

  return (
    <>
      <FileUploaderBox
        hintText='Upload a document to verify it'
        titleText='Verification Service'
        onFileUploaded={onUpload}
      />
      <Box className='verification-details'>
        {verification && <VerifiedDocument verification={verification}/>}
      </Box>
    </>
  );
};

const VerifiedDocument = ({verification}: {verification: FileVerification}) => {
  if (!verification.isVerified) {
    return <p><span role='img' aria-label='No'>❌</span> {verification.fileName} is not verified</p>;
  }
  return (
    <>
      <p><span role='img' aria-label='Yes'>✅</span> {verification.fileName} is verified</p>
      <p>Creator: {verification.creator}</p>
      <p>Timestamp: {new Date(verification.timestamp).toLocaleString('en-UK', {timeZone: 'UTC'})}</p>
      <a className='bcdb-link' href={verification.link} target='_blank' rel='noopener noreferrer'>See transaction</a>
    </>
  );
};
