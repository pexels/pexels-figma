import React from 'react';
import { TUIMessage } from '../utils/post-ui-message';

type TListener = (message: TUIMessage) => void;
class MessageStack {
  public static listeners: TListener[] = [];
  public static stack: TUIMessage[] = [];

  public static push(message: TUIMessage) {
    MessageStack.stack.push(message);
    MessageStack.listeners.forEach(l => l(message));
  }

  public static on(listener: TListener) {
    MessageStack.listeners.push(listener);
    return () => {
      MessageStack.listeners = MessageStack.listeners.filter(l => l !== listener);
    }
  }
}

window.addEventListener('message', (event) => {
  const data = event.data as {
    pluginId: string;
    pluginMessage: TUIMessage;
  };
  MessageStack.push(data.pluginMessage);
});

export function useUiMessage<T extends TUIMessage>(type: T['type'], includeHistory = true) {
  const [message, setMessage] = React.useState<T | null>(
    includeHistory
      ? (() => {
        const filtered = MessageStack.stack.filter(m => m.type === type) as T[];
        if (filtered.length > 0) {
          return filtered[filtered.length - 1];
        }
        return null;
      })()
      : null
  );

  React.useEffect(() => {
    const onMessage = (msg: TUIMessage) => {
      if (msg.type === type) {
        setMessage(msg as T);
      }
    }

    const unlisten = MessageStack.on(onMessage);
    return () => unlisten();
  }, [type, includeHistory]);

  return message;
}
