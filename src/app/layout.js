import "./globals.css";
import "./original.css";

export const metadata = {
  title: "Enabled : Community Support Platform",
  description: "Indonesia-based community support platform for special needs children's parents and bereaved parents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
