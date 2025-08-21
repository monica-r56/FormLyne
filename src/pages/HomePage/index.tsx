import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { FormContainer } from "@/components/ui/FormContainer";
import { SidePanel } from "@/components/layout/SidePanel";
import { Navbar } from "@/components/layout/NavBar";
import { Dashboard } from "@/components/layout/Dashboard";
import { Tooltip } from "@/components/ui/Tooltip";
import { IconButton } from "@/components/ui/IconButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faSignOutAlt,
  faBars,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FormattedMessage, useIntl } from "react-intl";
import messages from "./messages";

const HomePage: React.FC = () => {
  const { formatMessage } = useIntl();
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [isLinearAuth, setIsLinearAuth] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const filledFormsCount = 0;

  const handleFillForm = () => {
    console.log("Fill Form button clicked");
    alert("Fill Form button clicked");
  };

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-zinc-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar
          className="shadow-md px-2 sm:pl-0 sm:pr-4 z-20"
          left={
            <div className="flex items-center gap-3">
              {/* SidePanel Trigger */}
              <SidePanel size="sm" placement="left" dismissable>
                <SidePanel.Trigger>
                  <IconButton icon={<FontAwesomeIcon icon={faBars} />} size="md" />
                </SidePanel.Trigger>
                <SidePanel.Header>
                  <h2 className="text-xl font-semibold">Explore Formlyne</h2>
                </SidePanel.Header>
                <SidePanel.Body className="flex flex-col gap-4 p-6">
                  <SidePanel.Body className="flex flex-col gap-2 p-4">
                    {[
                      { label: "Home", action: () => console.log("Navigate to Home") },
                      { label: "Forms", action: () => console.log("Navigate to Forms") },
                      { label: "Docs", action: () => console.log("Navigate to Docs") },
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
                </SidePanel.Body>
              </SidePanel>

              {/* Formlyne Text Label */}
              <span className="text-lg font-bold hidden sm:inline">
                Formlyne
              </span>
            </div>
          }
          right={
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Google Auth Icon */}
              <Tooltip label="Google" position="bottom-center">
                <IconButton
                  icon={<FontAwesomeIcon icon={faGoogle} />}
                  size="md"
                  className={isGoogleAuth ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}
                  onClick={() => setIsGoogleAuth(!isGoogleAuth)}
                />
              </Tooltip>

              {/* Linear Auth Icon */}
              <Tooltip label="Linear" position="bottom-center">
                <IconButton
                  icon={<FontAwesomeIcon icon={faBolt} />}
                  size="md"
                  className={isLinearAuth ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}
                  onClick={() => setIsLinearAuth(!isLinearAuth)}
                />
              </Tooltip>

              {/* Theme Toggle Component */}
              <ThemeToggle size="lg"/>

              {/* Search */}
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

        {/* Hero Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              <FormattedMessage {...messages.heroTitleHighlight} />
            </span>
            <br />
            <span>
              <FormattedMessage {...messages.heroTitle} />
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            <FormattedMessage {...messages.heroDescription} />
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row w-auto gap-4 justify-center">
            <div className="flex flex-col gap-4 p-4">
              <Button
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onClick={() => console.log("Static form creation")}
              >
                <FormattedMessage {...messages.createStaticForm} />
              </Button>
              <Button
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                onClick={handleFillForm}
              >
                <FormattedMessage {...messages.fillForm} />
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className=" w-full max-w-7xl mx-auto">
          <Dashboard
            title={formatMessage(messages.dashboardTitle)}
            description={formatMessage(messages.dashboardDescription)}
          >
            {filledFormsCount > 0 ? (
              <HorizontalScroll>
                {Array.from({ length: filledFormsCount }).map((_, idx) => (
                  <FormContainer
                    key={idx}
                    id={`${idx}`}
                    title={`Form ${idx + 1}`}
                    shareId={`share-${idx}`}
                  />
                ))}
              </HorizontalScroll>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-full">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0h-4m0 0H8m4-10V7m0 0H8m4 0h4"
                  />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs text-sm sm:text-base">
                  <FormattedMessage {...messages.emptyDashboard} />
                </p>
              </div>
            )}
          </Dashboard>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
