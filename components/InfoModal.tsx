import React from 'react';
import { X, GraduationCap, Layers, ShieldCheck, BrainCircuit, Target, List } from 'lucide-react';
import { playClick } from '../audio';
import { LEVELS } from '../constants';
import { ShapeRender } from './ShapeRender';
import { ShapeType } from '../types';

interface InfoModalProps {
  onClose: () => void;
  totalLevels: number;
}

export const InfoModal: React.FC<InfoModalProps> = ({ onClose, totalLevels }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-pop">
      <div className="bg-white w-full max-w-2xl h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Om GeoGeniet</h2>
                <p className="text-slate-500 font-medium text-sm">Information för pedagoger och föräldrar</p>
            </div>
            <button 
                onClick={() => { playClick(); onClose(); }}
                className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 active:scale-90 transition-all"
            >
                <X size={24} />
            </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
            
            {/* Intro Pitch */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center">
                    <BrainCircuit className="mr-2" /> Lekfullt Lärande
                </h3>
                <p className="text-blue-800 leading-relaxed">
                    GeoGeniet är ett interaktivt läromedel designat för att göra geometri intuitivt och engagerande. Genom att kombinera <strong>taktil feedback</strong>, <strong>positiv förstärkning</strong> och <strong>progressiv svårighetsgrad</strong> tränar barnet sin rumsuppfattning och logiska förmåga utan att det känns som "plugg".
                </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Scope */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <Layers size={20} />
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg">Omfattande Innehåll</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-[3.25rem]">
                        Spelet innehåller just nu <strong>{totalLevels} unika nivåer</strong>. Vi börjar med grundläggande former (cirkel, kvadrat) och introducerar stegvis komplexa figurer som månghörningar, romber och sammansatta objekt.
                    </p>
                </div>

                {/* Pedagogy */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <GraduationCap size={20} />
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg">Pedagogiska Mål</h4>
                    </div>
                    <ul className="text-slate-600 text-sm leading-relaxed pl-[3.25rem] list-disc space-y-1">
                        <li>Känna igen och namnge geometriska former.</li>
                        <li>Förstå rotation och passform (Rumsuppfattning).</li>
                        <li>Finmotorik genom "drag-and-drop".</li>
                        <li>Uthållighet genom gamification.</li>
                    </ul>
                </div>

                {/* Gamification */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            <Target size={20} />
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg">Motivation</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-[3.25rem]">
                        Vi använder ett belöningssystem med stjärnor och ett <strong>digitalt samlaralbum</strong> för att hålla motivationen uppe. Svårighetsgraden ökar i takt med att barnet samlar stjärnor.
                    </p>
                </div>

                {/* Safety */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                            <ShieldCheck size={20} />
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg">Tryggt & Säkert</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-[3.25rem]">
                        GeoGeniet är helt fritt från reklam, köp inuti appen och externa länkar som barn kan klicka på av misstag. Ingen personlig data samlas in.
                    </p>
                </div>

            </div>

             {/* Level Overview Section */}
             <div className="border-t border-slate-100 pt-8 mt-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <List size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-lg">Nivåöversikt</h4>
                        <p className="text-slate-500 text-sm">Innehållsförteckning över former per nivå.</p>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden max-h-96 overflow-y-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-xs sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 w-16 text-center bg-slate-100">Nivå</th>
                                <th className="px-4 py-3 w-1/3 bg-slate-100">Titel</th>
                                <th className="px-4 py-3 bg-slate-100">Former</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {LEVELS.map(level => {
                                const uniqueShapes = Array.from(new Set(level.shapes.map(s => s.type))) as ShapeType[];
                                return (
                                    <tr key={level.id} className="hover:bg-white transition-colors bg-white/50">
                                        <td className="px-4 py-3 text-center font-bold text-slate-400">#{level.id}</td>
                                        <td className="px-4 py-3 font-medium text-slate-700">{level.title}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2 flex-wrap">
                                                {uniqueShapes.map(type => (
                                                    <div key={type} className="w-6 h-6 text-slate-600 hover:text-blue-500 transition-colors" title={type}>
                                                        <ShapeRender type={type} />
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer / CTA context */}
            <div className="pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-xs">
                    Utvecklat med ❤️ för lärande. Version 1.0.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};