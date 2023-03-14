import Header from "@/components/Header";
import "@/styles/globals.css";

export const metadata = {
  icons: "/favicon.ico",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
