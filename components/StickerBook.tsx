
import React from 'react';
import { Sticker } from '../types';
import { STICKERS } from '../constants';
import { X, Lock, Star } from 'lucide-react';
import { playClick } from '../audio';

interface StickerBookProps {
    onClose: () => void;
    totalStars: number;
}

export const StickerBook: React.FC<StickerBookProps> = ({ onClose, totalStars }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-pop">
            <div className="bg-white w-full max-w-2xl h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="bg-gradient-to-b from-yellow-50 to-white px-6 py-4 flex items-center justify-between border-b border-yellow-100">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Mitt Samlaralbum</h2>
                        <div className="flex items-center text-yellow-500 font-bold mt-1">
                            <Star className="fill-yellow-400 mr-1.5" size={18} />
                            <span>{totalStars} insamlade stjärnor</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => { playClick(); onClose(); }}
                        className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 active:scale-90 transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Sticker Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {STICKERS.map((sticker) => {
                            const isUnlocked = totalStars >= sticker.requiredStars;

                            return (
                                <div 
                                    key={sticker.id}
                                    className={`
                                        relative rounded-3xl p-4 flex flex-col items-center text-center transition-all duration-500
                                        ${isUnlocked 
                                            ? `bg-white border-b-4 border-slate-200 shadow-sm transform hover:-translate-y-1` 
                                            : 'bg-slate-200/50 border border-dashed border-slate-300'}
                                    `}
                                >
                                    {/* Sticker Image Area */}
                                    <div className={`
                                        w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-3 shadow-inner
                                        ${isUnlocked ? sticker.bgColor : 'bg-slate-200 grayscale opacity-50'}
                                    `}>
                                        {isUnlocked ? sticker.emoji : <Lock className="text-slate-400" size={32} />}
                                    </div>

                                    {/* Info */}
                                    {isUnlocked ? (
                                        <>
                                            <h3 className="font-bold text-slate-800 mb-1">{sticker.title}</h3>
                                            <p className="text-xs text-slate-500 font-medium leading-tight">{sticker.description}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="font-bold text-slate-400 mb-1">Låst</h3>
                                            <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                                                Kräver {sticker.requiredStars} <Star size={10} className="fill-slate-400" />
                                            </p>
                                        </>
                                    )}

                                    {/* Shine effect for unlocked */}
                                    {isUnlocked && (
                                        <div className="absolute top-0 right-0 w-full h-full rounded-3xl overflow-hidden pointer-events-none">
                                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/20 to-transparent rotate-45 pointer-events-none" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
