"use client";

import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { Loader, Terminal } from "react-feather";

import {
  commandToRun,
  isTerminalHidden,
  isTerminalOpen,
} from "@store/terminalStatus";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { telemetry } from "@utils/telemetry";

const AlgoliaTerminal = dynamic(() => import("@components/Terminal"));

export const TerminalButton = () => {
  const [isTerminalLoaded, setIsTerminalLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const renderTerminal = useStore(isTerminalOpen);
  const command = useStore(commandToRun);

  useEffect(() => {
    if (command === null) {
      return;
    }

    isTerminalOpen.set(true);
    isTerminalHidden.set(false);
  }, [command]);

  const handleButtonClick = () => {
    if (!isTerminalLoaded) {
      setIsLoading(true);
    }

    if (!renderTerminal) {
      isTerminalOpen.set(true);
      return;
    }

    isTerminalHidden.set(false);

    telemetry.track({
      name: "Component Interaction",
      properties: {
        componentType: "web_cli",
        interactionType: "click",
        interactionData: "open",
      },
    });
  };

  return (
    <>
      {renderTerminal
        ? createPortal(
            <AlgoliaTerminal
              handleOnMount={() => {
                setIsTerminalLoaded(true);
                setIsLoading(false);
              }}
            />,
            document.body
          )
        : null}
      <button
        className="header-cta-secondary mr-2 inline-flex items-center justify-center border-0 border-xenon-200 bg-transparent py-3 pl-8 pr-6 font-sora text-sm font-medium uppercase tracking-[1px] text-xenon-600 hover:border-xenon-600 dark:text-xenon-100 dark:hover:bg-xenon-100 dark:hover:text-gray-900"
        onClick={handleButtonClick}
      >
        Web CLI
        {isLoading ? (
          <Loader className="ml-2 h-[14px] w-[14px] dark:text-current lg:h-[18px] lg:w-[18px]" />
        ) : (
          <Terminal className="ml-2 h-[14px] w-[14px] text-gray-800 dark:text-current lg:h-[18px] lg:w-[18px]" />
        )}
      </button>
    </>
  );
};

export default TerminalButton;
