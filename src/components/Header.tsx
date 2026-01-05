interface HeaderProps {
  currentPage: 'signin' | 'signup' | 'forgot-password' | 'reset-password';
  onNavigate: (page: 'signin' | 'signup' | 'forgot-password' | 'reset-password') => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onNavigate('signin')}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-pak-green-600 to-pak-green-700 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-xl italic">PF</span>
            </div>
          </div>
          <div>
            <div className="font-extrabold text-gray-900 text-xl tracking-tight">PakFiler<span className="text-pak-green-600">.com</span></div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Fast • Affordable • Secure</div>
          </div>
        </div>
        <div className="hidden md:block text-sm text-gray-600 font-semibold max-w-xl text-center leading-relaxed">
          Backed by a highly experienced team of top <span className="text-pak-green-600">Chartered Accountants</span>, CFAs, FCCAs, Advocates, and Tax Experts.
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('signin')}
            className={`px-5 py-2.5 text-sm font-bold transition-all rounded-xl ${currentPage === 'signin'
                ? 'text-pak-green-600 bg-pak-green-50'
                : 'text-gray-600 hover:text-pak-green-600 hover:bg-gray-50'
              }`}
          >
            Login
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-pak-green-200/50 hover:scale-105 active:scale-95 ${currentPage === 'signup'
                ? 'bg-gradient-to-r from-pak-green-600 to-pak-green-700 text-white shadow-pak-green-200'
                : 'bg-pak-green-600 text-white hover:from-pak-green-700 hover:to-pak-green-800'
              }`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
