import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

interface TitleInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
}

const STORAGE_KEY = 'titleInputValue';

const TitleInput: React.FC<TitleInputProps> = ({
  className,
  placeholder = 'Enter title',
  onChange,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(() => sessionStorage.getItem(STORAGE_KEY) || '');

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';

      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight || '24', 10);
      const maxHeight = lineHeight * 4;

      textarea.style.overflowY = 'hidden';
      textarea.style.height = `${textarea.scrollHeight}px`;

      if (textarea.scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = 'auto';
      }
    }
  };

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    adjustHeight();

    return () => window.removeEventListener('resize', handleResize);
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setValue(newVal);
    sessionStorage.setItem(STORAGE_KEY, newVal);
    onChange?.(e);
    adjustHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      className={clsx(
        'w-full resize-none',
        'border border-gray-300 rounded-md px-3 py-2',
        'bg-white dark:bg-zinc-700 text-lg font-semibold leading-tight',
        'placeholder:text-gray-400 placeholder:font-small font-medium dark:placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-300',
        'transition-all duration-200 ease-in-out',
        className
      )}
      placeholder={placeholder}
      value={value}
      rows={1}
      onChange={handleInput}
      {...props}
    />
  );
};

export default TitleInput;
