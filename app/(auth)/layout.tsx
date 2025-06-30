export const metadata = {
  title: 'Nexoria',
  description: 'Powered By Gemini Developed by Sumanth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
