import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import "@/app/_styles/global.css";

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
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
        </header>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
