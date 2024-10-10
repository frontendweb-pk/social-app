export default function Footer() {
  return (
    <footer className="center py-3 px-4 mt-5">
      <div className="w-[1200px] mx-auto">
        <p>&copy; {new Date().getFullYear()}, All rights reserved.</p>
      </div>
    </footer>
  );
}
