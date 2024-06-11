import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Planit - Collaborative Task Management Tool",
  description:
    "Planit is an intuitive and feature-rich task management application designed to help teams organize, prioritize, and collaborate on projects efficiently. Inspired by Trello, this clone offers a seamless user experience with functionalities that allow users to create boards, lists, and cards to represent their projects and tasks. Each card can be enriched with descriptions, due dates, labels, and comments, fostering effective communication and project tracking within teams.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        href: "/LogoLight.svg",
        url: "/LogoLight.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        href: "/LogoDark.svg",
        url: "/LogoLight.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
