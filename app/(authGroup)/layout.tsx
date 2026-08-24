import Navbar from "@/components/shared/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div>
        <Navbar></Navbar>
        {children}
        </div>
        </body>
    </html>
  );
}