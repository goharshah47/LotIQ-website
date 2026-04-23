import React from 'react';
import { SignupState } from '../types';
import { CheckCircle2, ArrowRight, Home, Settings, Smartphone, Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  state: SignupState;
}

export default function SuccessStep({ state }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[70vh] max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"
      >
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </motion.div>

      <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Your property is now intelligent.</h1>
      <p className="text-lg text-slate-500 mb-12 max-w-lg">
        Congratulations, {state.account.firstName}! Your setup is complete. Our team will be at <span className="font-bold text-slate-900">{state.property.name || 'the site'}</span> on <span className="font-bold text-slate-900">{state.installationDate} at {state.installationTime}</span>.
      </p>

      <div className="grid md:grid-cols-3 gap-6 w-full mb-12">
        {[
          { title: 'Download Apps', icon: Smartphone, desc: 'Get mobile alerts for all zones.' },
          { title: 'Configure Rules', icon: Settings, desc: 'Fine-tune your AI enforcement.' },
          { title: 'Invite Teams', icon: Bell, desc: 'Add staff and tow partners.' }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow cursor-default"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
               <item.icon className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 flex items-center gap-2 group transition-all">
          Go to Dashboard
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="bg-white hover:bg-slate-50 text-slate-600 font-bold py-4 px-10 rounded-2xl border border-slate-200 transition-all flex items-center gap-2">
          <Home className="w-4 h-4" />
          Visit Homepage
        </button>
      </div>
    </div>
  );
}
