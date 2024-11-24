import { Montserrat, Spectral, Roboto_Flex } from "next/font/google";

export const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monserrat",
});

export const spectral = Spectral({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-spectral",
});

export const robotoflex = Roboto_Flex({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
});
