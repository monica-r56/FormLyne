import { UploadMedia } from '.';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'Components/Issue/UploadMedia',
  component: UploadMedia,
  tags: ['autodocs']
};

export const WithTextButtonTrigger = () => (
  <UploadMedia
    trigger={
      <Button
        label="Upload File"
        className="bg-blue-700 text-white hover:bg-blue-600 border border-blue-700"
        type="button"
      />
    }
  />
);

export const WithIconButtonTrigger = () => (
  <UploadMedia
    trigger={
      <IconButton
        icon={<FontAwesomeIcon icon={faPaperclip} />}
        type="Primary"
        color="blue"
        size="md"
        aria-label="Upload file"
      />
    }
  />
);
