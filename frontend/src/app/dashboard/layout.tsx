import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar />
      <main className="flex-1 overflow-auto bg-gray-100 w-full px-4 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
