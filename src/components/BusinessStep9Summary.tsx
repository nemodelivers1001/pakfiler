import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface BusinessStep9SummaryProps {
    onComplete: () => void;
    onBack: () => void;
    data: any;
}

export default function BusinessStep9Summary({ onComplete, onBack, data }: BusinessStep9SummaryProps) {

    const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-sm mb-6">
            <h3 className="text-sm font-black text-pak-green-950 mb-6 uppercase tracking-wider border-b border-gray-100 pb-2">{title}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {children}
            </div>
        </div>
    );

    const Field = ({ label, value }: { label: string, value: any }) => (
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-sm font-black text-pak-green-900 break-words">{value || '-'}</p>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto pb-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-pak-green-950 mb-4 tracking-tight">Review Application</h2>
                <p className="text-gray-500 font-bold text-sm">Please review all details before final submission</p>
            </div>

            <Section title="Basic Details">
                <Field label="Tax Year" value={data.taxYear} />
                <Field label="Filing Method" value={data.method === 'online' ? 'Online Filing' : 'Document Upload'} />
                <Field label="Legal Structure" value={data.structure?.title} />
                <Field label="Business Type" value={data.type?.toUpperCase()} />
            </Section>

            <Section title="Business Information">
                <Field label="Business Name" value={data.info?.name} />
                <Field label="NTN" value={data.info?.ntn} />
                <Field label="Annual Revenue" value={data.info?.revenue} />
            </Section>

            <Section title="Financial Overview">
                <Field label="Withholding Status" value={data.withholdingStatus === 'all' ? 'All Clients' : data.withholdingStatus === 'none' ? 'None' : 'Some Clients'} />
                <Field label="Revenue (Tax Deducted)" value={data.financial?.revenueDeducted} />
                <Field label="Tax Deducted" value={data.financial?.taxDeducted} />
                <Field label="Revenue (No Tax)" value={data.financial?.revenueNotDeducted} />
                <Field label="Direct Expenses" value={data.financial?.directTotal} />
                <Field label="Indirect Expenses" value={data.financial?.indirectTotal} />
            </Section>

            <Section title="Balance Sheet">
                <Field label="Total Assets" value={data.addon?.totalAssets} />
                <Field label="Total Liabilities" value={data.addon?.totalLiabilities} />
                <Field label="Total Capital" value={data.addon?.totalCapital} />
                <Field label="Cash Balance" value={data.addon?.cashBalance} />
            </Section>

            <div className="flex items-center justify-between pt-8 border-t border-gray-200/50">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-[2px] text-gray-400 hover:text-pak-green-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <button
                    onClick={onComplete}
                    className="px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[3px] transition-all duration-500 flex items-center gap-4 bg-gradient-to-r from-pak-green-500 to-pak-green-brand hover:to-pak-green-700 text-white shadow-xl hover:scale-[1.02] active:scale-95"
                >
                    Submit Application
                    <CheckCircle className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
}
