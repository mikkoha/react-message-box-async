import React, { useState } from "react";
import { useMessageBox } from "react-message-box-async";
import GitHubCorner from "./GitHubCorner";
import ContentSection from "./ContentSection";

const App: React.FC = () => {
  const messageBox = useMessageBox();
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  async function handleClickCustom() {
    let result = await messageBox.show({
      title: "Intergalactic Decision Portal",
      msg: (
        <>
          <p>Greetings, earth dweller!</p>
          <p>
            You&apos;ve activated the Intergalactic Decision Portal. Your choice
            here could alter the very fabric of the cosmos... or just change a
            variable in our React state. The fate of the universe (or at least
            this component) rests in your hands!
          </p>
        </>
      ),
      acceptButton: { content: "Engage!", variant: "danger" },
      cancelButton: { content: "Abort mission" },
      modalWidth: "md",
    });
    if (result === "accept") {
      result = await messageBox.show({
        title: "Are you sure?",
        msg: "Are you really sure you want to engage?",
        acceptButton: { content: "Yes, I'm sure" },
        cancelButton: { content: "I want my mommy!" },
        modalWidth: "sm",
      });
      if (result === "accept") {
        await messageBox.show("Mission accomplished! Counter incremented.");
        setAcceptedCount((prev) => prev + 1);
        return;
      }
    }
    await messageBox.show("I knew you'd chicken out.");
    setRejectedCount((prev) => prev + 1);
  }

  async function handleClickDefault() {
    const result = await messageBox.show("Operation finished. Don't ask how.");
    if (result === "accept") {
      setAcceptedCount((prev) => prev + 1);
    } else {
      setRejectedCount((prev) => prev + 1);
    }
  }

  const buttonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    borderRadius: "0.375rem",
    border: "0px",
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <GitHubCorner url="https://github.com/mikkoha/react-message-box-async" />

      <h1>react-message-box-async example</h1>
      <p>Click the buttons.</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <button
          style={{ ...buttonStyle, backgroundColor: "#656a74" }}
          onClick={handleClickDefault}
        >
          Show default message box
        </button>
        <button style={buttonStyle} onClick={handleClickCustom}>
          Show customized message box
        </button>
      </div>
      <p>Accepted: {acceptedCount}</p>
      <p>Rejected: {rejectedCount}</p>

      <ContentSection />
    </div>
  );
};

export default App;
