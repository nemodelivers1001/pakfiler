import { useState } from 'react';
import { Calculator, ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface TaxCalculatorProps {
  onBack: () => void;
}

interface TaxResult {
  monthlySalary: number;
  yearlyIncome: number;
  monthlyTaxDeduction: number;
  yearlyTaxPayable: number;
  monthlyTakeHome: number;
  yearlyIncomeAfterTax: number;
  effectiveTaxRate: number;
  taxYear: string;
}

export default function TaxCalculator({ onBack }: TaxCalculatorProps) {
  const [monthlySalary, setMonthlySalary] = useState('');
  const [taxYear, setTaxYear] = useState('2024-2025');
  const [result, setResult] = useState<TaxResult | null>(null);

  const taxYears = [
    '2019-2020',
    '2020-2021',
    '2021-2022',
    '2022-2023',
    '2023-2024',
    '2024-2025',
  ];

  const calculateTax = (yearlyIncome: number, year: string): number => {
    const taxSlabs: { [key: string]: Array<{ limit: number; rate: number }> } = {
      '2024-2025': [
        { limit: 600000, rate: 0 },
        { limit: 1200000, rate: 0.025 },
        { limit: 2400000, rate: 0.125 },
        { limit: 3600000, rate: 0.225 },
        { limit: 6000000, rate: 0.275 },
        { limit: Infinity, rate: 0.35 },
      ],
      '2023-2024': [
        { limit: 600000, rate: 0 },
        { limit: 1200000, rate: 0.025 },
        { limit: 2400000, rate: 0.125 },
        { limit: 3600000, rate: 0.225 },
        { limit: 6000000, rate: 0.275 },
        { limit: Infinity, rate: 0.35 },
      ],
      '2022-2023': [
        { limit: 600000, rate: 0 },
        { limit: 1200000, rate: 0.025 },
        { limit: 2400000, rate: 0.125 },
        { limit: 3600000, rate: 0.20 },
        { limit: 6000000, rate: 0.25 },
        { limit: Infinity, rate: 0.35 },
      ],
      '2021-2022': [
        { limit: 600000, rate: 0 },
        { limit: 1200000, rate: 0.025 },
        { limit: 1800000, rate: 0.125 },
        { limit: 2500000, rate: 0.20 },
        { limit: 4000000, rate: 0.25 },
        { limit: 8000000, rate: 0.30 },
        { limit: Infinity, rate: 0.35 },
      ],
      '2020-2021': [
        { limit: 600000, rate: 0 },
        { limit: 1200000, rate: 0.05 },
        { limit: 1800000, rate: 0.10 },
        { limit: 2500000, rate: 0.15 },
        { limit: 4000000, rate: 0.20 },
        { limit: 8000000, rate: 0.25 },
        { limit: Infinity, rate: 0.30 },
      ],
      '2019-2020': [
        { limit: 400000, rate: 0 },
        { limit: 800000, rate: 0.05 },
        { limit: 1200000, rate: 0.10 },
        { limit: 2400000, rate: 0.15 },
        { limit: 4800000, rate: 0.20 },
        { limit: Infinity, rate: 0.25 },
      ],
    };

    const slabs = taxSlabs[year] || taxSlabs['2024-2025'];
    let tax = 0;
    let previousLimit = 0;

    for (const slab of slabs) {
      if (yearlyIncome > previousLimit) {
        const taxableAmount = Math.min(yearlyIncome, slab.limit) - previousLimit;
        tax += taxableAmount * slab.rate;
        previousLimit = slab.limit;
      } else {
        break;
      }
    }

    return Math.round(tax);
  };

  const handleCalculate = () => {
    const monthly = parseFloat(monthlySalary);
    if (isNaN(monthly) || monthly <= 0) {
      return;
    }

    const yearly = monthly * 12;
    const yearlyTax = calculateTax(yearly, taxYear);
    const monthlyTax = Math.round(yearlyTax / 12);
    const effectiveRate = (yearlyTax / yearly) * 100;

    setResult({
      monthlySalary: monthly,
      yearlyIncome: yearly,
      monthlyTaxDeduction: monthlyTax,
      yearlyTaxPayable: yearlyTax,
      monthlyTakeHome: monthly - monthlyTax,
      yearlyIncomeAfterTax: yearly - yearlyTax,
      effectiveTaxRate: effectiveRate,
      taxYear,
    });
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PF</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">PakFiler.com</h1>
                <p className="text-xs text-gray-500">Fast, Affordable & Best Tax Filing</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8 max-w-2xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600">Salary Tax Calculator</h2>
              <p className="text-sm text-gray-600 mt-1">
                Calculate your income tax based on Pakistan's tax slabs for different fiscal years
              </p>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <div>
              <label htmlFor="monthlySalary" className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Salary (PKR)
              </label>
              <input
                type="number"
                id="monthlySalary"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                placeholder="Enter your monthly salary"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-lg"
              />
            </div>

            <div>
              <label htmlFor="taxYear" className="block text-sm font-semibold text-gray-700 mb-2">
                Tax Year
              </label>
              <select
                id="taxYear"
                value={taxYear}
                onChange={(e) => setTaxYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-lg bg-white cursor-pointer"
              >
                {taxYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!monthlySalary || parseFloat(monthlySalary) <= 0}
              className="w-full bg-green-500 text-white font-semibold py-3 sm:py-4 rounded-xl hover:bg-green-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              Calculate Tax
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Tax Calculation Results for {result.taxYear}</h3>
              <p className="text-green-100 text-sm sm:text-base">
                Based on Pakistan Federal Board of Revenue tax slabs
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <h4 className="text-xl sm:text-2xl font-bold text-green-600 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Monthly Breakdown
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Gross Salary</span>
                    <span className="text-xl font-bold text-gray-900">Rs {formatCurrency(result.monthlySalary)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Tax Deduction</span>
                    <span className="text-xl font-bold text-orange-600">
                      Rs {formatCurrency(result.monthlyTaxDeduction)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-700 font-semibold">Take-Home Salary</span>
                    <span className="text-2xl font-bold text-green-600">
                      Rs {formatCurrency(result.monthlyTakeHome)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <h4 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <TrendingDown className="w-6 h-6 mr-2" />
                  Yearly Breakdown
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Gross Income</span>
                    <span className="text-xl font-bold text-gray-900">Rs {formatCurrency(result.yearlyIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Tax Payable</span>
                    <span className="text-xl font-bold text-orange-600">
                      Rs {formatCurrency(result.yearlyTaxPayable)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-700 font-semibold">Income After Tax</span>
                    <span className="text-2xl font-bold text-blue-600">
                      Rs {formatCurrency(result.yearlyIncomeAfterTax)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Tax Metrics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Effective Tax Rate</p>
                  <p className="text-4xl sm:text-5xl font-bold text-green-600">{result.effectiveTaxRate.toFixed(2)}%</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Monthly Tax Burden</p>
                  <p className="text-4xl sm:text-5xl font-bold text-blue-600">{result.effectiveTaxRate.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6 sm:p-8">
              <div className="flex items-start space-x-3">
                <div className="text-3xl">💡</div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Important Notes:</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>This calculation is based on standard tax slabs for salaried individuals in Pakistan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Additional allowances, deductions, or tax credits may affect your actual tax liability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>For accurate tax filing and personalized advice, please consult with our tax experts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
