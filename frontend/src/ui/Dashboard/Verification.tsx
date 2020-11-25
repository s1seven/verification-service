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
};

export const Verification = () => {
  const {
    verificationService,
    renderService,
    validateCertificateFile
  } = useServices();
  const [verification, setVerification] = useState<FileVerification>();
  const [renderedHTML, setRenderedHTML] = useState<RenderCertificateResult>();

  const {show} = useSnackbar();

  const onUpload = async (file: File) => {
    try {
      const result = await verificationService.verify(file);
      setVerification({
        ...result,
        fileName: file.name
      });
      const validCertificate = await validateCertificateFile(file);
      if (Result.isOk(validCertificate)) {
        const html = await renderService.renderCertificate(file);
        setRenderedHTML(html);
      }
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
      {verification?.isVerified && (
        <Box className='verification-details'>
          <RenderedAttestation verification={verification}/>
        </Box>
      )}
      {renderedHTML && verification?.isVerified && (
        <Box>
          <RenderedCertificate
            renderedHTML={renderedHTML}
            verification={verification}
          />
        </Box>
      )}
    </>
  );
};

const VerifiedDocument = ({
  verification
}: {
  verification: FileVerification;
}) => {
  if (!verification.isVerified) {
    return (
      <p>
        <span role='img' aria-label='No'>
          ❌
        </span>{' '}
        {verification.fileName} is not verified
      </p>
    );
  }
  return (
    <>
      <p>
        <span role='img' aria-label='Yes'>
          ✅
        </span>{' '}
        {verification.fileName} is verified
      </p>
      <p>Creator: {verification.creator}</p>
      <p>
        Timestamp:{' '}
        {new Date(verification.timestamp).toLocaleString('en-UK', {
          timeZone: 'UTC'
        })}
      </p>
      <a
        className='bcdb-link'
        href={verification.link}
        target='_blank'
        rel='noopener noreferrer'
      >
        See transaction
      </a>
    </>
  );
};

const RenderedCertificate = ({
  renderedHTML,
  verification
}: {
  renderedHTML: RenderCertificateResult;
  verification: FileVerification | undefined;
}) => {
  if (verification?.isVerified) {
    return (
      <iframe
        title='Rendered Certificate'
        srcDoc={renderedHTML.certificateHtml}
        width='100%'
        height='500px'
      />
    );
  }
  return <p></p>;
};

const renderedAccreditation = ({
  Accreditation
}: {
  Accreditation: string | string[];
}) => {
  const accreditation = (credit: string) => (
    <p>
      <a
        className='bcdb-link'
        href={credit}
        target='_blank'
        rel='noopener noreferrer'
      >
          Accreditation
      </a>
    </p>
  );
  if (typeof Accreditation === 'string') {
    return accreditation(Accreditation);
  }
  return (
    <>
      {Accreditation.map((credit) => accreditation(credit))}
    </>
  );
};

const RenderedAttestation = ({
  verification
}: {
  verification: VerificationResult;
}) => {
  if (verification.isVerified && verification?.attestation) {
    const {attestation} = verification;
    return (
      <>
        <p>Company: {attestation.CompanyName}</p>
        <p>Email: {attestation.Email}</p>
        <p>
          <a
            className='bcdb-link'
            href={attestation.WWW as string}
            target='_blank'
            rel='noopener noreferrer'
          >
            Company website
          </a>
        </p>
        {renderedAccreditation({
          Accreditation: attestation.Accreditation as string | string[]
        })}
        <a
          className='bcdb-link'
          href={attestation.link as string}
          target='_blank'
          rel='noopener noreferrer'
        >
          See self attestation
        </a>
      </>
    );
  }
  return <p></p>;
};
