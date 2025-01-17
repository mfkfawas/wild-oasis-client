import Header from "@/app/_components/Header";

import "@/app/_styles/global.css";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The wild oasis", v1
  title: {
    template: "%s | The Wild Oasis", // %s will be replaced if there is title metadata in the current user navigated page - else - default
    default: "Welcome / The Wild Oasis",
  },
  // Good of SEO - also if you want to override from other pages just add in that page's metadata.
  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountain and dark forests.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
