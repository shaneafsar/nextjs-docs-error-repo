"use client";

import Coquille, { CoquilleHandle } from "@algolia/coquille";
import { useStore } from "@nanostores/react";
import {
  commandToRun,
  isTerminalFullscreen,
  isTerminalHidden,
} from "@store/terminalStatus";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import ReactDraggable from "react-draggable";
import commands, { runOnStart } from "./commands";
import AlgoliaLogo from "./components/AlgoliaLogo";

interface AlgoliaTerminalProps {
  handleOnMount: () => void;
}

const AlgoliaTerminal = ({ handleOnMount }: AlgoliaTerminalProps) => {
  const coquilleRef = useRef<CoquilleHandle>(null);

  const hiddenTerminal = useStore(isTerminalHidden);
  const isFullscreen = useStore(isTerminalFullscreen);
  const command = useStore(commandToRun);

  useEffect(() => {
    handleOnMount();
  }, [handleOnMount]);

  useEffect(() => {
    if (command === null) {
      return;
    }

    coquilleRef.current?.runCommand(command);
    setTimeout(() => {
      commandToRun.set(null);
    }, 300);
  }, [command]);

  const hideTerminal = () => {
    isTerminalHidden.set(true);
  };

  const toggleFullscreen = () => {
    isTerminalFullscreen.set(!isFullscreen);
  };

  const Draggable: any = ReactDraggable;

  return (
    <Draggable
      handle="#terminal-handler"
      disabled={isFullscreen}
      position={isFullscreen ? { x: 0, y: 0 } : undefined}
      bounds="html"
    >
      <div
        className={clsx(
          "hidden max-h-fit md:fixed md:md:z-50 md:block md:shadow-glow md:transition-opacity",
          {
            ["md:left-0 md:top-0 md:w-full"]: isFullscreen,
            ["md:bottom-8 md:right-2 md:top-24 md:w-[800px]"]: !isFullscreen,
            ["md:invisible md:opacity-0"]: hiddenTerminal,
          }
        )}
      >
        <div
          id="terminal-handler"
          className={clsx(
            "md:relative md:flex md:h-8 md:w-full md:items-center md:rounded-t-md md:bg-xenon-1200 md:px-2",
            { ["md:cursor-grab"]: !isFullscreen }
          )}
        >
          <button
            className="md:mr-2 md:h-3 md:w-3 md:rounded-full md:bg-red-500"
            onClick={hideTerminal}
          />
          <button
            className="md:h-3 md:w-3 md:rounded-full md:bg-green-500"
            onClick={toggleFullscreen}
          />
          <span className="-translate-x-1/2 -translate-y-1/2 md:absolute md:left-1/2 md:top-1/2 md:text-gray-400">
            Web CLI
          </span>
        </div>
        <Coquille
          ref={coquilleRef}
          className={clsx(
            "md:w-full md:rounded-b-lg md:bg-xenon-1200 md:p-4",
            "md:font-mono md:text-sm md:text-white",
            {
              ["md:h-[500px]"]: !isFullscreen,
              // Remove 2rem: size of the top bar
              ["md:h-[calc(100vh-2rem)]"]: isFullscreen,
            }
          )}
          promptPrefix={
            <span className="mr-2 md:flex md:font-bold md:text-blue-100">
              <AlgoliaLogo className="md:mr-2 md:fill-blue-100" width={12} />
              {">"}
            </span>
          }
          commands={commands}
          runOnStart={runOnStart}
        />
      </div>
    </Draggable>
  );
};

export default AlgoliaTerminal;
