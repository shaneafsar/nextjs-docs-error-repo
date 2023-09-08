import type { Application } from "@store/application";
import type { User } from "@store/auth";

export const getSelectedApplication = (
  applications: Application[],
  user: User | null
) => {
  if (!user) return;

  return (
    applications.find((app) => app.application_id === user.application_id) ??
    applications[0]
  );
};
