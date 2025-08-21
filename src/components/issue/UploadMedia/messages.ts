import { defineMessages } from 'react-intl';

const messages = defineMessages({
  upload: {
    id: 'uploadMedia.upload',
    defaultMessage: 'Upload File',
  },
  close: {
    id: 'uploadMedia.close',
    defaultMessage: 'Close',
  },
  uploadSuccess: {
    id: 'uploadMedia.uploadSuccess',
    defaultMessage: 'File is uploaded successfully',
  },
  uploadError: {
    id: 'uploadMedia.uploadError',
    defaultMessage: 'There was an error in uploading the file, please try again',
  },
  sizeLimitExceeded: {
    id: 'uploadMedia.sizeLimitExceeded',
    defaultMessage: 'File exceeds the maximum size limit of 10MB',
  },
  uploadMediaTitle: {
    id: 'uploadMedia.title',
    defaultMessage: 'Upload Media',
  },
  fileNameLabel: {
    id: 'uploadMedia.fileNameLabel',
    defaultMessage: 'File Name',
  },
  cancel: {
    id: 'uploadMedia.cancel',
    defaultMessage: 'Cancel',
  },
  save: {
    id: 'uploadMedia.save',
    defaultMessage: 'Save',
  },
  uploadTriggerLabel: {
    id: 'uploadMedia.triggerLabel',
    defaultMessage: 'Upload media',
  },
  fileUploadedTitle: {
    id: 'uploadMedia.fileUploadedTitle',
    defaultMessage: 'File uploaded',
  },
});

export default messages;
