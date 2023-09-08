import { baseUrl } from "../constants";
import { auth } from "@store/auth";
import Cookies from "js-cookie";

export interface TelemetryTrackEvent {
  name: string;
  userId?: number;
  anonymousId?: string;
  context: {
    device?: {
      id: string;
    };
    page: {
      path: string;
      referrer: string;
      search: string;
      title: string;
      url: string;
    };
    userAgent: string;
  };
  properties: {
    componentId?: string;
    componentType: string;
    interactionType: string;
    interactionData?: string;
  };
}

type TelemetryTrackEventProperties = Pick<
  TelemetryTrackEvent,
  "name" | "properties"
>;

interface TelemetryTrackMethodParams extends TelemetryTrackEventProperties {
  /** ONLY use for events initiated by the user, like in the Feedback component.
   * This way even if the user rejects cookies, the event will be collected.  */
  userInitiated?: boolean;
}

interface UserContext {
  userId: number;
  context: Pick<TelemetryTrackEvent["context"], "page" | "userAgent">;
}

interface AnonymousContext {
  anonymousId: string;
  context: Required<TelemetryTrackEvent["context"]>;
}

const getUserAndContextFields = ({
  userId,
}): UserContext | AnonymousContext => {
  const commonContext = {
    page: {
      path: new URL(document.URL).pathname,
      referrer: document.referrer,
      search: new URL(document.URL).search,
      title: document.title,
      url: document.URL,
    },
    userAgent: window.navigator.userAgent,
  };

  if (typeof userId === "number") {
    return {
      userId: userId,
      context: {
        ...commonContext,
      },
    };
  } else {
    return {
      anonymousId: userId,
      context: {
        device: { id: userId },
        ...commonContext,
      },
    };
  }
};

const acceptsFunctionalCookies = (): boolean => {
  if (window.OnetrustActiveGroups) {
    return window.OnetrustActiveGroups.includes("C0003") ? true : false;
  }
  return false;
};

const coalescedUserId = (): number | string => {
  const userId = auth.get()?.user_id;
  const anonymousId = Cookies.get("anonymous_id");

  if (userId) return userId;
  if (anonymousId) return anonymousId;
  return "ANON";
};

export const telemetry = {
  track: async (payload: TelemetryTrackMethodParams) => {
    const { userInitiated, ...event } = payload;
    const userId = coalescedUserId();

    if (acceptsFunctionalCookies() || userInitiated) {
      const eventData: TelemetryTrackEvent = {
        ...getUserAndContextFields({
          userId,
        }),
        ...event,
      };
      if ("sendBeacon" in navigator) {
        // noop
      } else {
        // noop
      }
    }
  },
  page: () => {},
};
