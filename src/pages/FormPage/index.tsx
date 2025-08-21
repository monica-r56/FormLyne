import React, { useState } from "react";
import { Navbar } from "@/components/layout/NavBar";
import { SidePanel } from "@/components/layout/SidePanel";
import { IconButton } from "@/components/ui/IconButton";
import { Tooltip } from "@/components/ui/Tooltip";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import  IssueForm  from "@/components/form/Static";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faSignOutAlt,
  faSearch,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FormattedMessage, useIntl } from "react-intl";
import messages from "./messages";

const FormPage: React.FC = () => {
  const { formatMessage } = useIntl();
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [isLinearAuth, setIsLinearAuth] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-zinc-900">
      <div className="flex-1 flex flex-col">
        {/* Navbar (same as HomePage) */}
        <Navbar
          className="shadow-md px-2 sm:pl-0 sm:pr-4 z-20"
          left={
            <div className="flex items-center gap-3">
              {/* SidePanel */}
              <SidePanel size="sm" placement="left" dismissable>
                <SidePanel.Trigger>
                  <IconButton icon={<FontAwesomeIcon icon={faBars} />} size="md" />
                </SidePanel.Trigger>
                <SidePanel.Header>
                  <h2 className="text-xl font-semibold">
                    <FormattedMessage {...messages.sidePanelTitle} />
                  </h2>
                </SidePanel.Header>
                <SidePanel.Body className="flex flex-col gap-2 p-4">
                  {[
                    { label: formatMessage(messages.navHome), action: () => console.log("Navigate to Home") },
                    { label: formatMessage(messages.navForms), action: () => console.log("Navigate to Forms") },
                    { label: formatMessage(messages.navDocs), action: () => console.log("Navigate to Docs") },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="
                        flex items-center px-4 py-2 rounded-lg transition-all duration-200
                        text-gray-700 dark:text-gray-200
                        hover:bg-gray-100 dark:hover:bg-gray-700
                        hover:text-blue-600 dark:hover:text-blue-400
                        font-medium
                      "
                    >
                      {item.label}
                    </button>
                  ))}
                </SidePanel.Body>
              </SidePanel>

              <span className="text-lg font-bold hidden sm:inline">Formlyne</span>
            </div>
          }
          right={
            <div className="flex items-center gap-2 sm:gap-3">
              <Tooltip label="Google" position="bottom-center">
                <IconButton
                  icon={<FontAwesomeIcon icon={faGoogle} />}
                  size="md"
                  className={
                    isGoogleAuth
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }
                  onClick={() => setIsGoogleAuth(!isGoogleAuth)}
                />
              </Tooltip>

              <Tooltip label="Linear" position="bottom-center">
                <IconButton
                  icon={<FontAwesomeIcon icon={faBolt} />}
                  size="md"
                  className={
                    isLinearAuth
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }
                  onClick={() => setIsLinearAuth(!isLinearAuth)}
                />
              </Tooltip>

              <ThemeToggle size="lg" />

              <Tooltip label={formatMessage(messages.searchTooltip)} position="bottom-center">
                <IconButton icon={<FontAwesomeIcon icon={faSearch} />} size="md" />
              </Tooltip>

              {/* Profile */}
              <div className="relative">
                <Tooltip label={formatMessage(messages.profileTooltip)} position="bottom-center">
                  <IconButton
                    icon={<FontAwesomeIcon icon={faUser} />}
                    size="md"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  />
                </Tooltip>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-2 z-50">
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md w-full"
                      onClick={() => console.log("Logout")}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <FormattedMessage {...messages.logout} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          }
        />

        {/* Form Content */}
        <main className="flex-1 flex flex-col items-center justify-start py-4">
          <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              <FormattedMessage {...messages.formPageTitle} />
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4 max-w-xl mx-auto">
              <FormattedMessage {...messages.formPageDescription} />
            </p>

            {/* Render the form */}
            <IssueForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FormPage;