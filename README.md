# react-message-box-async

A simple message box component for React, implementing a .NET-like MessageBox pattern with async/await support.

## Features

- Implements a .NET-like message box pattern using async/await in React
- Separates the modal rendering logic from where it's used in your code
- No need to manage modal state (open/closed) where the message box is called
- Supports both simple string messages and complex customized modals
- Customizable appearance with different modal widths and button variants
- TypeScript support
- Zero dependencies (except React)

## Installation

```bash
npm install react-message-box-async
```

or

```bash
yarn add react-message-box-async
```

## Setup

Wrap your app with the `MessageBoxContextProvider`:

```jsx
import { createRoot } from "react-dom/client";
import App from "./App";
import { MessageBoxContextProvider } from "react-message-box-async";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <MessageBoxContextProvider>
    <App />
  </MessageBoxContextProvider>
);
```

You can also just wrap the part of your app that needs the message box.

## Usage

Here are examples of how to use the message box, from simplest to more complex:

### Simple usage

```jsx
import React from "react";
import { useMessageBox } from "react-message-box-async";

const SimpleExample = () => {
  const messageBox = useMessageBox();

  const handleClick = async () => {
    const result = await messageBox.show("Operation completed successfully.");
    console.log(result); // "accept" when OK is clicked
  };

  return <button onClick={handleClick}>Show simple message</button>;
};
```

### Usage with customizations

```jsx
import React from "react";
import { useMessageBox } from "react-message-box-async";

const AdvancedExample = () => {
  const messageBox = useMessageBox();

  const handleClick = async () => {
    const result = await messageBox.show({
      title: "Confirm action",
      msg: (
        <>
          <p>Are you sure you want to proceed?</p>
          <p>This action cannot be undone.</p>
        </>
      ),
      acceptButton: { content: "Yes, I'm sure", variant: "danger" },
      cancelButton: { content: "Cancel", variant: "secondary" },
      modalWidth: "md",
    });

    if (result === "accept") {
      console.log("User confirmed the action");
    } else {
      console.log("User cancelled the action");
    }
  };

  return <button onClick={handleClick}>Show advanced message</button>;
};
```

### Advanced usage, customization, theming

The code for this package is simple and adaptable. For advanced use cases:

- Copy relevant parts of the code to your project instead of using the npm package. You likely need at least the contents of the `src/messageBox.tsx` file. Components `Modal.tsx` and `Button.tsx` can be copied as well, but there is nothing special about them.
- Customize the modal appearance, integrate with your application's theming system or use your own modal component, etc.

## API

### `useMessageBox()`

A hook that returns an object with a `show` method.

### `show(options)`

Shows a message box and returns a Promise that resolves to either `"accept"` or `"cancel"`.

#### Options

- `title` (optional): ReactNode - The title of the message box
- `msg`: ReactNode | string - The main content of the message box
- `acceptButton` (optional): Object
  - `content`: ReactNode - The content of the accept button
  - `variant`: "primary" | "secondary" | "danger" (default: "primary")
- `cancelButton` (optional): Object
  - `content`: ReactNode - The content of the cancel button
  - `variant`: "primary" | "secondary" | "danger" (default: "secondary")
- `modalWidth`: "sm" | "md" | "lg" (default: "sm")
- `modalCloseOnOutsideClick`: boolean (default: true)
- `modalDataTest`: string (optional) - For testing purposes

You can also pass a string directly to `show()` for a simple message box with default styling.

## Development

Pre-requisites:

- Node.js 18 or later
- npm 10 or later

To set up the project for development:

1. Clone the repository:

```bash
clone https://github.com/mikkoha/react-message-box-async.git
cd react-message-box-async
```

2. Install dependencies:

```bash
npm install
npm install --prefix example
```

3. Run the development server:

```bash
npm run start
```

This will start the development server for the library and the example app concurrently. Open [http://localhost:1234](http://localhost:1234) to view the example app in the browser.

### Testing the packed library locally

The example app is set up to use the dev version of the library from `dist`-folder as specified in the `package.json` of the component.
To test the built and packed library more closely to how it is really used in the example app before publishing:

1. Build and pack the library:

```bash
npm run build
npm pack
```

2. Edit the example app's `package.json`:

   - Remove the current react-message-box-async (`"file:../"`) package
   - Remove aliases for `react` and `react-dom`
   - Remove `--watch-dir ../` from the start script

Remove the `node_modules` folder and the `package-lock.json` file from the example app.

3. Move the tarball to the example app:

```bash
mv react-message-box-async-x.x.x.tgz example
```

4. Install the local package in the example app:

```bash
cd example
npm install react-message-box-async-x.x.x.tgz
```

5. Run the example app:

```bash
npm start
```

## License

MIT
