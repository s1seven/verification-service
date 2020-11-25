import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {Verification} from '../../../ui/Dashboard/Verification';
import {flushAllPromises} from '../../utils';
import {ServiceContext} from '../../../services/serviceContext';
import {SnackbarProvider} from '../../../ui/common/Snackbar/SnackbarProvider';
import {Result} from '@restless/sanitizers';

describe('Verification Component', () => {
  let wrapper: ReactWrapper;
  let input: ReactWrapper;

  const verifiedFile = new File([new Blob(['certificate'], {type: 'application/json'})], 'certificate.json', {type: 'application/json'});
  const notVerifiedFile = new File([new Blob(['not certificate'], {type: 'application/json'})], 'file.txt', {type: 'application/json'});
  const notValidCertificate = notVerifiedFile;

  const simulateFileUpload = async (file: File) => {
    const files: FileList = {
      length: 1,
      item: () => file
    };
    input.simulate('change', {target: {files}});
    await flushAllPromises();
    wrapper.update();
  };

  beforeEach(() => {
    const mockServices = {
      verificationService: {
        verify: jest.fn()
      },
      validateCertificateFile: jest.fn((file: File) => (file.name === 'certificate.json' ?
        Result.ok({}) : Result.error('error'))),
      renderService: {
        renderCertificate: jest.fn(() => 'certificateHTML')
      }
    };
    mockServices.verificationService.verify.mockImplementation((file: File) => (file.name === 'certificate.json' ? {
      isVerified: true,
      fileName: 'certificate.json',
      creator: 'ABC12',
      timestamp: '2020-03-05T13:11:38.565Z',
      id: 'CVB-12',
      link: 'link'
    } : {
      isVerified: false,
      fileName: 'file.txt'
    }));
    wrapper = mount(
      <ServiceContext.Provider value={mockServices as any}>
        <SnackbarProvider>
          <Verification/>
        </SnackbarProvider>
      </ServiceContext.Provider>
    );
    input = wrapper.find('input');
  });

  it('renders correctly not verified file result', async () => {
    await simulateFileUpload(notVerifiedFile);
    const certificateResultParagraphs = wrapper.find('.verification-details').find('p');
    expect(certificateResultParagraphs.text()).toBe('❌ file.txt is not verified');
  });

  it('renders correctly verified file result', async () => {
    await simulateFileUpload(verifiedFile);
    const certificateResultParagraphs = wrapper.find('.verification-details').find('p');
    expect(certificateResultParagraphs.at(0).text()).toBe('✅ certificate.json is verified');
    expect(certificateResultParagraphs.at(1).text()).toBe('Creator: ABC12');
    expect(certificateResultParagraphs.at(2).text()).toBe('');
    expect(certificateResultParagraphs.at(3).text()).toBe('Timestamp: 3/5/2020, 1:11:38 PM');
  });

  it('renders html if certificate is valid', async () => {
    await simulateFileUpload(verifiedFile);
    expect(wrapper.find('RenderedCertificate').exists()).toBeTruthy();
    expect(wrapper.find('iframe').props().width).toBe('100%');
    expect(wrapper.find('iframe').props().height).toBe('500px');
  });

  it('does not render html if certificate is not valid', async () => {
    await simulateFileUpload(notValidCertificate);
    expect(wrapper.find('RenderedCertificate').exists()).toBeFalsy();
  });
});
