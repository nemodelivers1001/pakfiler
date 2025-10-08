interface HeaderProps {
  currentPage: 'signin' | 'signup';
  onNavigate: (page: 'signin' | 'signup') => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-700 text-white font-bold text-2xl px-3 py-1 rounded italic">
            PF
          </div>
          <div>
            <div className="font-bold text-gray-900 text-lg">PakFiler.com</div>
            <div className="text-xs text-gray-600">Fast, Affordable & Best Tax Filing</div>
          </div>
        </div>
        <div className="hidden md:block text-sm text-green-600 font-medium max-w-2xl">
          Backed by a highly experienced team of top Chartered Accountants, CFAs, FCCAs, Advocates, and Tax Experts.
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('signin')}
            className={`px-6 py-2 font-medium transition-colors ${
              currentPage === 'signin'
                ? 'text-gray-900'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => onNavigate('signup')}
            className={`px-6 py-2 font-medium rounded-lg transition-colors shadow-sm ${
              currentPage === 'signup'
                ? 'bg-green-600 text-white'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
