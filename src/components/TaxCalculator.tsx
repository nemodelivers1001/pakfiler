import { useState } from 'react';
import { Calculator, ArrowLeft, TrendingUp, TrendingDown, Sparkles, Receipt, ShieldCheck, Info, ChevronRight, DollarSign, Wallet } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import { MotionSelect } from './ui/MotionSelect';

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
  const isMobile = useMobile();

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
      setResult(null);
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#effaf3]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pak-green-100/20 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>

      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-all text-gray-600 font-black text-xs uppercase tracking-[1px] hover:text-pak-green-700"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </button>
        </div>

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-pak-green-500 to-pak-green-brand rounded-[32px] p-8 lg:p-12 mb-10 overflow-hidden shadow-[0_20px_50px_-20px_rgba(25,135,84,0.4)] ring-1 ring-white/20 group"
          >
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <span className="px-4 py-1 bg-pak-green-900/50 text-emerald-400 text-[10px] font-black rounded-full border border-pak-green-400/30 backdrop-blur-sm uppercase tracking-[2px]">Income utilities</span>
                  <div className="flex items-center gap-2 px-4 py-1 bg-white/10 text-white text-[10px] font-black rounded-full border border-white/10 backdrop-blur-sm uppercase tracking-[1px]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> FBR Slabs 2025
                  </div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tighter leading-tight uppercase">
                  Salary Tax <span className="bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent italic">Calculator</span>
                </h1>
                <p className="text-emerald-100/70 text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">Get precise tax estimates based on the latest Pakistan Federal Board of Revenue salary slabs.</p>
              </div>
              <div className="relative group">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white/10 backdrop-blur-2xl rounded-[40px] flex items-center justify-center border border-white/20 shadow-2xl relative z-10 transition-transform duration-500 group-hover:rotate-6">
                  <Calculator className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                </div>
                <div className="absolute -inset-4 bg-emerald-400/20 blur-3xl rounded-full"></div>
              </div>
            </div>
          </motion.div>
        )}

        {isMobile && (
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-pak-green-950 uppercase tracking-tighter leading-none mb-2">Tax Calculator</h1>
            <p className="text-gray-500 font-bold text-sm">Calculate your monthly take-home income</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Input Panel */}
          <div className="xl:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 sm:p-10 rounded-[32px] sm:rounded-[48px] border-white/60 shadow-xl shadow-pak-green-900/5 relative"
            >
              {/* Background Decor - Kept but might bleed slightly without overflow-hidden */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pak-green-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              <div className="relative z-20 space-y-8">
                <MotionSelect
                  label="Select Tax Year"
                  options={taxYears}
                  value={taxYear}
                  onChange={setTaxYear}
                />

                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[3px] mb-4 ml-1">Monthly Gross Salary (PKR)</label>
                  <div className="relative group">
                    <Wallet className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-pak-green-600 transition-colors" />
                    <input
                      type="number"
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(e.target.value)}
                      onKeyUp={(e) => e.key === 'Enter' && handleCalculate()}
                      placeholder="e.g. 150,000"
                      className="w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent rounded-2xl focus:border-pak-green-200 focus:bg-white transition-all text-xl font-black text-pak-green-950 outline-none shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!monthlySalary || parseFloat(monthlySalary) <= 0}
                  className="w-full group bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[4px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                >
                  Calculate Now
                  <Sparkles className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </motion.div>

            <div className="glass-card p-8 rounded-[32px] border-white/60">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-pak-green-50 rounded-xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-pak-green-600" />
                </div>
                <h3 className="text-lg font-black text-pak-green-950 uppercase tracking-tight">Pro Tip</h3>
              </div>
              <p className="text-gray-500 font-bold text-sm leading-relaxed">
                Salaried individuals earn tax credits on charitable donations to NPOs and investments in mutual funds. Our filing service helps you claim these for maximum savings.
              </p>
            </div>
          </div>

          {/* Results Panel */}
          <div className="xl:col-span-7">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="glass-card p-8 rounded-[32px] border-white/60 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-pak-green-50 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Effective Tax Rate</p>
                      <div className="flex items-end gap-2">
                        <p className="text-5xl font-black text-pak-green-950">{result.effectiveTaxRate.toFixed(1)}%</p>
                        <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
                      </div>
                      <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(result.effectiveTaxRate * 2.5, 100)}%` }}
                          className="h-full bg-gradient-to-r from-pak-green-500 to-pak-green-800"
                        />
                      </div>
                    </div>

                    <div className="glass-card p-8 rounded-[32px] border-white/60 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Annual Savings</p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-black text-blue-900 leading-none">PKR {formatCurrency(result.yearlyIncomeAfterTax)}</p>
                      </div>
                      <p className="mt-4 text-[10px] font-black text-blue-400 uppercase tracking-[2px]">Net Income After Tax</p>
                    </div>
                  </div>

                  <div className="glass-card rounded-[40px] border-white/60 overflow-hidden shadow-xl">
                    <div className="bg-gradient-to-r from-pak-green-500 to-pak-green-brand p-8 text-white flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-tight">Detailed Breakdown</h4>
                        <p className="text-emerald-400/70 text-[11px] font-black uppercase tracking-[2px] mt-1">Slabs: Fiscal Year {result.taxYear}</p>
                      </div>
                      <Receipt className="w-8 h-8 text-emerald-400/50" />
                    </div>

                    <div className="p-8 sm:p-10 space-y-10">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center group">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Gross</p>
                            <p className="text-xl font-black text-gray-900 uppercase">Gross Salary</p>
                          </div>
                          <p className="text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform tabular-nums"><span className="text-xs font-bold text-gray-400 mr-2">PKR</span>{formatCurrency(result.monthlySalary)}</p>
                        </div>

                        <div className="flex justify-between items-center group">
                          <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-orange-400 rounded-full"></div>
                            <div>
                              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Taxation</p>
                              <p className="text-xl font-black text-gray-900 uppercase">Monthly Tax</p>
                            </div>
                          </div>
                          <p className="text-2xl font-black text-orange-600 group-hover:scale-110 transition-transform tabular-nums"><span className="text-xs font-bold text-orange-400 mr-2">PKR</span>{formatCurrency(result.monthlyTaxDeduction)}</p>
                        </div>

                        <div className="pt-8 border-t-2 border-dashed border-gray-100 flex justify-between items-center group">
                          <div>
                            <p className="text-[10px] font-black text-pak-green-600 uppercase tracking-widest mb-1">Net Income</p>
                            <p className="text-2xl font-black text-pak-green-950 uppercase tracking-tighter">Take-Home</p>
                          </div>
                          <p className="text-4xl font-black text-pak-green-700 transition-all tabular-nums"><span className="text-xs font-bold text-pak-green-400 mr-2">PKR</span>{formatCurrency(result.monthlyTakeHome)}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
                            <TrendingDown className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Yearly Overview</p>
                            <p className="text-sm font-bold text-gray-600">Total annual tax of <span className="text-orange-600 font-black">PKR {formatCurrency(result.yearlyTaxPayable)}</span> will be deducted on your gross income of <span className="text-pak-green-950 font-black">PKR {formatCurrency(result.yearlyIncome)}</span>.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center py-24 glass-card rounded-[48px] border-white/60 border-dashed border-2 text-center"
                >
                  <div className="w-24 h-24 bg-pak-green-50 rounded-full flex items-center justify-center mb-8 relative">
                    <Calculator className="w-10 h-10 text-pak-green-200" />
                    <div className="absolute inset-0 border-2 border-pak-green-100 rounded-full animate-ping"></div>
                  </div>
                  <h4 className="text-2xl font-black text-gray-300 uppercase tracking-tighter">Ready to calculate</h4>
                  <p className="text-gray-400 font-bold text-sm mt-2 max-w-xs">Enter your salary details and select a tax year to see your breakdown.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
