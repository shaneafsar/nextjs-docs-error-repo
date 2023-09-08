"use client";

import { useAuth } from "@hooks/useAuth";
import { SIGN_IN_URL } from "../constants";
import { useApplication } from "@hooks/useApplication";
import AppSwitcher from "./AppSwitcher/AppSwitcher";
import UserAvatar from "./UserAvatar/UserAvatar";

export default function Auth() {
  const { user, isLoggedIn } = useAuth();
  const { selectedApplication } = useApplication();

  return isLoggedIn ? (
    <div
      className="flex h-[60px] items-center space-x-8 rounded-md bg-gray-100 p-3 dark:bg-gray-900"
      data-testid="auth-state"
    >
      {selectedApplication && (
        <AppSwitcher selectedApplication={selectedApplication} />
      )}

      <UserAvatar user={user!} />
    </div>
  ) : (
    <a
      data-testid="login-link"
      className="inline-flex justify-center gap-0.5 overflow-hidden rounded-full bg-xenon-600 px-3 py-1 text-sm text-white transition hover:bg-xenon-700 dark:bg-xenon-400/10 dark:text-xenon-400 dark:ring-1 dark:ring-inset dark:ring-xenon-400/20 dark:hover:bg-xenon-400/10 dark:hover:text-xenon-300 dark:hover:ring-xenon-300"
      href={SIGN_IN_URL}
    >
      Login
    </a>
  );
}
