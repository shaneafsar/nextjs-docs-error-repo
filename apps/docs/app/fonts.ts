import { Sora } from "next/font/google";

export const sora = Sora({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});
