# Component Library

## Introduction

Component Library is designed to provide a collection of reusable and customizable UI components for building web applications using React. The components are organized into atoms, molecules, and organisms following the Atomic Design methodology, which helps maintain a clean and scalable codebase.

## Features

- **Atomic Design Structure**: Components are categorized into atoms, molecules, and organisms.
- **Variety of Styles**: Components come with various styles and variants to meet different design requirements.
- **Accessibility**: Built with accessibility in mind to ensure a better user experience for all users.
- **Theming Support**: Easily apply themes to components for a consistent look and feel.

## Component Structure

- **Atoms**: The smallest building blocks of the library (with various variants). Examples include:
  - Buttons
  - Sliders
  - Tags
  - Chips

- **Molecules**: Combinations of atoms that form a functional unit. Examples include:
  - Input
  - Accordian (e.g., combinations of input fields and buttons)
  - Modals

- **Organisms**: More complex components made up of multiple molecules and/or atoms. Examples include:
  - Tables
  - Chat
  - Video Players

## Table of Contents

- [Candidate 2.0 CX](#candidate-20-cx)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Setup Instructions](#setup-instructions)
  - [File and Folder Structure](#file-and-folder-structure)
- [Best Practices and Tips](#best-practices-and-tips)
  - [Import Order for React Components](#import-order-for-react-components)
    - [Benefits of Following This Order:](#benefits-of-following-this-order)
  - [Utility Functions](#utility-functions)
  - [React Imports in Tests](#react-imports-in-tests)
  - [Image Management](#image-management)
  - [SVG Handling](#svg-handling)
  - [Testing Error Scenarios](#testing-error-scenarios)
    - [1. Structure Tests Using the AAA Pattern](#1-structure-tests-using-the-aaa-pattern)
    - [2. Keep Tests Isolated and Independent](#2-keep-tests-isolated-and-independent)
    - [3. Write Descriptive Test Names](#3-write-descriptive-test-names)
    - [4. Test Edge Cases](#4-test-edge-cases)
    - [5. Optimize Test Performance](#5-optimize-test-performance)
    - [6. Utilize User Event Simulation](#6-utilize-user-event-simulation)
    - [7. Regularly Update Tests](#7-regularly-update-tests)
  - [Code Quality](#code-quality)
- [Error Handling Best Practices](#error-handling-best-practices)
  - [Using `catchException`](#using-catchexception)
    - [Error Types](#error-types)
- [Reusable Saga Functions for API Integration](#reusable-saga-functions-for-api-integration)
  - [Reusable Functions](#reusable-functions)
    - [1. `fetchData`](#1-fetchdata)
    - [2. `postData`](#2-postdata)
    - [3. `handleSagaSuccess`](#3-handlesagasuccess)
    - [4. `handleSagaError`](#4-handlesagaerror)
    - [5. `testSagaExecution`](#5-testsagaexecution)

## Setup Instructions

1. **Prerequisites**: Ensure you have the following tools installed:

   - Node.js (version >= 20)
   - Yarn package manager

2. **Clone the Repository**:

   ```bash
   git clone https://github.com/talview/components.git
   ```

   ```bash
   yarn install
   ```

   ```bash
   yarn start
   ```

## File and Folder Structure

```
root/
│
├── app/                     # Main application directory
│   ├── components/          # Reusable components
│   │   ├── atom/           # Collection of reusable atoms components
│   │   │   ├── ComponentName/
│   │   │   │   ├── ComponentName.tsx        # Component TSX file
│   │   │   │   ├── ComponentName.test.tsx    # Component test case
│   │   │   │   └── ComponentName.stories.tsx  # Storybook file
│   │   │   └── ...          # Other components
│   │   └── ...              # Other reusable components
│   │
│   ├── containers/          # Logic, routes, and error boundaries
│   │   └── App/              # Main application component where all routes are defined
│   ├── context/             # Context API if needed
│   ├── utils/               # Reusable utility functions
│   ├── hooks/               # Custom reusable hooks
│   ├── locale/              # Translation files
│   ├── store/               # Centralized Redux store
│   ├── coverage/            # Test coverage reports
│   └── public/              # Public assets (images, etc.)
│
├── docker/                  # Docker configuration files
├── jest.config.js           # Jest configuration file
├── package.json             # Project metadata and dependencies
├── tailwind.config.js       # Tailwind CSS configuration file
├── webpack.config.js        # Webpack configuration file
└── yarn.lock                # Yarn lock file for dependency management
```

# Best Practices and Tips

## Import Order for React Components

- **Standard Import Order**: When importing modules in your React files, follow this standard order to enhance readability and maintainability:
  1. **React and React Hooks**: Always import React first.
     ```javascript
     import React from 'react';
     ```
  2. **Third-Party Libraries**: Include any third-party libraries or packages next.
     ```javascript
     import { useState } from 'react';
     import axios from 'axios';
     ```
  3. **Components**: Import your own components, grouping them by type if necessary.
     ```javascript
     import Header from './Header';
     import Footer from './Footer';
     ```
  4. **Utilities and Helpers**: Import utility functions or helper modules.
     ```javascript
     import { formatDate } from './utils';
     ```
  5. **Context Providers**: Include context providers for state management.
     ```javascript
     import { UserContext } from './context/UserContext';
     ```
  6. **Constants and Types**: Import constants and type definitions last.
     ```javascript
     import { API_URL } from './constants';
     import PropTypes from 'prop-types';
     ```
  7. **Styles and Assets**: Finally, import stylesheets or assets.
     ```javascript
     import './styles.css';
     import logo from './logo.svg';
     ```

### Benefits of Following This Order:

- Improves readability by providing a clear structure to imports.
- Reduces merge conflicts by maintaining a consistent order across files.
- Helps new developers quickly understand dependencies and organization within files.

By adhering to this standard import order, we can ensure a cleaner, more organized codebase that is easier to navigate and maintain.

---

## Utility Functions

- **Util Functions**: We have a collection of utility functions in the `utils` folder. Please review them for reusable code. This promotes consistency and reduces redundancy across the codebase.

## React Imports in Tests

- **Avoid React Imports**: Do not import React in test files unless you are using something like `React.xyz`. This keeps the test files cleaner and focused on the logic being tested.

## Image Management

- **Image Duplication**: Before adding a new image, ensure that it does not already exist in the `public` folder. This avoids unnecessary duplicates and keeps the project organized.
- **Image and `intlMessage` Import Check**: To see how to import images and `intlMessage`, refer to `app/components/base/Logo/index.tsx`.

## SVG Handling

- **SVG Preview**: Use the SVG Preview extension to check SVG images before committing them. This ensures that SVGs render correctly and meet design specifications.

## Testing Error Scenarios

- **Error Scenarios in Tests**: When writing test cases, especially for logic that throws errors (including Saga/Slice), include scenarios that test these error conditions. This enhances the robustness of your tests.

### 1. Structure Tests Using the AAA Pattern

- **Follow the Arrange-Act-Assert (AAA) Pattern**: This pattern helps keep tests organized and easy to read:

  - **Arrange**: Set up the necessary environment for your test. This includes rendering components, setting initial state, or mocking functions.
  - **Act**: Perform the action being tested. This could involve simulating user interactions or calling functions.
  - **Assert**: Verify that the expected outcome occurs. Use assertions to check that the component behaves as intended.

  Example:

  ```javascript
  // Use testHelpers instead of directly importing @testing-library/react
    import { render,screen fireEvent, container, act} from '@utils/testHelpers';

  test('displays error message when submitting invalid form', () => {
    // Arrange
    render(<MyCX />);

    // Act
    fireEvent.click(screen.getByText('Submit'));

    // Assert
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });
  ```

### 2. Keep Tests Isolated and Independent

- Ensure that each test case operates independently, without relying on shared state or side effects from other tests. Use utilities like `cleanup` from React Testing Library to reset the DOM after each test.

### 3. Write Descriptive Test Names

- Use clear and descriptive names for your test cases to convey their purpose. For example, use names like `displays error message when submitting invalid form`.

### 4. Test Edge Cases

- Include tests for edge cases and unexpected inputs to ensure robustness. This helps identify potential issues that may arise in real-world usage.

### 5. Optimize Test Performance

- Keep your tests fast by avoiding unnecessary setup and teardown operations, and by limiting interactions with external services or APIs. Run tests in parallel where possible to speed up the testing process.

### 6. Utilize User Event Simulation

- Use the `userEvent` utility from React Testing Library to simulate user interactions (like clicks and typing) instead of directly calling component methods or props.

### 7. Regularly Update Tests

- As you update component functionality, ensure that corresponding tests are also updated to reflect these changes, maintaining alignment between code and tests.

---

## Code Quality

- **Code Cleanup**: Remove any unnecessary comments from your code before pushing the final version. This helps maintain clarity and professionalism in the codebase.

- **Avoid Magic Numbers**: Do not use magic numbers directly (e.g., 1, 2, 3). Instead, define them with meaningful variable names before using them. This improves code readability and maintainability.

- **Descriptive Naming**: Provide meaningful names for functions, variables, components, containers, contexts, utils, and hooks. Descriptive naming helps others understand the purpose of your code quickly.

---

# Error Handling Best Practices

When handling errors in your application, utilize the provided `catchException` utility functions instead of `throwing new errors directly`. This approach standardizes error handling and improves clarity across your codebase.

## Using `catchException`

### Error Types

- **ValidationError**: For validation-related issues.
- **APIError**: For errors related to API calls.
- **UnknownError**: For unexpected errors.

---

# Reusable Saga Functions for API Integration

This document outlines the reusable functions available for integrating GraphQL APIs using Saga. These functions streamline the process of handling API requests and responses, ensuring consistency and efficiency across the codebase.

## Reusable Functions

### 1. `fetchData`

- **Description**: Queries a GraphQL API by handling the necessary setup for making GET requests and processing responses.
- **Usage**: Use `fetchData` when you need to retrieve data from a GraphQL endpoint.

### 2. `postData`

- **Description**: Designed for mutations in a GraphQL API, managing setup for making POST requests and handling responses.
- **Usage**: Use `postData` when sending data to a GraphQL endpoint for creation or updates.

### 3. `handleSagaSuccess`

- **Description**: Processes success responses from integrated Saga API calls. Can update application state or trigger side effects based on successful responses.
- **Usage**: Call `handleSagaSuccess` in your Saga worker after successfully fetching or posting data.

### 4. `handleSagaError`

- **Description**: Catches errors from integrated Saga API calls. Can log errors, show notifications, or update application state accordingly.
- **Usage**: Use `handleSagaError` within your Saga worker to manage error responses effectively.

### 5. `testSagaExecution`

- **Description**: Used for testing Saga worker functions to ensure that your Saga logic behaves as expected under various scenarios.
- **Usage**: Employ `testSagaExecution` when writing unit tests for your Saga functions to validate their behavior.

---

Leveraging these reusable functions can streamline your API integration process, maintain consistency across your codebase, and improve overall development efficiency.

---

By following these best practices, we can maintain a clean, efficient, and professional codebase that is easy for all team members to navigate and understand.

---
