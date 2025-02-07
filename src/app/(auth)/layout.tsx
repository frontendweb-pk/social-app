import Footer from "@/components/layout/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-indigo-950">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-80 min-w-80">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
