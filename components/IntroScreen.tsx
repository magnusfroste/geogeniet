import React from 'react';
import { Play, Star, Sparkles } from 'lucide-react';
import { ShapeRender } from './ShapeRender';
import { playClick } from '../audio';

interface IntroScreenProps {
  onDismiss: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-pop">
      <div className="bg-gradient-to-b from-white to-blue-50 rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden flex flex-col items-center border-4 border-white ring-4 ring-blue-100">
        
        {/* Mascot / Hero Section */}
        <div className="relative w-full h-64 bg-apple-blue flex items-center justify-center overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-10 left-10 w-16 h-16 text-white/20 rotate-12"><ShapeRender type="star" /></div>
            <div className="absolute bottom-5 right-10 w-20 h-20 text-white/20 -rotate-12"><ShapeRender type="hexagon" /></div>
            
            {/* The Mascot "Geo" */}
            <div className="relative z-10 animate-float">
                {/* Head */}
                <div className="w-32 h-32 bg-white rounded-3xl border-4 border-slate-800 shadow-xl relative flex items-center justify-center">
                    {/* Eyes */}
                    <div className="absolute top-10 left-6 w-6 h-8 bg-slate-800 rounded-full animate-bounce-small" style={{ animationDelay: '0.1s' }} />
                    <div className="absolute top-10 right-6 w-6 h-8 bg-slate-800 rounded-full animate-bounce-small" style={{ animationDelay: '0.2s' }} />
                    {/* Cheeks */}
                    <div className="absolute top-16 left-4 w-4 h-3 bg-pink-300 rounded-full opacity-60" />
                    <div className="absolute top-16 right-4 w-4 h-3 bg-pink-300 rounded-full opacity-60" />
                    {/* Smile */}
                    <div className="absolute bottom-6 w-12 h-6 border-b-4 border-slate-800 rounded-full" />
                    {/* Antenna */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-8 bg-slate-600" />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-slate-800 animate-pulse" />
                </div>
                {/* Body hint */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-20 h-24 bg-slate-200 rounded-t-3xl border-4 border-slate-800 -z-10" />
            </div>
        </div>

        {/* Content */}
        <div className="p-8 w-full text-center flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2 drop-shadow-sm">
              Hej kompis!
            </h1>
            <p className="text-slate-500 font-bold text-lg mb-6 leading-tight">
              Jag heter <span className="text-blue-600">Geo</span>. <br/>
              Hjälp mig samla alla former!
            </p>
          </div>

          <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center gap-4">
                 <div className="flex items-center text-orange-400 font-bold">
                    <Star className="fill-orange-400 animate-spin-slow mr-1" size={24} /> 
                    <span>Samla stjärnor</span>
                 </div>
                 <div className="w-px h-8 bg-slate-100" />
                 <div className="flex items-center text-purple-500 font-bold">
                    <Sparkles className="fill-purple-200 animate-pulse mr-1" size={24} /> 
                    <span>Lös pussel</span>
                 </div>
              </div>

              <button 
                onClick={() => { playClick(); onDismiss(); }}
                className="group relative w-full bg-gradient-to-b from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-xl font-black py-5 rounded-2xl shadow-[0_6px_0_rgb(21,128,61)] active:shadow-none active:translate-y-[6px] transition-all flex items-center justify-center gap-3"
              >
                <span>NU KÖR VI!</span>
                <Play size={28} className="fill-white group-hover:scale-110 transition-transform" />
              </button>
          </div>
        </div>

      </div>
    </div>
  );
};