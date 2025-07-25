import LabelGroup from '@components/LabelGroup';
import { twMerge } from 'tailwind-merge';

type HeaderTileProps = {
  label: string;
  labelClassName?: string;
  className?: string;
};

const HeaderTile = ({ label, labelClassName, className }: HeaderTileProps) => {
  return (
    <div
      className={twMerge('flex w-full rounded-[8px] border border-zinc-200 px-4 py-3 dark:border-zinc-700', className)}
    >
      <LabelGroup label={label} labelClassName={labelClassName} />
    </div>
  );
};

export default HeaderTile;
