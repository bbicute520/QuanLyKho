export default function TopNavBar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 z-30 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex gap-6">
          <a href="#" className="text-slate-600 hover:text-blue-700 text-sm font-medium transition-colors">Analytics</a>
          <a href="#" className="text-slate-600 hover:text-blue-700 text-sm font-medium transition-colors">Reports</a>
          <a href="#" className="text-slate-600 hover:text-blue-700 text-sm font-medium transition-colors">Logs</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-surface-container-high rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-surface-container-high rounded-full transition-colors">
          <span className="material-symbols-outlined">help_center</span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-2 cursor-pointer active:opacity-70 transition-opacity">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900">Chi nhánh Quận 1</p>
            <p className="text-[10px] text-primary font-medium">Kho chính</p>
          </div>
          <span className="material-symbols-outlined text-slate-400">expand_more</span>
        </div>
      </div>
    </header>
  );
}