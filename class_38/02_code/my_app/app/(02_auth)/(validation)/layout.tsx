export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          <div className="border p-2">Header only for signin & signup</div>
          {children}
          <div className="border p-2">Footer only for signin & signup</div>
        </body>
      </html>
    );
  }