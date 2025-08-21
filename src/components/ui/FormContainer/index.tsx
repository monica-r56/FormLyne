import React from 'react';
import Card from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { useToast } from '@/hooks/use-toast';
import { useIntl } from 'react-intl';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons';

interface FormContainerProps {
  id: string;
  title: string;
  shareId: string;
  onDelete?: (formId: string) => void;
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  id,
  title,
  shareId,
  onDelete,
  className,
}) => {
  const { toast } = useToast();
  const { formatMessage } = useIntl();

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/form/${shareId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: formatMessage({ id: 'form.link_copied' }),
        description: formatMessage({ id: 'form.link_copied_desc' }),
      });
    } catch {
      toast({
        title: formatMessage({ id: 'form.copy_failed' }),
        description: formatMessage({ id: 'form.copy_failed_desc' }),
        variant: 'destructive',
      });
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm(formatMessage({ id: 'form.confirm_delete' }))) {
      onDelete(id);
    }
  };

  return (
    <Card
      className={cn(
        // Base container
        'relative flex flex-col justify-between max-w-[300px] py-2 sm:py-0 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-zinc-900',
        // Stroke styling
        "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[6px] before:bg-blue-600 dark:before:bg-blue-300 before:rounded-l-xl",
        // Height adjustments for screens
        'max-h-25',
        className
      )}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          <div className="flex space-x-1">
            <IconButton
              type="Secondary"
              color="gray"
              icon={<FontAwesomeIcon icon={faShareNodes} />}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleShare}
            />
            {onDelete && (
              <IconButton
                type="Secondary"
                color="red"
                icon={<FontAwesomeIcon icon={faTrash} />}
                className="hover:bg-red-100 dark:hover:bg-red-900/20"
                onClick={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
