'use client';

import React, { useRef, useState } from 'react';
import TitleInput from '@/components/issue/Title';
import DescriptionEditor from '@/components/issue/Description';
import StatusDropdown from '@/components/issue/Status';
import PriorityDropdown from '@/components/issue/Priority';
import AssigneeSelector from '@/components/issue/Assignee';
import LabelDropdown from '@/components/issue/Label';
import { UploadMedia } from '@/components/issue/UploadMedia';
import DueDatePicker from '@/components/issue/DatePicker';
import LinkInput from '@/components/issue/AddLink';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import type { StatusValue } from '@/components/issue/Status';
import type { PriorityValue } from '@/components/issue/Priority';
import type { LabelValue } from '@/components/issue/Label';

const IssueForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<StatusValue>('To do');
  const [priority, setPriority] = useState<PriorityValue>('Urgent');
  const [assignees, setAssignees] = useState<string[]>([]);
  const [labels, setLabels] = useState<LabelValue>('Bug');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [url, setUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');

  const mediaRef = useRef<{ reset: () => void } | null>(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('To do');
    setPriority('No priority');
    setAssignees([]);
    setLabels('Feature');
    setDueDate(null);
    setUrl('');
    setLinkTitle('');
    mediaRef.current?.reset();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    console.log({ title, description, status, priority, assignees, labels, dueDate, url, linkTitle });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto backdrop-blur-md bg-zinc-200 dark:bg-gray-900 border-2 border-green-700 dark:border-green-300 p-6 md:p-10 rounded-lg shadow-md space-y-6 transition-colors duration-300"
    >
      {/* Title */}
      <div className="w-full">
        <label className="block mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
          Title <span className="text-red-500">*</span>
        </label>
        <TitleInput
          placeholder="Enter title..."
          className="w-full border border-zinc-300 dark:border-zinc-600 rounded-lg placeholder:font-extralight p-3 font-medium bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <label className="block mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">Description</label>
        <DescriptionEditor onChange={setDescription} value={description} />
      </div>

      {/* Status, Priority, Label in grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">Status</label>
          <StatusDropdown
            value={status}
            onChange={(val) => setStatus(val as StatusValue)}
            className="w-full rounded-lg dark:bg-zinc-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">Priority</label>
          <PriorityDropdown
            value={priority}
            options={[
              { value: 'No priority', label: 'No priority' },
              { value: 'Urgent', label: 'Urgent' },
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' },
            ]}
            className="w-full rounded-lg dark:bg-zinc-700 text-gray-900 dark:text-white"
            onChange={(val) => setPriority(val as PriorityValue)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">Label</label>
          <LabelDropdown
            value={labels}
            options={[
              { value: 'Bug', label: 'Bug' },
              { value: 'Feature', label: 'Feature' },
              { value: 'Improvement', label: 'Improvement' },
            ]}
            onChange={(val) => setLabels(val as LabelValue)}
            className="w-full rounded-lg dark:bg-zinc-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Assignee */}
      <div className="w-full">
        <label className="block mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">Assignee</label>
        <AssigneeSelector
          className="w-full bg-white dark:bg-zinc-800 p-4 border border-zinc-300 dark:border-zinc-600 rounded-lg text-gray-700 dark:text-white"
          onEmailsChange={setAssignees}
        />
      </div>

      {/* Upload Media */}
      <div className="w-full">
        <label className="block mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">Upload Media</label>
        <UploadMedia
          innerRef={mediaRef}
          trigger={
            <Button
              label="Upload File"
              className="bg-blue-700 dark:bg-blue-300 text-white dark:text-zinc-900 hover:bg-blue-600 dark:hover:bg-blue-400 border border-blue-700 dark:border-blue-300"
              type="button"
            />
          }
        />
      </div>

      {/* Due Date */}
      <div className="w-full">
        <label className="block mb-1 text-sm font-semibold text-gray-800 dark:text-gray-200">Due Date</label>
        <DueDatePicker
          selectedDate={dueDate}
          onDateChange={setDueDate}
          className="w-full bg-white dark:bg-zinc-800 p-4 border border-zinc-300 dark:border-zinc-600 rounded-lg"
          inputClassName="text-zinc-900 dark:text-zinc-100"
          calendarClassName="bg-blue-50 border-blue-300"
        />
      </div>

      {/* Related Link */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Related Link</label>
        <div className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 rounded-lg p-4">
          <LinkInput
            url={url}
            title={linkTitle}
            onUrlChange={setUrl}
            onTitleChange={setLinkTitle}
            className="w-full"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <Tooltip label="Reset form" position="top-right" arrow>
          <button
            type="button"
            onClick={resetForm}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
          >
            <FontAwesomeIcon icon={faArrowRotateRight} className="text-gray-800 dark:text-white" />
          </button>
        </Tooltip>
        <Button
          label="Submit"
          className="bg-green-600 dark:bg-green-400 hover:bg-green-500 text-white dark:text-black font-semibold px-6 py-2 rounded-lg"
          type="submit"
        />
      </div>
    </form>
  );
};

export default IssueForm;
