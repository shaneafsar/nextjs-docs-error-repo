"use client";

import { baseUrl } from "@constants";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useAuth } from "@hooks/useAuth";

export interface Feedback {
  userId: string | number;
  url: string;
  text?: string;
}

const collectNegativeFeedback = async (feedback: Feedback, pathname: string) =>
  fetch(`${baseUrl}/api/feedback`, {
    method: "POST",
    body: JSON.stringify({
      ...feedback,
      sentiment: "negative",
      text: `Missing page ${pathname}${
        feedback.text ? `: ${feedback.text}` : ""
      }`,
    }),
  });

export default function Feedback() {
  const [feedbackText, setFeedbackText] = useState<
    Feedback["text"] | undefined
  >(undefined);

  const [feedbackFormState, setFeedbackFormState] = useState<
    "initial" | "unsent" | "sending" | "sent" | "error"
  >("initial");

  const nodeRef = useRef(null);

  const { user } = useAuth();

  const userId = user?.user_id ?? "";

  // Reset back to initial state on page transitions
  const pathname = usePathname();
  useEffect(() => {
    setFeedbackFormState("initial");
    setFeedbackText(undefined);
  }, [pathname]);

  return (
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
        <div className="mt-5 w-full" ref={nodeRef}>
          {feedbackFormState === "initial" && (
            <button
              onClick={() => setFeedbackFormState("unsent")}
              className="self-center rounded-md bg-gray-100 px-8 py-3 text-gray-800 no-underline transition-colors hover:bg-xenon-600 hover:text-white dark:bg-white dark:text-[#151723] max-md:w-full"
            >
              Report missing page
            </button>
          )}
          {feedbackFormState === "unsent" && (
            <div className="flex w-full flex-col gap-4 self-center md:flex-row">
              <textarea
                className="flex-grow resize-none rounded-md border p-4 leading-none ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:ring-white/20"
                placeholder="Which page were you looking for?"
                rows={1}
                onChange={(e) => setFeedbackText(e.target.value)}
                value={feedbackText}
                data-testid="feedback-textarea"
              />
              <button
                onClick={async () => {
                  setFeedbackFormState("sending");

                  const feedbackResponse = await collectNegativeFeedback(
                    {
                      userId,
                      text: feedbackText,
                      url: document.URL,
                    },
                    pathname
                  );
                  setFeedbackFormState(
                    feedbackResponse.status === 200 ? "sent" : "error"
                  );
                }}
                className="self-center rounded-md bg-xenon-600 px-8 py-3 text-white no-underline transition-colors hover:bg-xenon-700 hover:text-white dark:bg-white dark:text-[#151723] max-md:w-full"
              >
                Send Report
              </button>
            </div>
          )}

          {feedbackFormState === "sending" && (
            <p className="text-md mt-0 text-slate-500">Sending...</p>
          )}

          {feedbackFormState === "sent" && (
            <div>
              <h3 className="mt-0 text-2xl font-bold text-slate-500 dark:text-slate-50">
                Report sent!
              </h3>
              <p className="text-md text-slate-500 dark:text-slate-50">
                Thanks for reporting the missing page! Your feedback helps to
                improve Algolia&apos;s docs.
              </p>
            </div>
          )}

          {feedbackFormState === "error" && (
            <div className="flex w-full flex-col">
              <h3 className="mt-0 text-2xl font-bold text-red-500">
                Oops! Something went wrong.
              </h3>
              <p className="text-md text-red-500">
                There was an error. Please try again!
              </p>
              <button
                onClick={async () => {
                  setFeedbackFormState("sending");

                  const feedbackResponse = await collectNegativeFeedback(
                    {
                      userId,
                      text: feedbackText,
                      url: document.URL,
                    },
                    pathname
                  );

                  setFeedbackFormState(
                    feedbackResponse.status === 200 ? "sent" : "error"
                  );
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
  );
}
