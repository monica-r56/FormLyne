import React, { useState, useRef, ReactNode, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import messages from './messages';
import { Banner } from '@/components/ui/Banner';
import { Button } from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

interface UploadMediaProps {
  trigger: ReactNode;
  innerRef: React.MutableRefObject<{ reset: () => void }>;
  maxFileSizeMB?: number;
}

type UploadStatus = 'idle' | 'loading' | 'success' | 'error' | 'too-large';

export const UploadMedia = ({
  trigger,
  innerRef,
  maxFileSizeMB = 10,
}: UploadMediaProps) => {
  const intl = useIntl();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [bannerMessage, setBannerMessage] = useState('');
  const [bannerClass, setBannerClass] = useState('');
  const [savedFileName, setSavedFileName] = useState<string | null>(null);
  const [isContainerOpen, setIsContainerOpen] = useState(false);

  useEffect(() => {
    const storedFileName = sessionStorage.getItem('uploadedFileName');
    if (storedFileName) {
      setSavedFileName(storedFileName);
    }
  }, []);

  // Expose reset method to parent
  useEffect(() => {
    if (innerRef) {
      innerRef.current = {
        reset: () => {
          onCancel();
        },
      };
    }
  }, [innerRef]);

  const onTriggerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pickedFile = e.target.files?.[0];
    if (!pickedFile) return;
    setFile(pickedFile);
    setUploadStatus('loading');
    setBannerMessage('');
    setBannerClass('');
    setIsContainerOpen(true);

    setTimeout(() => {
      if (pickedFile.size > maxFileSizeMB * 1024 * 1024) {
        setUploadStatus('too-large');
        setBannerMessage(intl.formatMessage(messages.sizeLimitExceeded));
        setBannerClass('bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-200');
      } else {
        if (Math.random() < 0.1) {
          setUploadStatus('error');
          setBannerMessage(intl.formatMessage(messages.uploadError));
          setBannerClass('bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200');
        } else {
          setUploadStatus('success');
          setBannerMessage(intl.formatMessage(messages.uploadSuccess));
          setBannerClass('bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200');
        }
      }
    }, 1800);
  };

  const onCancel = () => {
    setFile(null);
    setUploadStatus('idle');
    setBannerMessage('');
    setBannerClass('');
    setIsContainerOpen(false);
    setSavedFileName(null);
    sessionStorage.removeItem('uploadedFileName');
  };

  const onSave = () => {
    if (file && uploadStatus === 'success') {
      sessionStorage.setItem('uploadedFileName', file.name);
      setSavedFileName(file.name);
      setIsContainerOpen(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="*/*"
        onChange={onFileChange}
      />
      {/* Trigger */}
      <span
        role="button"
        tabIndex={0}
        onClick={onTriggerClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onTriggerClick();
          }
        }}
        aria-label={intl.formatMessage(messages.uploadTriggerLabel)}
        style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
      >
        {trigger}
        {savedFileName && (
          <span
            className="inline-flex items-center gap-1 text-green-700 dark:text-green-400"
            aria-label={savedFileName}
          >
            <FontAwesomeIcon
              icon={faFile}
              title={intl.formatMessage(messages.fileUploadedTitle)}
              style={{ fontSize: '1.25rem' }}
              aria-hidden="true"
            />
            <span className="truncate max-w-xs" title={savedFileName}>
              {savedFileName}
            </span>
          </span>
        )}
      </span>

      {/* Container */}
      {isContainerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={onCancel}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-media-title"
            tabIndex={-1}
            className="fixed z-50 max-w-md w-full p-4 sm:p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <h2
              id="upload-media-title"
              className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100"
            >
              <FormattedMessage {...messages.uploadMediaTitle} defaultMessage="Upload Media" />
            </h2>

            {file && (
              <>
                <div className="mb-2 font-medium text-gray-800 dark:text-gray-100">
                  <FormattedMessage {...messages.fileNameLabel} defaultMessage="File Name" />
                </div>
                <div className="mb-2 text-gray-600 dark:text-gray-300 truncate">{file.name}</div>
              </>
            )}

            {uploadStatus === 'loading' && (
              <div className="flex justify-center my-8" aria-live="polite" aria-busy="true">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 dark:border-blue-300" />
              </div>
            )}

            {uploadStatus !== 'loading' && bannerMessage && (
              <Banner title={bannerMessage} icon iconPosition="left" className={bannerClass} />
            )}

            <div className="flex justify-end gap-3 mt-6">
              <Button
                label={intl.formatMessage(messages.cancel)}
                onClick={onCancel}
                className="bg-gray-300 dark:bg-zinc-700"
              />
              {uploadStatus === 'success' && (
                <Button
                  label={intl.formatMessage(messages.save)}
                  onClick={onSave}
                  className="bg-blue-700 text-white"
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
