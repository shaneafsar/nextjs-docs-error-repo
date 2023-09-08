/**
 * The logic in this file is based on the logic the Dashboard uses: https://github.com/algolia/satellite/blob/master/packages/satellite/src/Avatars/utils.ts
 */

import { remove as removeDiacritics } from "diacritics";

import type { Application } from "@store/application";
import type { User } from "@store/auth";

const APPLICATION_COLORS = [
  // Light variants
  "bg-gray-200 text-grey-800",
  "bg-nebula-200 text-nebula-800",
  "bg-blue-200 text-blue-900",
  "bg-green-200 text-green-900",
  "bg-pink-200 text-pink-800",
  "bg-red-200 text-red-800",
  "bg-orange-200 text-orange-900",
  // Dark variants
  "bg-gray-300 text-gray-900",
  "bg-nebula-300 text-nebula-900",
  "bg-blue-300 text-blue-900",
  "bg-green-300 text-green-900",
  "bg-pink-300 text-pink-900",
  "bg-red-300 text-red-900",
  "bg-orange-300 text-orange-900",
];

const hashValue = (value: string) => {
  let hash = 0;

  if (value.length === 0) {
    return hash;
  }

  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
};

export const getApplicationColors = (application?: Application) => {
  if (!application) {
    return APPLICATION_COLORS[0];
  }

  return (
    APPLICATION_COLORS[
      Math.abs(hashValue(application.application_id)) %
        APPLICATION_COLORS.length
    ] ?? APPLICATION_COLORS[0]
  );
};

const getApplicationIdInitials = (applicationId: string) => {
  return applicationId.slice(0, 2);
};

export const getApplicationInitials = (application?: Application) => {
  if (!application) {
    return "";
  }

  if (!application.name) {
    return getApplicationIdInitials(application.application_id);
  }

  const words = removeDiacritics(application.name.trim())
    .toLocaleUpperCase()
    .split(/\W+/)
    .filter((word) => word.length >= 1);

  if (words.length === 0 || (words.length === 1 && words[0].length < 2)) {
    return getApplicationIdInitials(application.application_id);
  } else if (words.length === 1) {
    return words[0].slice(0, 2);
  }

  return `${words[0][0]}${words[1][0]}`;
};

const USER_COLORS_CLASSNAMES = [
  "bg-gray-400 text-gray-900",
  "bg-nebula-400 text-gray-900",
  "bg-blue-400 text-gray-900",
  "bg-green-400 text-gray-900",
  "bg-pink-400 text-grey-900",
  "bg-red-400 text-gray-900",
  "bg-orange-400 text-gray-900",
  // Darker variants
  "bg-gray-700 text-white",
  "bg-nebula-700 text-white",
  "bg-blue-700 text-gray-900",
  "bg-green-700 text-gray-900",
  "bg-pink-700 text-white",
  "bg-red-700 text-white",
  "bg-orange-600 text-gray-900",
];

export const getUserBackgroundClassName = (email: string) =>
  USER_COLORS_CLASSNAMES[
    Math.abs(hashValue(email)) % USER_COLORS_CLASSNAMES.length
  ] ?? USER_COLORS_CLASSNAMES[0];

export const getUserInitials = (user: User): string => {
  const words = user.user_name
    ? user.user_name.trim().split(/\s+/)
    : user.user_email?.match(/^(.+)(?:\+.+?)?@.+$/)?.[1].split(".");

  return words
    ? words
        .slice(0, 2)
        .map((w) => w.toLocaleLowerCase()[0])
        .join("")
    : "??";
};
