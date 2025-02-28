import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Prueba Tecnica Megapagos",
  description: "Esta pagina es una prueba tecnica para la empresa Megapagos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div><Toaster /></div>
        {children}
      </body>
    </html>
  );
}
