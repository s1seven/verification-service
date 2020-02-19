import React, {useRef, useState} from 'react';
import UploadIcon from './../../assets/upload.svg';
import {Spinner} from './Spinner';
import {cn} from '../../utils/cn';

export interface FileUploaderProps {
  hintText: string;
  onFileUploaded: (file: File) => void;
}

export const FileUploader = ({hintText, onFileUploaded = () => {}}: FileUploaderProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const [spinner, setSpinner] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const uploadFile = async function (fileHandler: HTMLInputElement | DataTransfer) {
    if (!fileHandler.files) {
      return;
    }
    const file = fileHandler.files.item(0);
    if (file) {
      setSpinner(true);
      try {
        await onFileUploaded(file);
      } finally {
        setSpinner(false);
      }
    }
  };

  const openFileDialog = () => {
    if (fileInput && fileInput.current !== null) {
      fileInput.current.click();
    }
  };

  const onFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggedOver(false);
    await uploadFile(event.dataTransfer);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isDraggedOver) {
      setIsDraggedOver(true);
    }
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isDraggedOver) {
      setIsDraggedOver(false);
    }
  };

  const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = event;
    await uploadFile(target);
    target.value = '';
  };

  return (
    <div
      className={cn('file-uploader', isDraggedOver && 'drag-over')}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onFileDrop}>
      <input
        ref={fileInput}
        className='file-uploader-input'
        type='file'
        onChange={onFileSelected}
      />
      {spinner ? (
        <Spinner/>
      ) : (
        <>
          <img src={UploadIcon} alt='upload' className='file-uploader-icon'/>
          <p className='file-uploader-title'>Drag & Drop or <button
            onClick={openFileDialog}>Browse</button>
          </p>
          <p className='file-uploader-text'>{hintText}</p>
        </>
      )}
    </div>
  );
};
