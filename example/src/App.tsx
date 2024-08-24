import React, { useState } from "react";
import { useMessageBox } from "react-message-box-async";

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
    padding: "0.5rem 0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    borderRadius: "0.375rem",
    border: "0px",
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Message box example</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <button style={buttonStyle} onClick={handleClickDefault}>
          Show default message box
        </button>
        <button style={buttonStyle} onClick={handleClickCustom}>
          Show customized message box
        </button>
      </div>
      <p>Accepted: {acceptedCount}</p>
      <p>Rejected: {rejectedCount}</p>
    </div>
  );
};

export default App;
