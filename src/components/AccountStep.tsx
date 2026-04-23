import React from 'react';
import { SignupState } from '../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  state: SignupState;
  setState: React.Dispatch<React.SetStateAction<SignupState>>;
  onNext: () => void;
}

export default function AccountStep({ state, setState, onNext }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      account: { ...prev.account, [name]: value }
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
      {/* Left Column: Value Prop */}
      <div className="lg:w-1/2 p-12 bg-slate-50 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Turn your property into an <span className="text-blue-600">Autonomous Asset.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Join the elite property owners using AI to automate enforcement, monitor maintenance, and increase safety without the overhead.
          </p>

          <div className="space-y-6">
            {[
              { title: 'AI Enforcement', desc: 'Detect and action parking violations instantly.', icon: Zap },
              { title: '24/7 Monitoring', desc: 'Complete visibility with evidence-backed logs.', icon: ShieldCheck },
              { title: 'Zero Friction', desc: 'Automated towing and vendor dispatch.', icon: CheckCircle2 },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-300" />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">
                "LotIQ saved us $15k in annual enforcement costs in 3 months."
                <br/>
                <span className="font-bold text-slate-900">— Marcus T., Regency Properties</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="lg:w-1/2 p-12 bg-white flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Create your account</h2>
            <p className="text-slate-500">First, let's get your personal and company details.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">First Name</label>
                <input
                  required
                  name="firstName"
                  value={state.account.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Last Name</label>
                <input
                  required
                  name="lastName"
                  value={state.account.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Company Name</label>
              <input
                required
                name="company"
                value={state.account.company}
                onChange={handleChange}
                placeholder="Regency Management Group"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Work Email</label>
              <input
                required
                type="email"
                name="email"
                value={state.account.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Your Role</label>
              <select
                name="role"
                value={state.account.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="">Select your role</option>
                <option value="owner">Owner / Operator</option>
                <option value="manager">Property Manager</option>
                <option value="ops">Ops Director</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group"
            >
              Set up your property
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
              By creating an account, you agree to LotIQ's <br/>
              <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
