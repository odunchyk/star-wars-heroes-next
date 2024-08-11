import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col px-8 items-center gap-[16px] bg-[url('/sky-dark-night-blue.jpg')] text-[#fff]">
        {children}
      </body>
    </html>
  );
}
