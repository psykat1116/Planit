import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Planit | Collaborative Task Management Tool",
    template: `%s | Planit | Collaborative Task Management Tool`,
  },
  description:
    "Planit is an intuitive and feature-rich task management application designed to help teams organize, prioritize, and collaborate on projects efficiently. Inspired by Trello, this clone offers a seamless user experience with functionalities that allow users to create boards, lists, and cards to represent their projects and tasks. Each card can be enriched with descriptions, due dates, labels, and comments, fostering effective communication and project tracking within teams.",
  openGraph: {
    title: "Planit | Collaborative Task Management Tool",
    images: [
      {
        url: "https://github.com/psykat1116/Planit/blob/master/public/OpenGraph.png?raw=true",
        width: 1280,
        height: 640,
        alt: "Planit | Collaborative Task Management Tool",
      },
    ],
    description:
      "Planit is an intuitive and feature-rich task management application designed to help teams organize, prioritize, and collaborate on projects efficiently. Inspired by Trello, this clone offers a seamless user experience with functionalities that allow users to create boards, lists, and cards to represent their projects and tasks. Each card can be enriched with descriptions, due dates, labels, and comments, fostering effective communication and project tracking within teams.",
    type: "website",
    url: "https://planit-liart.vercel.app/",
    siteName: "Planit",
    locale: "en_IN",
  },
  authors: {
    name: "Saikat Samanta",
    url: "https://portfolio-one-gilt-34.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
