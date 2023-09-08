"use client";

import { useEffect, useState } from "react";
import cx from "clsx";

import Image from "next/image";
import type { User } from "@store/auth";
import {
  getUserBackgroundClassName,
  getUserInitials,
} from "@utils/avatar-utils";

type Props = {
  user: User;
};

export default function UserAvatar({ user }: Props) {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const userInitials = getUserInitials(user);

  useEffect(() => setAvatarLoaded(false), [user.avatar]);

  return (
    <div
      role="img"
      aria-label={
        avatarLoaded ? user?.user_name || "User's avatar" : "User's avatar"
      }
      className={cx(
        "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full uppercase",
        avatarLoaded && "bg-white",
        !avatarLoaded &&
          getUserBackgroundClassName(user.user_email ?? "no-email")
      )}
    >
      {!avatarLoaded && <span>{userInitials}</span>}
      <Image
        className={cx(
          "absolute left-0 top-0 w-full opacity-0",
          avatarLoaded && "opacity-100"
        )}
        src={user.avatar}
        role="presentation"
        alt=""
        onLoad={() => setAvatarLoaded(true)}
        onError={() => setAvatarLoaded(false)}
        data-chromatic="ignore"
      />
    </div>
  );
}
