import React from 'react';
import messages from './messages';
import { useIntl } from 'react-intl';

export interface DashboardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({
  title,
  description,
  children
}) => {
  const intl = useIntl(); // ✅ Hook now inside component

  const resolvedTitle =
    title ?? intl.formatMessage(messages.myForms);
  const resolvedDescription =
    description ?? intl.formatMessage(messages.customDashboardDescription);

  return (
    <div className="py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="p-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {resolvedTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {resolvedDescription}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">{children}</div>
      </div>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';
