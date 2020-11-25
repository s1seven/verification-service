import React, {useState} from 'react';
import {FileUploaderBox} from '../common/FileUploaderBox';
import {useServices} from '../hooks/useServices';
import {useSnackbar} from '../hooks/useSnackbar';
import {Box} from '../common/Box';
import {
  Attestation,
  Verification as VerificationResult
} from 'verification-service-common/models';
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
      <RenderedAttestation attestation={verification.attestation}/>
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
  Accreditations
}: {
  Accreditations: string | string[] | undefined;
}) => {
  const accreditation = (credit: string) => (
    <p>
      <a
        className='bcdb-link'
        href={credit}
        target='_blank'
        rel='noopener noreferrer'
      >
        {credit}
      </a>
    </p>
  );
  if (typeof Accreditations === 'string') {
    return accreditation(Accreditations);
  }
  if (Accreditations instanceof Array) {
    return <>{Accreditations.map((credit) => accreditation(credit))}</>;
  }
  return <></>;
};

const mailLink = (Email: string) => `mailto: ${Email}`;

const RenderedAttestation = ({
  attestation
}: {
  attestation: Attestation | null;
}) => {
  if (!attestation) {
    return <p></p>;
  }
  return (
    <>
      <p>{attestation.CompanyName}</p>
      <p>
        <a className='bcdb-link' href={mailLink(attestation.Email)}>
          {attestation.Email}
        </a>
      </p>
      <p>
        <a
          className='bcdb-link'
          href={attestation.WWW}
          target='_blank'
          rel='noopener noreferrer'
        >
          {attestation.WWW}
        </a>
      </p>
      {renderedAccreditation({
        Accreditations: attestation.Accreditations
      })}
      <p>
        <a
          className='bcdb-link'
          href={attestation.link as string}
          target='_blank'
          rel='noopener noreferrer'
        >
          See self attestation
        </a>
      </p>
    </>
  );
};
