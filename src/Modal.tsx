/* eslint-disable react/prop-types */
import React, { ReactNode, useState, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalWidth?: "sm" | "md" | "lg";
  closeOnOutsideClick?: boolean;
  dataTest?: string;
};

export const Modal: React.FC<ModalProps> & {
  Title: React.FC<{ children: ReactNode }>;
  TextBody: React.FC<{ children: ReactNode }>;
  Footer: React.FC<{ children: ReactNode }>;
} = ({
  isOpen,
  onClose,
  children,
  modalWidth = "sm",
  closeOnOutsideClick = true,
  dataTest,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  function handleOutsideClick() {
    if (closeOnOutsideClick) {
      onClose();
    }
  }

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(107, 114, 128, 0.75)",
    transition: "opacity 150ms ease",
    opacity: isOpen ? 1 : 0,
  };

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 10,
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  };

  const contentStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: "opacity 150ms ease, transform 150ms ease",
    opacity: isOpen ? 1 : 0,
    transform: isOpen
      ? "translateY(0) scale(1)"
      : "translateY(1rem) scale(0.95)",
    width: "100%",
    maxWidth:
      modalWidth === "sm" ? "20rem" : modalWidth === "md" ? "26rem" : "32rem",
    margin: "15vh 1rem",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-test={dataTest}
    >
      <div
        style={backdropStyle}
        aria-hidden="true"
        onClick={handleOutsideClick}
      />
      <div style={containerStyle} onClick={handleOutsideClick}>
        <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.Title = ({ children }) => (
  <h3
    id="modal-title"
    style={{
      textAlign: "left",
      fontSize: "1.2rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#111827",
      margin: "0.5rem 1rem 0 1rem",
    }}
  >
    {children}
  </h3>
);
Modal.Title.displayName = "Modal.Title";

Modal.TextBody = ({ children }) => (
  <div
    style={{
      fontSize: "1rem",
      color: "#374151",
      textAlign: "left",
      margin: "1rem 1rem",
    }}
  >
    {children}
  </div>
);
Modal.TextBody.displayName = "Modal.TextBody";

Modal.Footer = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "#F9FAFB",
      padding: "0.5rem 1rem",
      gap: "0.5rem",
      justifyContent: "flex-end",
    }}
  >
    {children}
  </div>
);
Modal.Footer.displayName = "Modal.Footer";
