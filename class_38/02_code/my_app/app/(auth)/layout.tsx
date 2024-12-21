export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          <div className="border p-2">Header</div>
          {children}
          <div className="border p-2">Footer</div>
        </body>
      </html>
    );
  }