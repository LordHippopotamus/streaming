import Navigation from "../Navigation";

export default function PlayerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      {children}
    </div>
  );
}
