import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

export type MessageBoxButton = {
  content: ReactNode;
  variant?: "secondary" | "primary" | "danger";
};

export type Message = {
  title?: ReactNode;
  msg: ReactNode;
  acceptButton?: MessageBoxButton;
  cancelButton?: MessageBoxButton;
  modalDataTest?: string;
  modalWidth?: "sm" | "md" | "lg";
  modalCloseOnOutsideClick?: boolean;
};

export type MessageBoxResult = "accept" | "cancel";

type MessageMeta = {
  id: string;
  isOpen: boolean;
  resolve: (result: MessageBoxResult) => void;
};

// Define overloads
type ShowMessageFunc = {
  (msg: string): Promise<MessageBoxResult>;
  (msg: Message): Promise<MessageBoxResult>;
};

const MessageBoxContext = createContext<ShowMessageFunc>(() => {
  throw new Error(
    "No MessageBoxContextProvider. Make sure to wrap your app with <MessageBoxContextProvider>."
  );
});

export function useMessageBox(): { show: ShowMessageFunc } {
  const show = useContext(MessageBoxContext);
  return { show };
}

type MessageBoxProps = {
  message: Message & MessageMeta;
  onClose: (result: MessageBoxResult) => void;
};

const MessageBox: React.FC<MessageBoxProps> = ({ message, onClose }) => {
  return (
    <Modal
      isOpen={message.isOpen}
      onClose={() => onClose("cancel")}
      dataTest={message.modalDataTest}
      modalWidth={message.modalWidth}
      closeOnOutsideClick={message.modalCloseOnOutsideClick}
    >
      {message.title && <Modal.Title>{message.title}</Modal.Title>}
      <Modal.TextBody>{message.msg}</Modal.TextBody>
      <Modal.Footer>
        {message.cancelButton && (
          <Button
            variant={message.cancelButton.variant || "secondary"}
            onClick={() => onClose("cancel")}
          >
            {message.cancelButton.content}
          </Button>
        )}
        <Button
          variant={message.acceptButton?.variant || "primary"}
          onClick={() => onClose("accept")}
        >
          {message.acceptButton?.content || "Ok"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

type MessageBoxContextProviderProps = {
  children: ReactNode;
};

export const MessageBoxContextProvider: React.FC<
  MessageBoxContextProviderProps
> = ({ children }) => {
  const [msgs, setMsgs] = useState<(Message & MessageMeta)[]>([]);

  const show: ShowMessageFunc = (msg: Message | string) =>
    new Promise<MessageBoxResult>((resolve) => {
      setMsgs((prev) => [
        ...prev,
        typeof msg === "string"
          ? { msg, id: Math.random().toString(), resolve, isOpen: true }
          : {
              ...msg,
              id: Math.random().toString(),
              resolve,
              isOpen: true,
            },
      ]);
    });

  const currentMsg = useMemo(() => msgs[0], [msgs]);

  return (
    <MessageBoxContext.Provider value={show}>
      {children}
      {currentMsg && (
        <MessageBox
          message={currentMsg}
          onClose={(result) => {
            setMsgs((prev) =>
              prev.map((msg) =>
                msg.id === currentMsg.id ? { ...msg, isOpen: false } : msg
              )
            );
            currentMsg.resolve(result);
            // Wait for the closing animation to finish before removing the MessageBox.
            setTimeout(() => {
              setMsgs((prev) => prev.filter((msg) => msg.id !== currentMsg.id));
            }, 200);
          }}
        />
      )}
    </MessageBoxContext.Provider>
  );
};
