import { Shield, CheckCircle2, FileCheck, Users, History, Lock, Headphones } from 'lucide-react';

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  trustBadge?: string;
}

export default function FeatureSection({ title, subtitle, trustBadge }: FeatureSectionProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {subtitle}
        </p>
        {trustBadge && (
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
            {trustBadge}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Your Tax Management Hub</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Access your tax dashboard instantly</span>
          </div>
          <div className="flex items-start space-x-3">
            <FileCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Secure file management & tracking</span>
          </div>
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Professional tax expert support</span>
          </div>
          <div className="flex items-start space-x-3">
            <History className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Complete filing history & documents</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">FBR compliance guaranteed</span>
          </div>
          <div className="flex items-start space-x-3">
            <Headphones className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">24/7 customer support available</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-2xl shadow-sm border border-green-200 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Bank-Level Security Guarantee</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">256-bit SSL encryption for all data</span>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">FBR compliant security protocols</span>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">Secure cloud infrastructure</span>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">Regular security audits & monitoring</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-6 leading-relaxed">
          Your sensitive tax information is protected with the same security standards used by major financial institutions.
        </p>
      </div>
    </div>
  );
}
