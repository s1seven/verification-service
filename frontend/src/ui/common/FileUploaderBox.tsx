/* eslint-disable @typescript-eslint/no-unused-vars */
import {Box, BoxHeader, BoxTitle} from './Box';
import {FileUploader, FileUploaderProps} from './FileUploader';
import React from 'react';

export interface FileUploaderBoxProps extends FileUploaderProps {
  titleText: string;
}

export const FileUploaderBox = ({titleText, ...fileUploaderProps}: FileUploaderBoxProps): JSX.Element => (
  <Box>
    <BoxHeader>
      <BoxTitle>{titleText}</BoxTitle>
    </BoxHeader>
    <FileUploader {...fileUploaderProps}/>
  </Box>
);
