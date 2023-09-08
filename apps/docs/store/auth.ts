import { atom } from "nanostores";

export type User = {
  user_id: number | string;
  user_firstname: string;
  user_lastname: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_location: null | unknown;
  user_company: null | string;
  is_verified: boolean;
  application_id: string;
  plan: string;
  write_api_key: string;
  search_api_key: string;
  is_a: boolean;
  premium_support: boolean;
  avatar?: string;
};

export const auth = atom<User | null>(null);
export const authenticityToken = atom<string | null>(null);
