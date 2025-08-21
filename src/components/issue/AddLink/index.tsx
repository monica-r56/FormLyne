import React, { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';

interface AddLinkProps {
  url?: string;
  title?: string;
  onUrlChange?: (val: string) => void;
  onTitleChange?: (val: string) => void;
  className?: string;
}

const URL_STORAGE_KEY = 'add_link_url';
const TITLE_STORAGE_KEY = 'add_link_title';

export const AddLink: FC<AddLinkProps> = ({
  url,
  title,
  onUrlChange,
  onTitleChange,
  className = '',
}) => {
  const intl = useIntl();

  const [localUrl, setLocalUrl] = useState(url || sessionStorage.getItem(URL_STORAGE_KEY) || '');
  const [localTitle, setLocalTitle] = useState(title || sessionStorage.getItem(TITLE_STORAGE_KEY) || '');

  useEffect(() => {
    sessionStorage.setItem(URL_STORAGE_KEY, localUrl);
    onUrlChange?.(localUrl);
  }, [localUrl, onUrlChange]);

  useEffect(() => {
    sessionStorage.setItem(TITLE_STORAGE_KEY, localTitle);
    onTitleChange?.(localTitle);
  }, [localTitle, onTitleChange]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col gap-1">
        <label htmlFor="url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {intl.formatMessage(messages.urlLabel)}
        </label>
        <input
          id="url"
          type="url"
          value={localUrl}
          onChange={(e) => setLocalUrl(e.target.value)}
          className="border border-gray-100 dark:border-zinc-700 text-md italic text-blue-700 dark:text-blue-300 placeholder:font-extralight rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-300 bg-zinc-100 dark:bg-zinc-700"
          placeholder={intl.formatMessage(messages.urlPlaceholder)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {intl.formatMessage(messages.titleLabel)}
        </label>
        <input
          id="title"
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          className="border border-gray-100 dark:border-zinc-700 placeholder:font-extralight rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-300 bg-zinc-100 dark:bg-zinc-700 dark:text-white"
          placeholder={intl.formatMessage(messages.titlePlaceholder)}
        />
      </div>
    </div>
  );
};

export default AddLink;
