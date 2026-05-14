import React from "react";
import CodeBlock from "./CodeBlock";

const GITHUB_URL = "https://github.com/mikkoha/react-message-box-async";
const BLOG_URL = "https://mikkohaapanen.com/tech-blog/react-message-box-async/";

const asyncCode = `function App() {
  const messageBox = useMessageBox();

  const decisionMsg = {
    title: 'Intergalactic Decision Portal',
    msg: 'The fate of the universe rests in your hands!',
    acceptButton: { content: 'Engage!', variant: 'danger' },
    cancelButton: { content: 'Abort mission' },
  };

  const confirmMsg = {
    title: 'Are you sure?',
    msg: 'Are you really sure you want to engage?',
    acceptButton: { content: "Yes, I'm sure" },
    cancelButton: { content: 'I want my mommy!' },
  };

  async function handleClick() {
    if (await messageBox.show(decisionMsg) === 'accept') {
      if (await messageBox.show(confirmMsg) === 'accept') {
        await messageBox.show('Mission accomplished!');
        return;
      }
    }

    await messageBox.show("I knew you'd chicken out.");
  }

  return <button onClick={handleClick}>Engage</button>;
}`;

const traditionalCode = `function App() {
  const [isDecisionOpen, setIsDecisionOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isFallbackOpen, setIsFallbackOpen] = useState(false);

  function handleClick() { setIsDecisionOpen(true); }

  function handleDecisionAccept() {
    setIsDecisionOpen(false);
    setIsConfirmOpen(true);
  }
  function handleDecisionCancel() {
    setIsDecisionOpen(false);
    setIsFallbackOpen(true);
  }
  function handleConfirmAccept() {
    setIsConfirmOpen(false);
    setIsSuccessOpen(true);
  }
  function handleConfirmCancel() {
    setIsConfirmOpen(false);
    setIsFallbackOpen(true);
  }
  function handleClose() {
    setIsSuccessOpen(false);
    setIsFallbackOpen(false);
  }

  return (
    <>
      <button onClick={handleClick}>Engage</button>

      {isDecisionOpen && (
        <Modal title="Intergalactic Decision Portal"
          msg="The fate of the universe rests in your hands!"
          acceptLabel="Engage!" acceptVariant="danger"
          cancelLabel="Abort mission"
          onAccept={handleDecisionAccept}
          onCancel={handleDecisionCancel} />
      )}
      {isConfirmOpen && (
        <Modal title="Are you sure?"
          msg="Are you really sure you want to engage?"
          acceptLabel="Yes, I'm sure"
          cancelLabel="I want my mommy!"
          onAccept={handleConfirmAccept}
          onCancel={handleConfirmCancel} />
      )}
      {isSuccessOpen && (
        <Modal msg="Mission accomplished!"
          onAccept={handleClose} />
      )}
      {isFallbackOpen && (
        <Modal msg="I knew you'd chicken out."
          onAccept={handleClose} />
      )}
    </>
  );
}`;

const linkStyle: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "underline",
};

const panelLabelStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#6b7280",
  marginBottom: "0.5rem",
};

const prose: React.CSSProperties = { maxWidth: "860px" };

const codeStyle: React.CSSProperties = {
  background: "#e5e7eb",
  padding: "0.1em 0.35em",
  borderRadius: "3px",
};

const ContentSection: React.FC = () => {
  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={prose}>
        <h2 style={{ marginBottom: "0.5rem" }}>How it works</h2>
        <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Wrap your app once with{" "}
          <code style={codeStyle}>MessageBoxContextProvider</code>, then call{" "}
          <code style={codeStyle}>useMessageBox()</code> anywhere in the tree.
          Each <code style={codeStyle}>messageBox.show()</code> call returns a
          promise that resolves when the user dismisses the dialog. Complex
          flows with user prompts become plain, readable imperative code instead
          of messy open/closed-state management with conditional rendering. See
          the{" "}
          <a
            href={GITHUB_URL}
            style={linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repo
          </a>{" "}
          for full API docs, or read the{" "}
          <a
            href={BLOG_URL}
            style={linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            blog post
          </a>{" "}
          for background and motivation.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2.5rem",
        }}
      >
        <div style={{ flex: "1", minWidth: "380px" }}>
          <p style={panelLabelStyle}>react-message-box-async</p>
          <CodeBlock code={asyncCode} />
        </div>
        <div style={{ flex: "1", minWidth: "380px" }}>
          <p style={panelLabelStyle}>Traditional modal pattern</p>
          <CodeBlock code={traditionalCode} />
        </div>
      </div>

      <div style={prose}>
        <h2 style={{ marginBottom: "0.75rem" }}>When this library shines</h2>
        <ul
          style={{
            lineHeight: 1.8,
            paddingLeft: "1.4rem",
            marginBottom: "2rem",
          }}
        >
          <li>
            <strong>Multi-step or branching flows</strong> — chained{" "}
            <code style={codeStyle}>await</code> calls replace multiple state
            flags and split handler functions.
          </li>
          <li>
            <strong>Complex conditional logic</strong> — checking trial status,
            monthly quota, subscription state, or other conditions before
            proceeding, even when the logic includes showing warning messages,
            is reader-friendly code with all the logic in one place, rather than
            being scattered across multiple handlers and state variables.
          </li>
          <li>
            <strong>Many different dialogs on one page</strong> — no
            proliferation of <code style={codeStyle}>isXModalOpen</code>{" "}
            booleans, each with its own open/close handlers.
          </li>
          <li>
            <strong>.NET-like MessageBox pattern</strong> - familiar to
            developers coming from .NET background
          </li>
        </ul>

        <h2 style={{ marginBottom: "0.75rem" }}>
          When the traditional pattern may be better
        </h2>
        <ul
          style={{
            lineHeight: 1.8,
            paddingLeft: "1.4rem",
            marginBottom: "2rem",
          }}
        >
          <li>
            <strong>Modal open state belongs in the URL or app state</strong> —
            e.g. a deep-linkable dialog (
            <code style={codeStyle}>?modal=invite</code>) that should survive a
            page refresh or be shareable.
          </li>
          <li>
            <strong>Complex modal with its own sub-state</strong> — a
            multi-field form with validation inside a modal; the modal component
            manages its own lifecycle independently of the parent.
          </li>
          <li>
            <strong>Simple modal setup</strong> — when you need a basic modal
            with familiar react patterns.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContentSection;
