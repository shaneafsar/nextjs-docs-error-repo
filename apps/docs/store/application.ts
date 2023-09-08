import { atom } from "nanostores";

export type Application = {
  application_id: string;
  name?: string;
  search_api_key: string;
};

export const applications = atom<Application[]>([]);
export const selectedApplication = atom<Application | undefined>(undefined);
