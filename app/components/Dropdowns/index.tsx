import { useState, useEffect, useMemo, useRef, type FC, type ReactNode, type KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import { FormattedMessage } from 'react-intl';
import clsx from 'clsx';
import { filter, some, map } from 'lodash';
import MenuItem from '../MenuItem';
import { Loader } from '@components/Loader';
import { Input } from '@components/Input';

export interface Option {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
}

interface DropdownProps {
  placeholder?: string;
  options: Option[];
  isSearchable?: boolean;
  isCreatable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  defaultSelected?: string;
  onValueChange?: (val: string) => void;
  onCreateOption?: (val: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({
  placeholder = 'Select',
  options,
  isSearchable = false,
  isCreatable = false,
  loading = false,
  disabled = false,
  defaultSelected = '',
  onValueChange,
  icon,
  onCreateOption,
}) => {
  const [search, setSearch] = useState<string>('');
  const [internalOptions, setInternalOptions] = useState<Option[]>(options);
  const [selected, setSelected] = useState<string>(defaultSelected);
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalOptions(options);
  }, [options]);

  useEffect(() => {
    onValueChange?.(selected);
  }, [selected, onValueChange]);

  const selectedOption = internalOptions.find((opt) => opt.value === selected);

  const filtered = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    return trimmed
      ? filter(internalOptions, (opt: Option) => opt.label.toLowerCase().includes(trimmed))
      : internalOptions;
  }, [search, internalOptions]);

  const shouldShowCreate = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    return (
      isCreatable &&
      trimmed !== '' &&
      !some(internalOptions, (opt: Option) => opt.label.trim().toLowerCase() === trimmed)
    );
  }, [isCreatable, search, internalOptions]);

  const handleSelect = (val: string) => {
    setSelected(val);
    setSearch('');
    setOpen(false);
  };

  const handleCreate = () => {
    const trimmed = search.trim();
    const newOption: Option = { label: trimmed, value: trimmed };
    setInternalOptions((prev) => [...prev, newOption]);
    onCreateOption?.(trimmed);
    handleSelect(newOption.value);
  };

  const handleInputChange = (value: string) => {
    if (!isSearchable && !isCreatable) return;
    setSearch(value);
    if (!open) setOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <Input
        type="text"
        value={
          isSearchable || isCreatable ? (open ? search : selectedOption?.label || '') : selectedOption?.label || ''
        }
        onChange={(e) => handleInputChange(e.target.value)}
        readOnly={!isSearchable && !isCreatable}
        disabled={disabled}
        placeholder={placeholder}
        showClearButton={(isSearchable || isCreatable) && (search.trim() !== '' || !selectedOption)}
        onClear={() => setSearch('')}
        leftIcon={isSearchable && open ? <FontAwesomeIcon icon={faMagnifyingGlass} /> : icon}
        rightIcon={
          loading ? (
            <Loader size="sm" color="black" />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={clsx('text-zinc-600 transition-transform dark:text-zinc-400', open && 'rotate-180')}
              onClick={() => setOpen((prev) => !prev)}
            />
          )
        }
        className="[&_.input-style]:hover:cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (filtered.length > 0 || shouldShowCreate) && (
        <div
          className="absolute z-50 mt-1 max-h-47 w-full overflow-auto rounded-md border bg-white p-1 shadow-md dark:bg-zinc-800"
          role="listbox"
        >
          {map(filtered, (item) => (
            <div
              key={item.value}
              role="option"
              tabIndex={0}
              aria-selected={selected === item.value}
              onClick={() => handleSelect(item.value)}
              onKeyDown={(e) => handleKeyDown(e, () => handleSelect(item.value))}
              className="flex cursor-pointer items-center"
            >
              {item.icon}
              <MenuItem
                id={item.value}
                label={item.label}
                description={item.description}
                selected={selected === item.value}
              />
            </div>
          ))}

          {shouldShowCreate && (
            <div
              role="button"
              tabIndex={0}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
              onClick={handleCreate}
              onKeyDown={(e) => handleKeyDown(e, handleCreate)}
            >
              <span>
                <FormattedMessage id="molecules.Dropdown.add" defaultMessage="Add" />
                <span className="ml-1 font-medium">{search}</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
