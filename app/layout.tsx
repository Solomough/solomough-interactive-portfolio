import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solomough — Interactive Portfolio",
  description: "A desk-space portfolio by Solomon Moughkaa Zahemen: software engineering, digital systems, community building and visual storytelling.",
  metadataBase: new URL("https://solomough-system.vercel.app")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
