import React from 'react';
import { SignupState } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2,
  Building,
  Lock,
  Zap,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  state: SignupState;
  setState: React.Dispatch<React.SetStateAction<SignupState>>;
  onNext: () => void;
  onPrev: () => void;
}

export default function BillingStep({ state, setState, onNext, onPrev }: Props) {
  const PLANS = [
    { 
      id: 'monthly', 
      name: 'Pilot', 
      price: '$299', 
      period: '/mo',
      desc: 'Ideal for small parking lots with 1-2 entrance points.',
      features: ['2 Active AI Zones', 'Email Alerts', '7-day Evidence Store']
    },
    { 
      id: 'yearly', 
      name: 'Professional', 
      price: '$199', 
      period: '/mo', 
      save: 'Save 33%',
      desc: 'Most popular for commercial management. Full automation.',
      features: ['Unlimited AI Zones', 'Automated Enforcement', '30-day Evidence Store', 'Priority Dispatch'],
      popular: true
    },
    { 
      id: 'custom', 
      name: 'Enterprise', 
      price: 'Custom', 
      period: '',
      desc: 'For portfolios and multi-campus deployment.',
      features: ['Multi-property Dashboard', 'API Integration', 'Dedicated Manager', 'On-site Audit']
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
      {/* Plans Selection */}
      <div className="lg:w-2/3 p-12 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <button onClick={onPrev} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Property
            </button>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Choose your intelligence level</h2>
            <p className="text-slate-500">Pick the plan that best fits your property portfolio.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setState(prev => ({ ...prev, plan: plan.id as any }))}
                className={cn(
                  "relative flex flex-col text-left p-6 rounded-2xl border-2 transition-all duration-300 group",
                  state.plan === plan.id 
                    ? "border-blue-600 bg-blue-50/50 shadow-xl shadow-blue-100/50 translate-y-[-4px]" 
                    : "border-slate-100 hover:border-slate-300 bg-white"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    Recommended
                  </div>
                )}
                
                <div className="mb-4">
                   <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{plan.name}</h3>
                   <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                      <span className="text-sm text-slate-400 font-bold">{plan.period}</span>
                   </div>
                   {plan.save && <span className="text-[10px] font-black text-green-600 uppercase tracking-tighter mt-1 block">{plan.save} with annual billing</span>}
                </div>

                <p className="text-xs text-slate-500 mb-6 leading-relaxed flex-1">{plan.desc}</p>

                <ul className="space-y-3 pt-6 border-t border-slate-100/50">
                   {plan.features.map((feat, i) => (
                     <li key={i} className="flex gap-2 items-start text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                        <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", state.plan === plan.id ? "text-blue-600" : "text-slate-300")} />
                        {feat}
                     </li>
                   ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                   <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900">ACH Bank Transfer</h3>
                   <p className="text-xs text-slate-500">Secure direct billing for automated renewals.</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Number</label>
                   <input className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 outline-none font-mono text-sm" placeholder="•••• •••• •••• 1234" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Routing Number</label>
                   <input className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 outline-none font-mono text-sm" placeholder="021000021" />
                </div>
             </div>

             <div className="mt-8 flex items-center gap-4 bg-white/50 p-4 rounded-2xl border border-dashed border-slate-200">
                <Lock className="w-4 h-4 text-slate-400" />
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Your payment information is encrypted and never stored on our servers. LotIQ follows strict SOC2 Type II compliance standards for financial data.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Sticky Order Summary / ROI Calculator */}
      <div className="lg:w-1/3 p-12 bg-slate-50 border-l border-slate-100 flex flex-col justify-between">
        <div className="space-y-8">
           <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">Setup Summary</h3>
           
           <div className="space-y-6">
              <div className="flex items-start gap-3">
                 <Building className="w-5 h-5 text-slate-400 mt-1" />
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Property</p>
                    <p className="text-sm font-bold text-slate-900">{state.property.name || 'Your Property'}</p>
                    <p className="text-xs text-slate-500 max-w-[200px] truncate">{state.property.address || 'Address Pending'}</p>
                 </div>
              </div>

              <div className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Config</p>
                    <p className="text-sm font-bold text-slate-900">{state.property.zones.length} Active Zones</p>
                    <p className="text-xs text-slate-500">24/7 Automated Enforcement</p>
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-slate-200 space-y-3">
              <div className="flex justify-between text-sm font-medium text-slate-600">
                 <span>{state.plan === 'yearly' ? 'Professional (Annual)' : 'Professional (Monthly)'}</span>
                 <span className="font-bold text-slate-900">{state.plan === 'yearly' ? '$199.00' : '$299.00'}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-600">
                 <span>Implementation Fee</span>
                 <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                 <span className="text-lg font-bold text-slate-900">First Month Due</span>
                 <span className="text-2xl font-black text-blue-600">{state.plan === 'yearly' ? '$199.00' : '$299.00'}</span>
              </div>
           </div>

           {/* ROI Box */}
           <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
              <Star className="text-blue-200 w-6 h-6 mb-3 fill-blue-300" />
              <h4 className="font-bold text-lg mb-1 leading-tight">Projected Annual Savings</h4>
              <p className="text-blue-100 text-xs mb-4 opacity-80 font-medium">Based on 500+ properties like yours.</p>
              <div className="text-3xl font-black mb-1">$12,450.00</div>
              <p className="text-[10px] uppercase font-black tracking-widest text-blue-200">Return on Intelligence</p>
           </div>
        </div>

        <button
          onClick={onNext}
          className="mt-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 text-lg group"
        >
          Confirm & Schedule Install
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
