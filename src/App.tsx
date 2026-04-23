/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';
import { cn } from './lib/utils';
import { INITIAL_STATE, SignupState } from './types';

// Step Components
import AccountStep from './components/AccountStep';
import PropertyStep from './components/PropertyStep';
import BillingStep from './components/BillingStep';
import ScheduleStep from './components/ScheduleStep';
import SuccessStep from './components/SuccessStep';

const STEPS = [
  { id: 1, name: 'Account', icon: Users, description: 'Personal & Company' },
  { id: 2, name: 'Property', icon: MapPin, description: 'Address & Zones' },
  { id: 3, name: 'Billing', icon: CreditCard, description: 'Plan & Payment' },
  { id: 4, name: 'Install', icon: Calendar, description: 'Schedule Arrival' },
];

export default function App() {
  const [state, setState] = useState<SignupState>(INITIAL_STATE);

  const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));

  const renderStep = () => {
    switch (state.step) {
      case 1: return <AccountStep state={state} setState={setState} onNext={nextStep} />;
      case 2: return <PropertyStep state={state} setState={setState} onNext={nextStep} onPrev={prevStep} />;
      case 3: return <BillingStep state={state} setState={setState} onNext={nextStep} onPrev={prevStep} />;
      case 4: return <ScheduleStep state={state} setState={setState} onNext={nextStep} onPrev={prevStep} />;
      case 5: return <SuccessStep state={state} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="h-20 border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-800">LotIQ</span>
        </div>

        {state.step < 5 && (
          <div className="hidden md:flex items-center gap-8">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = state.step === step.id;
              const isCompleted = state.step > step.id;

              return (
                <div 
                  key={step.id} 
                  className={cn(
                    "flex items-center gap-3 transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-40"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                    isActive ? "bg-blue-600 text-white" : isCompleted ? "bg-green-500 text-white" : "bg-slate-100 text-slate-500"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{step.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium leading-none">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500 hidden sm:inline">Already have an account?</span>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Sign In</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      {state.step < 5 && (
        <footer className="py-10 border-t border-slate-100 bg-white w-full">
          <div className="px-10">
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-medium text-slate-400 tabular-nums">
                © 2026 LotIQ Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
