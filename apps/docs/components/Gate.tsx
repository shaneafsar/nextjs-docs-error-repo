"use client";
import { useAuth } from "@hooks/useAuth";
import { GateTypes } from "@ts/gate";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type: GateTypes;
  redirectTo?: string;
};

const Gate = ({ children, type, redirectTo }: Props) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  let showContent = false;
  switch (type) {
    case "signedIn":
      if (isLoggedIn) showContent = true;
      break;
    case "signedOut":
      if (!isLoggedIn) showContent = true;
      break;
    default:
      break;
  }

  if (redirectTo && !showContent) {
    const pageToRedirectTo = redirectTo !== "" ? redirectTo : "/";
    router.push(pageToRedirectTo);
  }

  return <>{showContent && children}</>;
};

export default Gate;
