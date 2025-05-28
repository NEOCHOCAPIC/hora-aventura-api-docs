function Footer() {
  return (
    <footer className="w-full bg-[#232946] text-blue-100 py-4 mt-12 text-center border-t border-blue-900">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <span>
          © {new Date().getFullYear()} Hora de Aventura API
        </span>
        <span className="hidden md:inline">|</span>
        <a
          href="https://github.com/NEOCHOCAPIC"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline ml-0 md:ml-2"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
