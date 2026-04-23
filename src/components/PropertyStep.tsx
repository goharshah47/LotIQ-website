import React from 'react';
import { SignupState } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Square, 
  MousePointer2, 
  Info,
  Layers,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  state: SignupState;
  setState: React.Dispatch<React.SetStateAction<SignupState>>;
  onNext: () => void;
  onPrev: () => void;
}

export default function PropertyStep({ state, setState, onNext, onPrev }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      property: { ...prev.property, [name]: value }
    }));
  };

  const toggleZone = (zone: string) => {
    setState(prev => ({
      ...prev,
      property: {
        ...prev.property,
        zones: prev.property.zones.includes(zone) 
          ? prev.property.zones.filter(z => z !== zone)
          : [...prev.property.zones, zone]
      }
    }));
  };

  const zones = ['Entry Gate A', 'Loading Dock', 'Back Parking Lot', 'Main Entrance', 'EV Charging Bay'];

  return (
    <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-160px)] overflow-hidden">
      {/* Sidebar: Details */}
      <div className="lg:w-1/3 p-8 border-r border-slate-100 overflow-y-auto bg-white flex flex-col">
        <div className="mb-8">
          <button onClick={onPrev} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Account
          </button>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Define your property</h2>
          <p className="text-slate-500 text-sm">Where should our AI focus its attention?</p>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Property Name</label>
            <input
              required
              name="name"
              placeholder="The Regency Mall"
              value={state.property.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Type</label>
            <div className="relative">
              <select
                name="type"
                value={state.property.type}
                onChange={handleChange}
                className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none pr-10"
              >
                <option value="Commercial">Commercial/Retail</option>
                <option value="Residential">Multi-family Residential</option>
                <option value="Industrial">Industrial Warehouse</option>
                <option value="Office">Corporate Campus</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Full Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                required
                name="address"
                placeholder="Start typing your address..."
                value={state.property.address}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Monitored Zones</h3>
              <p className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded uppercase">{state.property.zones.length} active</p>
            </div>
            <div className="space-y-2">
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => toggleZone(zone)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl border transition-all text-sm font-medium",
                    state.property.zones.includes(zone)
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                      : "border-slate-100 bg-white text-slate-500 hover:border-slate-300"
                  )}
                >
                  {zone}
                  <div className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center",
                    state.property.zones.includes(zone) ? "bg-blue-600 border-blue-600" : "border-slate-200"
                  )}>
                    {state.property.zones.includes(zone) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!state.property.address || state.property.zones.length === 0}
          className="mt-8 w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
        >
          Configure AI Monitoring
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main Column: Interactive Map */}
      <div className="flex-1 bg-slate-200 relative overflow-hidden group">
        {/* Mock Map Background (Using pattern) */}
        <div className="absolute inset-0 bg-[#E5E7EB] opacity-50" style={{ backgroundImage: 'radial-gradient(#9CA3AF 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Mock Satellite Image Overlay (Visual Placeholder) */}
        <div className={cn(
          "absolute inset-0 bg-slate-800/10 transition-all duration-1000",
          state.property.address ? "opacity-100" : "opacity-0 grayscale blur-sm"
        )}>
           <div className="w-full h-full flex items-center justify-center">
              <div className="text-slate-400 font-mono text-xs text-center">
                 {state.property.address ? (
                   <div className="bg-white/80 backdrop-blur p-12 rounded-3xl shadow-2xl border border-white max-w-xl animate-in fade-in duration-700">
                      <div className="w-full h-64 bg-slate-100 rounded-2xl mb-6 relative overflow-hidden">
                        {/* Dynamic Zones on Map */}
                        {state.property.zones.includes('Back Parking Lot') && (
                          <div className="absolute inset-0 bg-blue-500/20 border-4 border-dashed border-blue-400 flex items-center justify-center">
                            <span className="text-blue-600 font-bold uppercase text-[10px] tracking-widest bg-white/90 px-3 py-1 rounded-full shadow-sm">Back Parking Lot</span>
                          </div>
                        )}
                        <MapPin className="w-10 h-10 text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg" />
                      </div>
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
                          <Layers className="text-white w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-slate-900 font-bold text-lg">{state.property.address}</p>
                          <p className="text-slate-500 text-sm">Property identified. Detecting entrance points...</p>
                        </div>
                      </div>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center gap-4">
                     <div className="w-16 h-16 rounded-full bg-slate-300 animate-pulse" />
                     <p>Enter an address to view your property satellite imagery</p>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Toolbar */}
        <div className="absolute top-6 left-6 flex gap-2">
          <div className="bg-white shadow-xl rounded-2xl p-1.5 flex gap-1 border border-slate-100">
             <button className="p-3 bg-blue-600 text-white rounded-xl shadow-inner"><MousePointer2 className="w-5 h-5"/></button>
             <button className="p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"><Square className="w-5 h-5"/></button>
             <button className="p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"><MapPin className="w-5 h-5"/></button>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3 border border-slate-100">
             <Info className="w-4 h-4 text-blue-600" />
             <span className="text-sm font-bold text-slate-700">Draw zones on the map to activate monitoring.</span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-white shadow-2xl rounded-2xl p-5 border border-slate-100 max-w-xs animate-in slide-in-from-bottom duration-500">
           <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">AI Vision Status</h4>
           <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-sm font-medium text-slate-600 tracking-tight">Main Entrance: <span className="font-bold text-slate-900">Online</span></span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-slate-300" />
                 <span className="text-sm font-medium text-slate-400 tracking-tight">Perimeter: <span className="font-bold uppercase text-[10px]">Pending Setup</span></span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
