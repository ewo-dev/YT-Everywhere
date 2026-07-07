declare namespace browser {
  namespace commands {
    const onCommand: {
      addListener(callback: (command: string) => void): void;
    };
  }

  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      active: boolean;
    }

    function query(queryInfo: {
      active?: boolean;
      currentWindow?: boolean;
    }): Promise<Tab[]>;

    function sendMessage(tabId: number, message: unknown): Promise<unknown>;
  }

  namespace scripting {
    interface ScriptInjection {
      target: { tabId: number };
      files: string[];
    }

    interface CSSInjection {
      target: { tabId: number };
      files: string[];
    }

    function executeScript(injection: ScriptInjection): Promise<unknown>;
    function insertCSS(injection: CSSInjection): Promise<unknown>;
  }

  namespace runtime {
    const onMessage: {
      addListener(
        callback: (
          message: unknown,
          sender: unknown,
          sendResponse: (response?: unknown) => void,
        ) => void,
      ): void;
    };
  }
}
