import { useStore } from "@nanostores/react";

import {
  Application,
  applications as applicationsStore,
  selectedApplication as selectedApplicationStore,
} from "@store/application";

export function useApplication() {
  const applications = useStore(applicationsStore);
  const selectedApplication = useStore(selectedApplicationStore);

  const setSelectedApplication = (application?: Application) => {
    selectedApplicationStore.set(application);
  };

  return { selectedApplication, applications, setSelectedApplication };
}
