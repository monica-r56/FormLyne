import { FormattedMessage } from "react-intl";
import { Meta, StoryObj } from "@storybook/react";
import { Modal } from ".";
import { Button } from "../Button";
import React from "react";

const meta: Meta<typeof Modal> = {
  title: "Components/UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    dismissable: true,
  },
  argTypes: {
    dismissable: {
      control: "boolean",
      description:
        "Allows modal to be dismissed by clicking outside or pressing Escape",
      defaultValue: true,
    },
    width: {
      control: "text",
      description: "Width of the modal",
      defaultValue: "480px",
    },
    className: {
      control: "text",
      description: "Additional classes for the modal",
    },
    initialLoading: {
      control: "boolean",
      description:
        "Shows initial loading state when modal is triggered from a page",
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const NoHeader: Story = {
  render: (args) => (
    <Modal {...args}>
      <Modal.Trigger>
        <Button
          label="Open Modal"
          className="bg-blue-700 text-zinc-100"
          color="blue"
        />
      </Modal.Trigger>
      <Modal.Body>
        <p className="text-gray-800 dark:text-gray-100">
          <FormattedMessage id="modal.body" defaultMessage="This is a modal" />
        </p>
      </Modal.Body>
      <Modal.Footer
        primaryBtnConfig={{
          label: "Confirm",
          onClick: () => alert("Confirmed"),
        }}
        secondaryBtnConfig={{
          label: "Cancel",
          onClick: () => alert("Cancelled"),
        }}
      />
    </Modal>
  ),
};

export const NoActions: Story = {
  render: (args) => (
    <Modal {...args}>
      <Modal.Trigger>
        <Button
          label="Open Modal"
          className="bg-blue-700 text-zinc-100"
          color="blue"
        />
      </Modal.Trigger>
      <Modal.Header>
        <FormattedMessage
          id="modal.noActionFooter"
          defaultMessage="No Action Footer"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="text-gray-800 dark:text-gray-100">
          <FormattedMessage
            id="modal.noFooterActions"
            defaultMessage="This modal has no footer actions."
          />
        </p>
      </Modal.Body>
    </Modal>
  ),
};

export const NoHeaderNoAction: Story = {
  render: (args) => (
    <Modal {...args}>
      <Modal.Trigger>
        <Button
          label="Open Modal"
          className="bg-blue-700 text-zinc-100"
          color="blue"
        />
      </Modal.Trigger>
      <Modal.Body>
        <p className="text-gray-800 dark:text-gray-100">
          <FormattedMessage
            id="modal.noActionNoHeader"
            defaultMessage="This modal has no header and no footer actions."
          />
        </p>
      </Modal.Body>
    </Modal>
  ),
};

export const WithPageScroll: Story = {
  render: (args) => (
    <div className="min-h-screen space-y-12 overflow-y-auto bg-gray-100 p-8 dark:bg-gray-900">
      {Array.from({ length: 20 }, (_, i) => (
        <section key={i} className="mx-auto max-w-3xl space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            <FormattedMessage
              id={`modal.scrollable.page.section.heading.${i}`}
              defaultMessage={`Section {sectionNumber}`}
              values={{ sectionNumber: i + 1 }}
            />
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <FormattedMessage
              id={`modal.scrollable.page.section.${i}`}
              defaultMessage={`This is content from section ${
                i + 1
              }, simulating a scrollable page.`}
            />
          </p>
        </section>
      ))}
      <div className="fixed right-8 bottom-8 z-10">
        <Modal {...args}>
          <Modal.Trigger>
            <Button
              label="Open Modal"
              className="bg-blue-700 text-zinc-100"
              color="blue"
            />
          </Modal.Trigger>
          <Modal.Header>
            <FormattedMessage
              id="modal.scrollable.page"
              defaultMessage="Modal on Scrollable Page"
            />
          </Modal.Header>
          <Modal.Body>
            <p className="text-gray-800 dark:text-gray-100">
              <FormattedMessage
                id="modal.scrollable.content"
                defaultMessage="This modal is displayed on a scrollable page."
              />
            </p>
          </Modal.Body>
          <Modal.Footer
            primaryBtnConfig={{
              label: "Confirm",
              onClick: () => alert("Confirmed"),
            }}
            secondaryBtnConfig={{
              label: "Cancel",
              onClick: () => alert("Cancelled"),
            }}
          />
        </Modal>
      </div>
    </div>
  ),
};

export const SecondaryAction: Story = {
  render: (args) => (
    <Modal {...args}>
      <Modal.Trigger>
        <Button
          label="Open Modal"
          className="bg-blue-700 text-zinc-100"
          color="blue"
        />
      </Modal.Trigger>
      <Modal.Header>
        <FormattedMessage
          id="modal.primary.secondary"
          defaultMessage="Primary & Secondary"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="text-gray-800 dark:text-gray-100">
          <FormattedMessage
            id="modal.primary.secondary.description"
            defaultMessage="This modal has both primary and secondary actions."
          />
        </p>
      </Modal.Body>
      <Modal.Footer
        primaryBtnConfig={{
          label: "Save",
          onClick: () => alert("Saved"),
        }}
        secondaryBtnConfig={{
          label: "Dismiss",
          onClick: () => alert("Dismissed"),
        }}
      />
    </Modal>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Modal {...args}>
      <Modal.Trigger>
        <Button
          label="Open Form Modal"
          className="bg-blue-700 text-zinc-100"
          color="blue"
        />
      </Modal.Trigger>
      <Modal.Header>
        <FormattedMessage id="modal.form.title" defaultMessage="Form Modal" />
      </Modal.Header>
      <Modal.Body>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <FormattedMessage
                id="modal.form.nameLabel"
                defaultMessage="Name"
              />
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-2 rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="dropdown"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <FormattedMessage
                id="modal.form.dropdownLabel"
                defaultMessage="Select Option"
              />
            </label>
            <select
              id="dropdown"
              name="dropdown"
              className="mt-2 rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="option1">
                <FormattedMessage
                  id="modal.form.option1"
                  defaultMessage="Option 1"
                />
              </option>
              <option value="option2">
                <FormattedMessage
                  id="modal.form.option2"
                  defaultMessage="Option 2"
                />
              </option>
              <option value="option3">
                <FormattedMessage
                  id="modal.form.option3"
                  defaultMessage="Option 3"
                />
              </option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer
        primaryBtnConfig={{
          label: "Submit",
          onClick: () => alert("Form Submitted"),
        }}
        secondaryBtnConfig={{
          label: "Cancel",
          onClick: () => alert("Form Cancelled"),
        }}
      />
    </Modal>
  ),
};

export const InitialLoadingState: Story = {
  args: {
    initialLoading: true,
  },
  render: (args) => (
    <Modal {...args}>
      <Modal.Trigger>
        <Button
          label="Open Loading Modal"
          className="bg-blue-700 text-zinc-100"
          color="blue"
        />
      </Modal.Trigger>
      <Modal.Header>
        <FormattedMessage
          id="modal.loading.initial"
          defaultMessage="Loading Content..."
        />
      </Modal.Header>
      <Modal.Body>
        <p className="text-gray-800 dark:text-gray-100">
          <FormattedMessage
            id="modal.loading.content"
            defaultMessage="This content will be hidden while loading initially. The footer buttons are hidden with opacity 0% but maintain their height to prevent layout shift."
          />
        </p>
      </Modal.Body>
      <Modal.Footer
        primaryBtnConfig={{
          label: "Save Changes",
          onClick: () => alert("Primary clicked"),
        }}
        secondaryBtnConfig={{
          label: "Cancel",
          onClick: () => alert("Secondary clicked"),
        }}
      />
    </Modal>
  ),
};

export const AfterCTAClickedState: Story = {
  render: (args) => {
    const [showContent, setShowContent] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handlePrimaryClick = () => {
      setIsLoading(true);
      setShowContent(true);
    };

    return (
      <Modal {...args}>
        <Modal.Trigger>
          <Button
            label="Open Modal"
            className="bg-blue-700 text-zinc-100"
            color="blue"
          />
        </Modal.Trigger>
        <Modal.Header>
          <FormattedMessage
            id="modal.cta.clicked"
            defaultMessage="Confirm Action"
          />
        </Modal.Header>
        <Modal.Body loading={isLoading}>
          {showContent ? (
            <div className="space-y-3">
              <p className="text-gray-800 dark:text-gray-100">
                <FormattedMessage
                  id="modal.cta.content.loaded"
                  defaultMessage="Action completed successfully! The primary button was disabled after clicking to prevent duplicate actions."
                />
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <FormattedMessage
                  id="modal.cta.content.note"
                  defaultMessage="Notice how the 'Save Changes' button remains disabled while the 'Cancel' button stays enabled."
                />
              </p>
            </div>
          ) : (
            <p className="text-gray-800 dark:text-gray-100">
              <FormattedMessage
                id="modal.cta.content.initial"
                defaultMessage="Click 'Save Changes' to see the button disable behavior. The clicked button will be disabled while other buttons remain enabled."
              />
            </p>
          )}
        </Modal.Body>
        <Modal.Footer
          primaryBtnConfig={{
            label: "Save Changes",
            onClick: handlePrimaryClick,
          }}
          secondaryBtnConfig={{
            label: "Cancel",
            onClick: () =>
              alert("Cancel clicked - this button remains enabled"),
          }}
        />
      </Modal>
    );
  },
};
