"use client";

import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { type User, auth, authenticityToken } from "@store/auth";
import { type Application, applications } from "@store/application";
import { getSelectedApplication } from "@utils/application-utils";
import { useApplication } from "./useApplication";
import { baseUrl } from "../constants";

type AuthState = "initial" | "fetching" | "fetched";

type AuthData = {
  user: User | null;
  authenticityToken: string;
  applications: Application[];
};

export function useAuth() {
  const user = useStore(auth);
  const { setSelectedApplication } = useApplication();
  const [authState, setAuthState] = useState<AuthState>("initial");

  useEffect(() => {
    const fetchAuthState = async () => {
      if (["fetching", "fetched"].includes(authState)) return;

      setAuthState("fetching");

      const res = await fetch(`${baseUrl}/api/auth`, {
        credentials: "include",
      });
      const data = (await res.json()) as AuthData;

      auth.set(data.user);
      authenticityToken.set(data.authenticityToken);
      applications.set(data.applications);

      const defaultSelectedApplication = getSelectedApplication(
        data.applications,
        data.user
      );

      setSelectedApplication(defaultSelectedApplication);

      setAuthState("fetched");
    };

    fetchAuthState();
  }, [user, authState, setSelectedApplication]);

  return {
    user,
    isLoading: authState === "fetching",
    isLoggedIn: Boolean(user?.user_email),
    authState,
  };
}
