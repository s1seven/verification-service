import React, {useState} from 'react';
import {FileUploaderBox} from '../common/FileUploaderBox';
import {useServices} from '../hooks/useServices';
import {useSnackbar} from '../hooks/useSnackbar';
import {Box} from '../common/Box';
import {Verification as VerificationResult} from 'verification-service-common/models';
import {Result} from '@restless/sanitizers';
import {RenderCertificateResult} from '../../../src/services/apiService';

type FileVerification = VerificationResult & {
  fileName: string;
}

export const Verification = () => {
  const { verificationService, validateCertificateFile, renderService } = useServices();
  const [verification, setVerification] = useState<FileVerification>();
  const [renderedHTML, setRenderedHTML] = useState<RenderCertificateResult>();
  const { show } = useSnackbar();

  const onUpload = async (file: File) => {
    try {
      const validCertificate = await validateCertificateFile(file);
      if (!Result.isOk(validCertificate)) {
        setVerification({ isVerified: false, fileName: file.name });
        throw new Error(validCertificate.error.toString());
      }
      const html = await renderService.renderCertificate(file);
      setRenderedHTML(html);
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
      {renderedHTML && <Box><RenderedCertificate renderedHTML={renderedHTML}/></Box>}
    </>
  );
};

const VerifiedDocument = ({ verification }: { verification: FileVerification }) => {
  if (!verification.isVerified) {
    return <p><span role='img' aria-label='No'>❌</span> {verification.fileName} is not verified</p>;
  }
  return (
    <>
      <p><span role='img' aria-label='Yes'>✅</span> {verification.fileName} is verified</p>
      <p>Creator: {verification.creator}</p>
      <p>Timestamp: {new Date(verification.timestamp).toLocaleString('en-UK', { timeZone: 'UTC' })}</p>
      <a className='bcdb-link' href={verification.link} target='_blank' rel='noopener noreferrer'>See transaction</a>
    </>
  );
};

const RenderedCertificate = ({ renderedHTML }: { renderedHTML: RenderCertificateResult }) => {
  return <iframe srcDoc={renderedHTML.certificateHtml} width='100%' height='500px'/>
};
