import React from 'react';
import { SignupState } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Truck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  state: SignupState;
  setState: React.Dispatch<React.SetStateAction<SignupState>>;
  onNext: () => void;
  onPrev: () => void;
}

export default function ScheduleStep({ state, setState, onNext, onPrev }: Props) {
  const dates = [
    { day: 'Mon', date: 'Oct 24', status: 'Available' },
    { day: 'Tue', date: 'Oct 25', status: 'Available' },
    { day: 'Wed', date: 'Oct 26', status: 'Limited', slots: 2 },
    { day: 'Thu', date: 'Oct 27', status: 'Available' },
    { day: 'Fri', date: 'Oct 28', status: 'Available' },
  ];

  const times = ['08:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'];

  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-[500px] overflow-hidden">
      {/* Selection Area */}
      <div className="lg:w-1/2 p-12 bg-white overflow-y-auto">
        <div className="max-w-md mx-auto">
          <div className="mb-10">
            <button onClick={onPrev} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Billing
            </button>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Schedule your installation</h2>
            <p className="text-slate-500">Our team will arrive to set up hardware and calibrate your AI zones.</p>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" /> Select a Date
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {dates.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setState(prev => ({ ...prev, installationDate: d.date }))}
                    className={cn(
                      "flex flex-col items-center p-4 rounded-2xl border-2 transition-all",
                      state.installationDate === d.date
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-lg shadow-blue-100"
                        : "border-slate-100 hover:border-slate-300"
                    )}
                  >
                    <span className="text-[10px] uppercase font-black tracking-widest mb-1 opacity-60">{d.day}</span>
                    <span className="text-sm font-bold">{d.date.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={cn("transition-all duration-500", state.installationDate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none")}>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" /> Select a Timeslot
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setState(prev => ({ ...prev, installationTime: t }))}
                    className={cn(
                      "flex items-center justify-center p-4 rounded-2xl border-2 transition-all font-bold text-sm",
                      state.installationTime === t
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-lg shadow-blue-100"
                        : "border-slate-100 hover:border-slate-300 text-slate-600"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
               disabled={!state.installationDate || !state.installationTime}
               onClick={onNext}
               className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group"
            >
               Finish Registration
               <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero / Context Area */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 text-white flex-col justify-center relative overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-700/50 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-md mx-auto relative z-10">
           <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 border border-white/20">
              <Truck className="w-10 h-10 text-white" />
           </div>
           
           <h2 className="text-4xl font-black tracking-tight mb-6 leading-tight">What happens next?</h2>
           
           <div className="space-y-8">
              {[
                { title: 'On-site Survey', desc: 'Our technicians verify line-of-sight for your cameras.', step: 1 },
                { title: 'Hardware Install', desc: 'We mount edge-AI nodes at your designated zones.', step: 2 },
                { title: 'AI Calibration', desc: 'Our team trains the model on your live entrance flows.', step: 3 }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                   <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-sm shrink-0 border border-white/30 group-hover:bg-white group-hover:text-blue-600 transition-all">
                      {item.step}
                   </div>
                   <div>
                      <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                      <p className="text-blue-100/70 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                 <Info className="w-4 h-4 text-blue-200" />
                 <span className="text-xs font-black uppercase tracking-widest text-blue-200">Installation Policy</span>
              </div>
              <p className="text-xs text-blue-100/60 leading-relaxed font-medium">
                Typically takes 3-4 hours. A property manager must be present to grant access to electrical points and network switches.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
