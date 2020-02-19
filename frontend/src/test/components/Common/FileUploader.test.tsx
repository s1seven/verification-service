import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {FileUploader} from '../../../ui/common/FileUploader';
import {flushAllPromises} from '../../utils';

describe('FileUploader', () => {
  let wrapper: ReactWrapper;
  let input: ReactWrapper;
  const hintText = 'Upload help';
  let fileUploadSpy: jest.Mock;

  const simulateFileUpload = (uploadType: 'dialog' | 'drop-json' | 'dialog-xml') => {
    const file = new File([new Blob(['file content'], {type: 'application/json'})], 'file', {type: 'application/json'});
    const xmlFile = new File([new Blob(['file content'], {type: 'text/xml'})], 'file', {type: 'text/xml'});
    const files: FileList = {
      length: 1,
      item: () => file
    };

    switch (uploadType) {
      case 'dialog':
        input.simulate('change', {target: {files}});
        return file;
      case 'drop-json':
        wrapper.simulate('drop', {dataTransfer: {files}});
        return file;
      case 'dialog-xml':
        input.simulate('change', {target: {
          files: {
            length: 1,
            item: () => xmlFile
          }
        }});
        return xmlFile;
    }
  };


  const simulateEmptyUpload = (uploadType: 'dialog' | 'drop') => {
    const files: FileList = {
      length: 0,
      item: () => null
    };

    if (uploadType === 'dialog') {
      input.simulate('change', {target: {files: null}});
      input.simulate('change', {target: {files}});
    } else {
      wrapper.simulate('drop', {dataTransfer: {files: null}});
      wrapper.simulate('drop', {dataTransfer: {files}});
    }
  };

  beforeEach(() => {
    fileUploadSpy = jest.fn();
    wrapper = mount(<FileUploader hintText={hintText} onFileUploaded={fileUploadSpy}/>);
    input = wrapper.find('input');
  });

  it('renders passed hintText', async () => {
    expect(wrapper.find('.file-uploader-text').text()).toBe(hintText);
  });

  it('opens file selection dialog on button click', () => {
    const openFileUploadDialog = jest.spyOn(HTMLInputElement.prototype, 'click');
    const openFileDialogButton = wrapper.find('.file-uploader-title button');
    openFileDialogButton.simulate('click');

    expect(openFileUploadDialog).toBeCalledTimes(1);
    openFileUploadDialog.mockRestore();
  });

  it('passes file to callback after it was selected in dialog', () => {
    const file = simulateFileUpload('dialog');
    expect(fileUploadSpy).toBeCalledWith(file);
  });

  it('does not call callback when no files were selected', () => {
    simulateEmptyUpload('dialog');
    expect(fileUploadSpy).not.toBeCalled();
  });

  it('passes file object to callback after drag and drop', () => {
    const file = simulateFileUpload('drop-json');
    expect(fileUploadSpy).toBeCalledWith(file);
  });

  it('does not call callback when after drag and drop no files were found', () => {
    simulateEmptyUpload('drop');
    expect(fileUploadSpy).not.toBeCalled();
  });

  it('works also for files that are not jsons', () => {
    const file = simulateFileUpload('dialog-xml');
    expect(fileUploadSpy).toBeCalledWith(file);
  });

  it('during file uploading, spinner appears', () => {
    simulateFileUpload('drop-json');
    expect(wrapper.find('.spinner')).toHaveLength(1);
  });

  it('after file has been uploaded, spinner disappear', async () => {
    simulateFileUpload('dialog');
    await flushAllPromises();
    wrapper.update();
    expect(wrapper.find('.spinner')).toHaveLength(0);
  });

  it('is possible to upload same file twice', async () => {
    simulateFileUpload('dialog');
    simulateFileUpload('dialog');
    expect(fileUploadSpy).toBeCalledTimes(2);
  });
});
