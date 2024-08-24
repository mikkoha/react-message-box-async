import { createRoot } from "react-dom/client";
import App from "./App";
import { MessageBoxContextProvider } from "react-message-box-async";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <MessageBoxContextProvider>
      <App />
    </MessageBoxContextProvider>
  );
} else {
  console.error("Failed to find the root element");
}
