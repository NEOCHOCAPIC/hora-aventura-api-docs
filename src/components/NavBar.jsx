function NavBar() {
  return (
    <nav className="w-full bg-gray-800 flex items-center justify-between px-8 py-3 shadow-md">
      <div className="flex items-center gap-3">
        <a href="/">
        <img
          src="/src/assets/logo.png"
          alt="Adventure Time Logo"
          className="h-14 w-auto drop-shadow-lg"
        /></a>
      </div>
      <div className="flex gap-2 md:gap-6">
                <a href="#" className="px-4 py-2 rounded hover:bg-[#393a5a] transition text-white font-medium">Home</a>
        <a href="#docs" className="px-4 py-2 rounded hover:bg-[#393a5a] transition text-white font-medium">Docs</a>

      </div>
    </nav>
  );
}

export default NavBar;