"use client";

import { useRef, useState, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { baseUrl } from "@constants";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { telemetry } from "@utils/telemetry";
export interface Feedback {
  sentiment?: "positive" | "negative";
  url: string;
  text?: string;
}

const collectFeedback = async (feedback: Feedback) => {
  await telemetry.track({
    name: "Submitted Feedback",
    properties: {
      componentType: "feedback",
      componentId: feedback.url,
      interactionType: "click",
      interactionData: `sentiment: ${feedback.sentiment} | text: ${feedback.text}`,
      ...feedback,
    },
    userInitiated: true,
  });
  return fetch(`${baseUrl}/api/feedback`, {
    method: "POST",
    body: JSON.stringify(feedback),
  });
};

export default function Feedback() {
  const [feedbackSentiment, setFeedbackSentiment] = useState<
    Feedback["sentiment"] | null
  >(null);

  const [feedbackText, setFeedbackText] = useState<
    Feedback["text"] | undefined
  >(undefined);

  const [feedbackFormState, setFeedbackFormState] = useState<
    "initial" | "unsent" | "sending" | "sent" | "error"
  >("initial");

  const nodeRef = useRef(null);

  // Reset back to initial state on page transitions
  const pathname = usePathname();
  useEffect(() => {
    setFeedbackFormState("initial");
    setFeedbackText(undefined);
    setFeedbackSentiment(null);
  }, [pathname]);

  return (
    <div className="mt-16 flex h-40 max-w-none flex-col gap-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="block h-0 flex-grow border-t dark:border-gray-700"></span>
        <span className="font-sora text-base text-slate-500 dark:text-slate-50">
          Did you find this page helpful?
        </span>
        <span className="block h-0 flex-grow border-t dark:border-gray-700"></span>
      </div>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={feedbackFormState}
          nodeRef={nodeRef}
          addEndListener={(done: any) => {
            // @ts-ignore
            nodeRef.current.addEventListener("transitionend", done, false);
          }}
          classNames="fade"
        >
          <div className="w-full" ref={nodeRef}>
            {feedbackFormState === "initial" && (
              <div className="flex justify-center gap-4">
                <div
                  data-testid="thumbs-up"
                  className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-green-200 transition-all ease-in-out hover:-rotate-12 hover:bg-green-300 dark:bg-emerald-600 dark:hover:bg-emerald-400"
                  onClick={() => {
                    setFeedbackSentiment("positive");
                    setFeedbackFormState("unsent");
                    collectFeedback({
                      sentiment: "positive",
                      url: document.URL,
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 stroke-green-700 dark:stroke-green-500 dark:group-hover:stroke-green-100"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </div>
                <div
                  className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-red-100 transition-all ease-in-out hover:-rotate-12 hover:bg-red-200 dark:bg-red-600 dark:hover:bg-red-300"
                  onClick={() => {
                    setFeedbackSentiment("negative");
                    setFeedbackFormState("unsent");
                    collectFeedback({
                      sentiment: "negative",
                      url: document.URL,
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 stroke-red-500 dark:stroke-red-300 dark:group-hover:stroke-red-100"
                  >
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                  </svg>
                </div>
              </div>
            )}

            {feedbackFormState === "unsent" && feedbackSentiment !== null && (
              <div className="flex w-full flex-col gap-4 self-center md:flex-row">
                <textarea
                  className="flex-grow resize-none rounded-md border p-4 leading-none ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:ring-white/20"
                  placeholder={
                    feedbackSentiment === "positive" ||
                    feedbackSentiment === null
                      ? "What did you like about this page?"
                      : "What did you dislike about this page?"
                  }
                  rows={1}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  value={feedbackText}
                  data-testid="feedback-textarea"
                ></textarea>
                <button
                  onClick={async () => {
                    setFeedbackFormState("sending");

                    const feedbackResponse = await collectFeedback({
                      sentiment: feedbackSentiment,
                      text: feedbackText,
                      url: document.URL,
                    });

                    feedbackResponse.status === 200
                      ? setFeedbackFormState("sent")
                      : setFeedbackFormState("error");
                  }}
                  className="self-center rounded-md bg-xenon-600 px-8 py-3 text-white no-underline transition-colors hover:bg-xenon-700 hover:text-white dark:bg-white dark:text-[#151723] max-md:w-full"
                >
                  Send Feedback
                </button>
              </div>
            )}

            {feedbackFormState === "sending" && (
              <p className="text-md mt-0 text-center text-slate-500">
                Sending...
              </p>
            )}

            {feedbackFormState === "sent" && (
              <div>
                <h3 className="mt-0 text-center text-2xl font-bold text-slate-500 dark:text-slate-50">
                  Feedback sent!
                </h3>
                <p className="text-md text-center text-slate-500 dark:text-slate-50">
                  Thanks! Your feedback helps to improve Algolia&apos;s docs.
                </p>
              </div>
            )}

            {feedbackFormState === "error" && (
              <div className="flex w-full flex-col">
                <h3 className="mt-0 text-center text-2xl font-bold text-red-500">
                  Oops! Something went wrong.
                </h3>
                <p className="text-md text-center text-red-500">
                  There was an error. Please try again!
                </p>
                <button
                  onClick={async () => {
                    setFeedbackFormState("sending");

                    const feedbackResponse = await collectFeedback({
                      text: feedbackText,
                      url: document.URL,
                    });

                    feedbackResponse.status === 200
                      ? setFeedbackFormState("sent")
                      : setFeedbackFormState("error");
                  }}
                  className="self-center rounded-md bg-xenon-600 px-8 py-3 text-white no-underline transition-colors hover:bg-xenon-700 hover:text-white dark:bg-white dark:text-[#151723] max-md:w-full"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
