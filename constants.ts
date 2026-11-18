

import { LevelData, Sticker } from './types';

export const STICKERS: Sticker[] = [
    {
        id: 's-novice',
        title: 'Nybörjaren',
        emoji: '🌱',
        description: 'Du har planterat ett frö av kunskap!',
        requiredStars: 5,
        bgColor: 'bg-green-100'
    },
    {
        id: 's-builder',
        title: 'Byggaren',
        emoji: '🏗️',
        description: 'Du är grym på att bygga former!',
        requiredStars: 15,
        bgColor: 'bg-orange-100'
    },
    {
        id: 's-explorer',
        title: 'Utforskaren',
        emoji: '🧭',
        description: 'Ingen form är för svår att hitta.',
        requiredStars: 30,
        bgColor: 'bg-blue-100'
    },
    {
        id: 's-star',
        title: 'Stjärnan',
        emoji: '⭐',
        description: 'Du lyser starkast av alla!',
        requiredStars: 45,
        bgColor: 'bg-yellow-100'
    },
    {
        id: 's-astro',
        title: 'Astronauten',
        emoji: '🚀',
        description: 'Siktar mot stjärnorna!',
        requiredStars: 60,
        bgColor: 'bg-indigo-100'
    },
    {
        id: 's-master',
        title: 'Mästaren',
        emoji: '👑',
        description: 'Du är en riktig Geo-mästare!',
        requiredStars: 75,
        bgColor: 'bg-purple-100'
    }
];

export const LEVELS: LevelData[] = [
  {
    id: 1,
    title: "Starten",
    description: "Matcha de enkla formerna!",
    unlocksAtStars: 0,
    shapes: [
      {
        id: 'l1-circle',
        type: 'circle',
        color: 'bg-geo-red',
        targetPosition: { x: 20, y: 30 },
        startPosition: { x: 50, y: 75 },
      },
      {
        id: 'l1-square',
        type: 'square',
        color: 'bg-geo-blue',
        targetPosition: { x: 70, y: 30 },
        startPosition: { x: 20, y: 75 },
      }
    ]
  },
  {
    id: 2,
    title: "Trianglar",
    description: "Nu blir det kantigt!",
    unlocksAtStars: 1, 
    shapes: [
      {
        id: 'l2-tri1',
        type: 'triangle',
        color: 'bg-geo-yellow',
        targetPosition: { x: 50, y: 20 },
        startPosition: { x: 10, y: 80 },
      },
      {
        id: 'l2-sq1',
        type: 'square',
        color: 'bg-geo-purple',
        targetPosition: { x: 30, y: 50 },
        startPosition: { x: 80, y: 70 },
      },
      {
        id: 'l2-sq2',
        type: 'square',
        color: 'bg-geo-blue',
        targetPosition: { x: 70, y: 50 },
        startPosition: { x: 45, y: 80 },
      }
    ]
  },
  {
    id: 3,
    title: "Huset",
    description: "Bygg ett hus av former.",
    unlocksAtStars: 4,
    shapes: [
      {
        id: 'l3-roof',
        type: 'triangle',
        color: 'bg-geo-red',
        targetPosition: { x: 50, y: 25 },
        startPosition: { x: 80, y: 80 },
        scale: 1.5
      },
      {
        id: 'l3-base',
        type: 'square',
        color: 'bg-geo-blue',
        targetPosition: { x: 50, y: 55 },
        startPosition: { x: 20, y: 80 },
        scale: 1.5
      }
    ]
  },
  {
    id: 4,
    title: "Rymden",
    description: "Former från en annan värld.",
    unlocksAtStars: 7,
    shapes: [
      {
        id: 'l4-star',
        type: 'star',
        color: 'bg-yellow-400',
        targetPosition: { x: 50, y: 20 },
        startPosition: { x: 15, y: 75 },
      },
      {
        id: 'l4-planet',
        type: 'circle',
        color: 'bg-purple-500',
        targetPosition: { x: 20, y: 50 },
        startPosition: { x: 85, y: 85 },
        scale: 1.2
      },
      {
        id: 'l4-moon',
        type: 'circle',
        color: 'bg-gray-300',
        targetPosition: { x: 80, y: 50 },
        startPosition: { x: 50, y: 80 },
        scale: 0.6
      }
    ]
  },
  {
    id: 5,
    title: "Mästaren",
    description: "Det ultimata provet.",
    unlocksAtStars: 10,
    shapes: [
      {
        id: 'l5-1',
        type: 'pentagon',
        color: 'bg-pink-500',
        targetPosition: { x: 50, y: 50 },
        startPosition: { x: 10, y: 10 },
      },
      {
        id: 'l5-2',
        type: 'triangle',
        color: 'bg-green-500',
        targetPosition: { x: 25, y: 25 },
        startPosition: { x: 90, y: 90 },
      },
      {
        id: 'l5-3',
        type: 'triangle',
        color: 'bg-green-500',
        targetPosition: { x: 75, y: 25 },
        startPosition: { x: 10, y: 90 },
      },
      {
        id: 'l5-4',
        type: 'triangle',
        color: 'bg-green-500',
        targetPosition: { x: 25, y: 75 },
        startPosition: { x: 90, y: 10 },
        rotation: 180
      },
      {
        id: 'l5-5',
        type: 'triangle',
        color: 'bg-green-500',
        targetPosition: { x: 75, y: 75 },
        startPosition: { x: 50, y: 90 },
        rotation: 180
      }
    ]
  },
  {
    id: 6,
    title: "Glasskiosken",
    description: "Bygg en smaskig glass!",
    unlocksAtStars: 13,
    shapes: [
      { id: 'l6-cone', type: 'triangle', color: 'bg-orange-300', targetPosition: { x: 50, y: 60 }, startPosition: { x: 15, y: 20 }, rotation: 180, scale: 1.2 },
      { id: 'l6-scoop1', type: 'circle', color: 'bg-pink-400', targetPosition: { x: 50, y: 35 }, startPosition: { x: 85, y: 80 }, scale: 1.1 },
      { id: 'l6-cherry', type: 'circle', color: 'bg-red-500', targetPosition: { x: 50, y: 15 }, startPosition: { x: 10, y: 80 }, scale: 0.4 }
    ]
  },
  {
    id: 7,
    title: "Tåget",
    description: "Tuff tuff, här kommer tåget!",
    unlocksAtStars: 16,
    shapes: [
      { id: 'l7-engine', type: 'rectangle', color: 'bg-blue-600', targetPosition: { x: 40, y: 50 }, startPosition: { x: 80, y: 20 }, scale: 1.2 },
      { id: 'l7-cab', type: 'square', color: 'bg-red-500', targetPosition: { x: 70, y: 40 }, startPosition: { x: 20, y: 80 }, scale: 0.8 },
      { id: 'l7-wheel1', type: 'circle', color: 'bg-slate-800', targetPosition: { x: 30, y: 65 }, startPosition: { x: 50, y: 10 }, scale: 0.6 },
      { id: 'l7-wheel2', type: 'circle', color: 'bg-slate-800', targetPosition: { x: 50, y: 65 }, startPosition: { x: 90, y: 90 }, scale: 0.6 },
      { id: 'l7-wheel3', type: 'circle', color: 'bg-slate-800', targetPosition: { x: 70, y: 65 }, startPosition: { x: 10, y: 50 }, scale: 0.6 }
    ]
  },
  {
    id: 8,
    title: "Granen",
    description: "En grön och fin gran.",
    unlocksAtStars: 19,
    shapes: [
      { id: 'l8-base', type: 'square', color: 'bg-amber-800', targetPosition: { x: 50, y: 75 }, startPosition: { x: 10, y: 20 }, scale: 0.6 },
      { id: 'l8-tier1', type: 'triangle', color: 'bg-green-700', targetPosition: { x: 50, y: 55 }, startPosition: { x: 80, y: 80 }, scale: 1.8 },
      { id: 'l8-tier2', type: 'triangle', color: 'bg-green-600', targetPosition: { x: 50, y: 35 }, startPosition: { x: 20, y: 80 }, scale: 1.4 },
      { id: 'l8-star', type: 'star', color: 'bg-yellow-400', targetPosition: { x: 50, y: 15 }, startPosition: { x: 90, y: 30 }, scale: 0.8 }
    ]
  },
  {
    id: 9,
    title: "Snögubben",
    description: "Kall och rund kompis.",
    unlocksAtStars: 22,
    shapes: [
      { id: 'l9-bot', type: 'circle', color: 'bg-white border-2 border-slate-200', targetPosition: { x: 50, y: 70 }, startPosition: { x: 15, y: 15 }, scale: 1.8 },
      { id: 'l9-mid', type: 'circle', color: 'bg-white border-2 border-slate-200', targetPosition: { x: 50, y: 45 }, startPosition: { x: 85, y: 15 }, scale: 1.4 },
      { id: 'l9-top', type: 'circle', color: 'bg-white border-2 border-slate-200', targetPosition: { x: 50, y: 25 }, startPosition: { x: 15, y: 85 }, scale: 1.0 },
      { id: 'l9-hat', type: 'square', color: 'bg-slate-900', targetPosition: { x: 50, y: 10 }, startPosition: { x: 85, y: 85 }, scale: 0.7 }
    ]
  },
  {
    id: 10,
    title: "Båten",
    description: "Segla på de sju haven.",
    unlocksAtStars: 25,
    shapes: [
      { id: 'l10-hull', type: 'pentagon', color: 'bg-blue-800', targetPosition: { x: 50, y: 65 }, startPosition: { x: 10, y: 20 }, rotation: 180, scale: 1.5 },
      { id: 'l10-sail1', type: 'triangle', color: 'bg-white', targetPosition: { x: 60, y: 35 }, startPosition: { x: 90, y: 80 }, scale: 1.2 },
      { id: 'l10-sail2', type: 'triangle', color: 'bg-sky-200', targetPosition: { x: 40, y: 40 }, startPosition: { x: 20, y: 80 }, scale: 0.9 },
      { id: 'l10-sun', type: 'circle', color: 'bg-yellow-400', targetPosition: { x: 85, y: 15 }, startPosition: { x: 50, y: 90 }, scale: 0.8 }
    ]
  },
  {
    id: 11,
    title: "Larven",
    description: "En slingrig liten vän.",
    unlocksAtStars: 28,
    shapes: [
      { id: 'l11-head', type: 'circle', color: 'bg-red-500', targetPosition: { x: 20, y: 50 }, startPosition: { x: 80, y: 20 } },
      { id: 'l11-b1', type: 'circle', color: 'bg-green-500', targetPosition: { x: 40, y: 60 }, startPosition: { x: 80, y: 80 } },
      { id: 'l11-b2', type: 'circle', color: 'bg-green-400', targetPosition: { x: 60, y: 40 }, startPosition: { x: 20, y: 80 } },
      { id: 'l11-b3', type: 'circle', color: 'bg-green-300', targetPosition: { x: 80, y: 50 }, startPosition: { x: 20, y: 20 } },
    ]
  },
  {
    id: 12,
    title: "Raketen",
    description: "3... 2... 1... Lyfta!",
    unlocksAtStars: 31,
    shapes: [
      { id: 'l12-body', type: 'rectangle', color: 'bg-slate-200', targetPosition: { x: 50, y: 50 }, startPosition: { x: 10, y: 50 }, rotation: 90, scale: 1.5 },
      { id: 'l12-nose', type: 'triangle', color: 'bg-red-600', targetPosition: { x: 50, y: 20 }, startPosition: { x: 80, y: 80 } },
      { id: 'l12-fin1', type: 'triangle', color: 'bg-orange-500', targetPosition: { x: 35, y: 75 }, startPosition: { x: 90, y: 20 } },
      { id: 'l12-fin2', type: 'triangle', color: 'bg-orange-500', targetPosition: { x: 65, y: 75 }, startPosition: { x: 10, y: 80 } },
      { id: 'l12-window', type: 'circle', color: 'bg-sky-400', targetPosition: { x: 50, y: 45 }, startPosition: { x: 50, y: 90 }, scale: 0.5 }
    ]
  },
  {
    id: 13,
    title: "Blomma",
    description: "En vacker blomma i solen.",
    unlocksAtStars: 34,
    shapes: [
      { id: 'l13-center', type: 'circle', color: 'bg-yellow-500', targetPosition: { x: 50, y: 40 }, startPosition: { x: 50, y: 90 }, scale: 0.8 },
      { id: 'l13-p1', type: 'circle', color: 'bg-pink-400', targetPosition: { x: 50, y: 25 }, startPosition: { x: 10, y: 10 }, scale: 0.6 },
      { id: 'l13-p2', type: 'circle', color: 'bg-pink-400', targetPosition: { x: 65, y: 40 }, startPosition: { x: 90, y: 10 }, scale: 0.6 },
      { id: 'l13-p3', type: 'circle', color: 'bg-pink-400', targetPosition: { x: 50, y: 55 }, startPosition: { x: 10, y: 80 }, scale: 0.6 },
      { id: 'l13-p4', type: 'circle', color: 'bg-pink-400', targetPosition: { x: 35, y: 40 }, startPosition: { x: 90, y: 80 }, scale: 0.6 },
      { id: 'l13-stem', type: 'rectangle', color: 'bg-green-600', targetPosition: { x: 50, y: 75 }, startPosition: { x: 50, y: 10 }, rotation: 90, scale: 0.8 }
    ]
  },
  {
    id: 14,
    title: "Lastbilen",
    description: "Tut tut, nu kör vi!",
    unlocksAtStars: 37,
    shapes: [
      { id: 'l14-cab', type: 'square', color: 'bg-blue-500', targetPosition: { x: 75, y: 50 }, startPosition: { x: 20, y: 20 } },
      { id: 'l14-trailer', type: 'rectangle', color: 'bg-red-600', targetPosition: { x: 40, y: 45 }, startPosition: { x: 80, y: 80 }, scale: 1.4 },
      { id: 'l14-w1', type: 'circle', color: 'bg-black', targetPosition: { x: 30, y: 65 }, startPosition: { x: 50, y: 50 }, scale: 0.6 },
      { id: 'l14-w2', type: 'circle', color: 'bg-black', targetPosition: { x: 50, y: 65 }, startPosition: { x: 10, y: 80 }, scale: 0.6 },
      { id: 'l14-w3', type: 'circle', color: 'bg-black', targetPosition: { x: 75, y: 65 }, startPosition: { x: 90, y: 20 }, scale: 0.6 }
    ]
  },
  {
    id: 15,
    title: "Slottet",
    description: "Kungligt bygge.",
    unlocksAtStars: 40,
    shapes: [
      { id: 'l15-main', type: 'square', color: 'bg-stone-400', targetPosition: { x: 50, y: 60 }, startPosition: { x: 50, y: 20 }, scale: 1.5 },
      { id: 'l15-tower1', type: 'rectangle', color: 'bg-stone-500', targetPosition: { x: 25, y: 55 }, startPosition: { x: 80, y: 80 }, rotation: 90, scale: 1.2 },
      { id: 'l15-tower2', type: 'rectangle', color: 'bg-stone-500', targetPosition: { x: 75, y: 55 }, startPosition: { x: 20, y: 80 }, rotation: 90, scale: 1.2 },
      { id: 'l15-roof1', type: 'triangle', color: 'bg-blue-700', targetPosition: { x: 25, y: 30 }, startPosition: { x: 10, y: 50 } },
      { id: 'l15-roof2', type: 'triangle', color: 'bg-blue-700', targetPosition: { x: 75, y: 30 }, startPosition: { x: 90, y: 50 } },
      { id: 'l15-door', type: 'circle', color: 'bg-stone-800', targetPosition: { x: 50, y: 70 }, startPosition: { x: 50, y: 90 }, scale: 0.8 }
    ]
  },
  {
    id: 16,
    title: "Månghörningar",
    description: "Klara av de nya komplexa formerna!",
    unlocksAtStars: 43,
    shapes: [
      { id: 'l16-hex', type: 'hexagon', color: 'bg-purple-600', targetPosition: { x: 25, y: 30 }, startPosition: { x: 80, y: 80 } },
      { id: 'l16-oct', type: 'octagon', color: 'bg-teal-600', targetPosition: { x: 75, y: 30 }, startPosition: { x: 20, y: 80 } },
      { id: 'l16-rhom', type: 'rhombus', color: 'bg-indigo-500', targetPosition: { x: 50, y: 60 }, startPosition: { x: 10, y: 20 }, scale: 1.2 },
      { id: 'l16-trap', type: 'trapezoid', color: 'bg-pink-600', targetPosition: { x: 25, y: 80 }, startPosition: { x: 90, y: 20 } },
      { id: 'l16-para', type: 'parallelogram', color: 'bg-orange-500', targetPosition: { x: 75, y: 80 }, startPosition: { x: 50, y: 10 } },
    ]
  },
  {
    id: 17,
    title: "Fisken",
    description: "Simma lugnt i havet.",
    unlocksAtStars: 46,
    shapes: [
      { id: 'l17-body', type: 'circle', color: 'bg-orange-500', targetPosition: { x: 50, y: 50 }, startPosition: { x: 10, y: 20 }, scale: 1.5 },
      { id: 'l17-tail', type: 'triangle', color: 'bg-orange-600', targetPosition: { x: 20, y: 50 }, startPosition: { x: 80, y: 80 }, rotation: 90 },
      { id: 'l17-eye', type: 'circle', color: 'bg-white border-2 border-black', targetPosition: { x: 65, y: 45 }, startPosition: { x: 50, y: 90 }, scale: 0.3 },
      { id: 'l17-fin-top', type: 'triangle', color: 'bg-orange-400', targetPosition: { x: 50, y: 30 }, startPosition: { x: 20, y: 80 } },
      { id: 'l17-fin-bot', type: 'triangle', color: 'bg-orange-400', targetPosition: { x: 50, y: 70 }, startPosition: { x: 90, y: 20 }, rotation: 180 }
    ]
  },
  {
    id: 18,
    title: "Roboten",
    description: "Bip bop! Bygg en robot.",
    unlocksAtStars: 49,
    shapes: [
      { id: 'l18-head', type: 'square', color: 'bg-slate-400', targetPosition: { x: 50, y: 25 }, startPosition: { x: 10, y: 80 } },
      { id: 'l18-body', type: 'rectangle', color: 'bg-blue-600', targetPosition: { x: 50, y: 55 }, startPosition: { x: 90, y: 10 }, scale: 1.2 },
      { id: 'l18-arm-l', type: 'rectangle', color: 'bg-slate-500', targetPosition: { x: 25, y: 50 }, startPosition: { x: 20, y: 20 }, rotation: 45, scale: 0.8 },
      { id: 'l18-arm-r', type: 'rectangle', color: 'bg-slate-500', targetPosition: { x: 75, y: 50 }, startPosition: { x: 80, y: 80 }, rotation: -45, scale: 0.8 },
      { id: 'l18-leg-l', type: 'rectangle', color: 'bg-slate-600', targetPosition: { x: 40, y: 80 }, startPosition: { x: 50, y: 10 }, scale: 0.8 },
      { id: 'l18-leg-r', type: 'rectangle', color: 'bg-slate-600', targetPosition: { x: 60, y: 80 }, startPosition: { x: 50, y: 90 }, scale: 0.8 }
    ]
  },
  {
    id: 19,
    title: "Fjärilen",
    description: "Vackra vingar.",
    unlocksAtStars: 52,
    shapes: [
      { id: 'l19-body', type: 'rectangle', color: 'bg-slate-800', targetPosition: { x: 50, y: 50 }, startPosition: { x: 50, y: 10 }, rotation: 90, scale: 1.2 },
      { id: 'l19-wing-tl', type: 'semi-circle', color: 'bg-pink-400', targetPosition: { x: 35, y: 35 }, startPosition: { x: 90, y: 80 }, rotation: -45 },
      { id: 'l19-wing-tr', type: 'semi-circle', color: 'bg-pink-400', targetPosition: { x: 65, y: 35 }, startPosition: { x: 10, y: 80 }, rotation: 45 },
      { id: 'l19-wing-bl', type: 'circle', color: 'bg-purple-500', targetPosition: { x: 35, y: 65 }, startPosition: { x: 90, y: 20 } },
      { id: 'l19-wing-br', type: 'circle', color: 'bg-purple-500', targetPosition: { x: 65, y: 65 }, startPosition: { x: 10, y: 20 } }
    ]
  },
  {
    id: 20,
    title: "Sköldpaddan",
    description: "Långsam men säker.",
    unlocksAtStars: 55,
    shapes: [
      { id: 'l20-shell', type: 'hexagon', color: 'bg-emerald-600', targetPosition: { x: 50, y: 50 }, startPosition: { x: 15, y: 15 }, scale: 1.5 },
      { id: 'l20-head', type: 'circle', color: 'bg-emerald-500', targetPosition: { x: 80, y: 50 }, startPosition: { x: 85, y: 85 }, scale: 0.7 },
      { id: 'l20-leg1', type: 'semi-circle', color: 'bg-emerald-700', targetPosition: { x: 35, y: 30 }, startPosition: { x: 80, y: 20 }, scale: 0.5 },
      { id: 'l20-leg2', type: 'semi-circle', color: 'bg-emerald-700', targetPosition: { x: 65, y: 30 }, startPosition: { x: 20, y: 80 }, scale: 0.5 },
      { id: 'l20-leg3', type: 'semi-circle', color: 'bg-emerald-700', targetPosition: { x: 35, y: 70 }, startPosition: { x: 50, y: 90 }, scale: 0.5, rotation: 180 },
      { id: 'l20-leg4', type: 'semi-circle', color: 'bg-emerald-700', targetPosition: { x: 65, y: 70 }, startPosition: { x: 50, y: 10 }, scale: 0.5, rotation: 180 }
    ]
  },
  {
    id: 21,
    title: "Pyramiden",
    description: "Öknens mysterium.",
    unlocksAtStars: 58,
    shapes: [
      { id: 'l21-pyr', type: 'triangle', color: 'bg-yellow-600', targetPosition: { x: 50, y: 50 }, startPosition: { x: 10, y: 80 }, scale: 1.8 },
      { id: 'l21-door', type: 'rectangle', color: 'bg-yellow-900', targetPosition: { x: 50, y: 80 }, startPosition: { x: 90, y: 10 }, rotation: 90, scale: 0.5 },
      { id: 'l21-sun', type: 'circle', color: 'bg-yellow-300', targetPosition: { x: 85, y: 15 }, startPosition: { x: 50, y: 50 }, scale: 0.8 },
      { id: 'l21-cloud', type: 'semi-circle', color: 'bg-white/80', targetPosition: { x: 20, y: 20 }, startPosition: { x: 80, y: 80 } }
    ]
  },
  {
    id: 22,
    title: "Väderkvarnen",
    description: "Snurrar i vinden.",
    unlocksAtStars: 61,
    shapes: [
      { id: 'l22-base', type: 'trapezoid', color: 'bg-red-700', targetPosition: { x: 50, y: 70 }, startPosition: { x: 20, y: 20 }, scale: 1.2 },
      { id: 'l22-hub', type: 'circle', color: 'bg-slate-800', targetPosition: { x: 50, y: 40 }, startPosition: { x: 50, y: 90 }, scale: 0.3 },
      { id: 'l22-b1', type: 'triangle', color: 'bg-slate-100', targetPosition: { x: 50, y: 25 }, startPosition: { x: 90, y: 50 }, scale: 0.8 },
      { id: 'l22-b2', type: 'triangle', color: 'bg-slate-100', targetPosition: { x: 65, y: 40 }, startPosition: { x: 10, y: 50 }, rotation: 90, scale: 0.8 },
      { id: 'l22-b3', type: 'triangle', color: 'bg-slate-100', targetPosition: { x: 50, y: 55 }, startPosition: { x: 80, y: 20 }, rotation: 180, scale: 0.8 },
      { id: 'l22-b4', type: 'triangle', color: 'bg-slate-100', targetPosition: { x: 35, y: 40 }, startPosition: { x: 20, y: 80 }, rotation: 270, scale: 0.8 }
    ]
  },
  {
    id: 23,
    title: "Pizzan",
    description: "Mumsigt pussel!",
    unlocksAtStars: 64,
    shapes: [
      { id: 'l23-crust', type: 'circle', color: 'bg-orange-200', targetPosition: { x: 50, y: 50 }, startPosition: { x: 50, y: 15 }, scale: 1.8 },
      { id: 'l23-s1', type: 'triangle', color: 'bg-yellow-400', targetPosition: { x: 50, y: 35 }, startPosition: { x: 10, y: 80 } },
      { id: 'l23-s2', type: 'triangle', color: 'bg-yellow-400', targetPosition: { x: 63, y: 58 }, startPosition: { x: 90, y: 80 }, rotation: 120 },
      { id: 'l23-s3', type: 'triangle', color: 'bg-yellow-400', targetPosition: { x: 37, y: 58 }, startPosition: { x: 50, y: 90 }, rotation: 240 },
      { id: 'l23-p1', type: 'circle', color: 'bg-red-600', targetPosition: { x: 50, y: 45 }, startPosition: { x: 15, y: 20 }, scale: 0.4 },
      { id: 'l23-p2', type: 'circle', color: 'bg-red-600', targetPosition: { x: 58, y: 55 }, startPosition: { x: 85, y: 20 }, scale: 0.4 },
      { id: 'l23-p3', type: 'circle', color: 'bg-red-600', targetPosition: { x: 42, y: 55 }, startPosition: { x: 85, y: 50 }, scale: 0.4 }
    ]
  },
  {
    id: 24,
    title: "Draken",
    description: "Flyg högt i skyn.",
    unlocksAtStars: 67,
    shapes: [
      { id: 'l24-main', type: 'rhombus', color: 'bg-red-500', targetPosition: { x: 50, y: 40 }, startPosition: { x: 10, y: 10 }, scale: 1.4 },
      { id: 'l24-t1', type: 'triangle', color: 'bg-red-400', targetPosition: { x: 50, y: 65 }, startPosition: { x: 90, y: 90 }, scale: 0.6 },
      { id: 'l24-t2', type: 'triangle', color: 'bg-red-400', targetPosition: { x: 50, y: 75 }, startPosition: { x: 10, y: 90 }, scale: 0.6 },
      { id: 'l24-t3', type: 'triangle', color: 'bg-red-400', targetPosition: { x: 50, y: 85 }, startPosition: { x: 50, y: 50 }, scale: 0.6 },
      { id: 'l24-cloud1', type: 'semi-circle', color: 'bg-white', targetPosition: { x: 15, y: 20 }, startPosition: { x: 80, y: 20 } },
      { id: 'l24-cloud2', type: 'semi-circle', color: 'bg-white', targetPosition: { x: 85, y: 30 }, startPosition: { x: 20, y: 80 } }
    ]
  },
  {
    id: 25,
    title: "Ugglan",
    description: "Hoo hoo!",
    unlocksAtStars: 70,
    shapes: [
      { id: 'l25-body', type: 'circle', color: 'bg-stone-600', targetPosition: { x: 50, y: 55 }, startPosition: { x: 50, y: 90 }, scale: 1.6 },
      { id: 'l25-eye-l', type: 'circle', color: 'bg-white', targetPosition: { x: 40, y: 45 }, startPosition: { x: 10, y: 10 }, scale: 0.5 },
      { id: 'l25-eye-r', type: 'circle', color: 'bg-white', targetPosition: { x: 60, y: 45 }, startPosition: { x: 90, y: 10 }, scale: 0.5 },
      { id: 'l25-beak', type: 'triangle', color: 'bg-orange-400', targetPosition: { x: 50, y: 55 }, startPosition: { x: 50, y: 20 }, rotation: 180, scale: 0.4 },
      { id: 'l25-ear-l', type: 'triangle', color: 'bg-stone-700', targetPosition: { x: 35, y: 25 }, startPosition: { x: 20, y: 80 } },
      { id: 'l25-ear-r', type: 'triangle', color: 'bg-stone-700', targetPosition: { x: 65, y: 25 }, startPosition: { x: 80, y: 80 } }
    ]
  },
  {
    id: 26,
    title: "Rymdstationen",
    description: "Teknik i omloppsbana.",
    unlocksAtStars: 73,
    shapes: [
      { id: 'l26-core', type: 'octagon', color: 'bg-slate-300', targetPosition: { x: 50, y: 50 }, startPosition: { x: 50, y: 10 }, scale: 1.0 },
      { id: 'l26-arm1', type: 'rectangle', color: 'bg-slate-500', targetPosition: { x: 25, y: 50 }, startPosition: { x: 90, y: 90 }, rotation: 90 },
      { id: 'l26-arm2', type: 'rectangle', color: 'bg-slate-500', targetPosition: { x: 75, y: 50 }, startPosition: { x: 10, y: 90 }, rotation: 90 },
      { id: 'l26-pod1', type: 'circle', color: 'bg-slate-400', targetPosition: { x: 10, y: 50 }, startPosition: { x: 80, y: 20 }, scale: 0.8 },
      { id: 'l26-pod2', type: 'square', color: 'bg-slate-400', targetPosition: { x: 90, y: 50 }, startPosition: { x: 20, y: 20 }, scale: 0.8 },
      { id: 'l26-sol1', type: 'rectangle', color: 'bg-blue-500 border-2 border-slate-700', targetPosition: { x: 50, y: 20 }, startPosition: { x: 10, y: 50 }, scale: 1.2 },
      { id: 'l26-sol2', type: 'rectangle', color: 'bg-blue-500 border-2 border-slate-700', targetPosition: { x: 50, y: 80 }, startPosition: { x: 90, y: 50 }, scale: 1.2 }
    ]
  },
  {
    id: 27,
    title: "Kungakronan",
    description: "En krona för en kung eller drottning.",
    unlocksAtStars: 76,
    shapes: [
      { id: 'l27-base', type: 'rectangle', color: 'bg-yellow-500', targetPosition: { x: 50, y: 70 }, startPosition: { x: 50, y: 20 }, scale: 1.4 },
      { id: 'l27-point-m', type: 'triangle', color: 'bg-yellow-500', targetPosition: { x: 50, y: 45 }, startPosition: { x: 90, y: 80 } },
      { id: 'l27-point-l', type: 'triangle', color: 'bg-yellow-500', targetPosition: { x: 25, y: 50 }, startPosition: { x: 10, y: 80 }, rotation: -15 },
      { id: 'l27-point-r', type: 'triangle', color: 'bg-yellow-500', targetPosition: { x: 75, y: 50 }, startPosition: { x: 80, y: 20 }, rotation: 15 },
      { id: 'l27-gem-m', type: 'rhombus', color: 'bg-red-500', targetPosition: { x: 50, y: 70 }, startPosition: { x: 50, y: 90 }, scale: 0.6 },
      { id: 'l27-gem-l', type: 'circle', color: 'bg-blue-500', targetPosition: { x: 25, y: 70 }, startPosition: { x: 15, y: 15 }, scale: 0.4 },
      { id: 'l27-gem-r', type: 'circle', color: 'bg-blue-500', targetPosition: { x: 75, y: 70 }, startPosition: { x: 85, y: 15 }, scale: 0.4 }
    ]
  },
  {
    id: 28,
    title: "Bilen",
    description: "Tut tut, nu åker vi!",
    unlocksAtStars: 79,
    shapes: [
      { id: 'l28-body', type: 'rectangle', color: 'bg-red-600', targetPosition: { x: 50, y: 60 }, startPosition: { x: 10, y: 50 }, scale: 1.6 },
      { id: 'l28-top', type: 'trapezoid', color: 'bg-red-500', targetPosition: { x: 50, y: 35 }, startPosition: { x: 90, y: 20 }, scale: 1.0 },
      { id: 'l28-win', type: 'trapezoid', color: 'bg-sky-300', targetPosition: { x: 50, y: 35 }, startPosition: { x: 50, y: 90 }, scale: 0.6 },
      { id: 'l28-w1', type: 'circle', color: 'bg-zinc-800', targetPosition: { x: 30, y: 75 }, startPosition: { x: 80, y: 80 }, scale: 0.7 },
      { id: 'l28-w2', type: 'circle', color: 'bg-zinc-800', targetPosition: { x: 70, y: 75 }, startPosition: { x: 20, y: 20 }, scale: 0.7 }
    ]
  },
  {
    id: 29,
    title: "Räven",
    description: "Vad säger räven?",
    unlocksAtStars: 82,
    shapes: [
      { id: 'l29-face', type: 'triangle', color: 'bg-orange-500', targetPosition: { x: 50, y: 55 }, startPosition: { x: 50, y: 10 }, rotation: 180, scale: 1.8 },
      { id: 'l29-ear-l', type: 'triangle', color: 'bg-orange-600', targetPosition: { x: 30, y: 20 }, startPosition: { x: 90, y: 80 }, rotation: -15 },
      { id: 'l29-ear-r', type: 'triangle', color: 'bg-orange-600', targetPosition: { x: 70, y: 20 }, startPosition: { x: 10, y: 80 }, rotation: 15 },
      { id: 'l29-nose', type: 'circle', color: 'bg-black', targetPosition: { x: 50, y: 75 }, startPosition: { x: 50, y: 90 }, scale: 0.3 },
      { id: 'l29-eye-l', type: 'circle', color: 'bg-white', targetPosition: { x: 40, y: 45 }, startPosition: { x: 85, y: 50 }, scale: 0.4 },
      { id: 'l29-eye-r', type: 'circle', color: 'bg-white', targetPosition: { x: 60, y: 45 }, startPosition: { x: 15, y: 50 }, scale: 0.4 }
    ]
  },
  {
    id: 30,
    title: "Lyftkranen",
    description: "Bygg högt mot skyn.",
    unlocksAtStars: 85,
    shapes: [
      { id: 'l30-base', type: 'square', color: 'bg-slate-700', targetPosition: { x: 20, y: 80 }, startPosition: { x: 80, y: 20 } },
      { id: 'l30-tower', type: 'rectangle', color: 'bg-yellow-400', targetPosition: { x: 20, y: 50 }, startPosition: { x: 50, y: 50 }, rotation: 90, scale: 1.5 },
      { id: 'l30-arm', type: 'rectangle', color: 'bg-yellow-400', targetPosition: { x: 55, y: 20 }, startPosition: { x: 20, y: 80 }, scale: 1.8 },
      { id: 'l30-cab', type: 'square', color: 'bg-yellow-500', targetPosition: { x: 20, y: 20 }, startPosition: { x: 90, y: 90 }, scale: 0.8 },
      { id: 'l30-load', type: 'square', color: 'bg-orange-700', targetPosition: { x: 80, y: 60 }, startPosition: { x: 50, y: 10 } }
    ]
  },
  {
    id: 31,
    title: "Svampen",
    description: "En liten svamp i skogen.",
    unlocksAtStars: 88,
    shapes: [
      { id: 'l31-stem', type: 'rectangle', color: 'bg-stone-100', targetPosition: { x: 50, y: 70 }, startPosition: { x: 10, y: 20 }, rotation: 90 },
      { id: 'l31-cap', type: 'semi-circle', color: 'bg-red-600', targetPosition: { x: 50, y: 40 }, startPosition: { x: 90, y: 80 }, scale: 1.8 },
      { id: 'l31-spot1', type: 'circle', color: 'bg-white', targetPosition: { x: 35, y: 35 }, startPosition: { x: 20, y: 80 }, scale: 0.3 },
      { id: 'l31-spot2', type: 'circle', color: 'bg-white', targetPosition: { x: 65, y: 35 }, startPosition: { x: 80, y: 20 }, scale: 0.3 },
      { id: 'l31-spot3', type: 'circle', color: 'bg-white', targetPosition: { x: 50, y: 25 }, startPosition: { x: 50, y: 90 }, scale: 0.3 },
      { id: 'l31-grass1', type: 'triangle', color: 'bg-green-500', targetPosition: { x: 30, y: 85 }, startPosition: { x: 90, y: 10 } },
      { id: 'l31-grass2', type: 'triangle', color: 'bg-green-500', targetPosition: { x: 70, y: 85 }, startPosition: { x: 10, y: 10 } }
    ]
  },
  {
    id: 32,
    title: "Ankaret",
    description: "Skepp ohoj!",
    unlocksAtStars: 91,
    shapes: [
      { id: 'l32-shaft', type: 'rectangle', color: 'bg-slate-500', targetPosition: { x: 50, y: 45 }, startPosition: { x: 10, y: 50 }, rotation: 90, scale: 1.4 },
      { id: 'l32-cross', type: 'rectangle', color: 'bg-slate-600', targetPosition: { x: 50, y: 25 }, startPosition: { x: 90, y: 50 }, scale: 1.0 },
      { id: 'l32-ring', type: 'circle', color: 'bg-slate-400', targetPosition: { x: 50, y: 10 }, startPosition: { x: 50, y: 90 }, scale: 0.5 },
      { id: 'l32-curve', type: 'semi-circle', color: 'bg-slate-500', targetPosition: { x: 50, y: 75 }, startPosition: { x: 20, y: 20 }, rotation: 180, scale: 1.2 },
      { id: 'l32-tip-l', type: 'triangle', color: 'bg-slate-600', targetPosition: { x: 20, y: 65 }, startPosition: { x: 80, y: 80 }, rotation: -45, scale: 0.6 },
      { id: 'l32-tip-r', type: 'triangle', color: 'bg-slate-600', targetPosition: { x: 80, y: 65 }, startPosition: { x: 20, y: 80 }, rotation: 45, scale: 0.6 }
    ]
  },
  {
    id: 33,
    title: "Fisken 2",
    description: "En exotisk fisk.",
    unlocksAtStars: 94,
    shapes: [
      { id: 'l33-body', type: 'ellipse', color: 'bg-violet-500', targetPosition: { x: 50, y: 50 }, startPosition: { x: 50, y: 10 }, scale: 1.5 },
      { id: 'l33-tail', type: 'triangle', color: 'bg-violet-600', targetPosition: { x: 85, y: 50 }, startPosition: { x: 10, y: 50 }, rotation: -90 },
      { id: 'l33-fin-top', type: 'triangle', color: 'bg-pink-400', targetPosition: { x: 50, y: 25 }, startPosition: { x: 90, y: 90 }, rotation: 0 },
      { id: 'l33-fin-bot', type: 'triangle', color: 'bg-pink-400', targetPosition: { x: 50, y: 75 }, startPosition: { x: 10, y: 90 }, rotation: 180 },
      { id: 'l33-eye', type: 'circle', color: 'bg-white', targetPosition: { x: 30, y: 45 }, startPosition: { x: 50, y: 80 }, scale: 0.4 },
      { id: 'l33-stripe1', type: 'rectangle', color: 'bg-violet-300', targetPosition: { x: 50, y: 50 }, startPosition: { x: 80, y: 20 }, rotation: 90, scale: 0.8 },
      { id: 'l33-stripe2', type: 'rectangle', color: 'bg-violet-300', targetPosition: { x: 65, y: 50 }, startPosition: { x: 20, y: 20 }, rotation: 90, scale: 0.6 }
    ]
  },
  {
    id: 34,
    title: "Helikoptern",
    description: "Flyg över staden.",
    unlocksAtStars: 97,
    shapes: [
      { id: 'l34-body', type: 'ellipse', color: 'bg-blue-600', targetPosition: { x: 50, y: 50 }, startPosition: { x: 15, y: 80 }, scale: 1.4 },
      { id: 'l34-tail', type: 'rectangle', color: 'bg-blue-600', targetPosition: { x: 80, y: 50 }, startPosition: { x: 85, y: 15 }, scale: 1.0 },
      { id: 'l34-tail-rotor', type: 'triangle', color: 'bg-slate-300', targetPosition: { x: 95, y: 50 }, startPosition: { x: 15, y: 15 }, scale: 0.5 },
      { id: 'l34-cockpit', type: 'semi-circle', color: 'bg-sky-300', targetPosition: { x: 35, y: 50 }, startPosition: { x: 50, y: 90 }, rotation: -90, scale: 0.8 },
      { id: 'l34-rotor-shaft', type: 'rectangle', color: 'bg-slate-400', targetPosition: { x: 50, y: 30 }, startPosition: { x: 85, y: 85 }, rotation: 90, scale: 0.3 },
      { id: 'l34-rotor-blade', type: 'rectangle', color: 'bg-slate-300', targetPosition: { x: 50, y: 25 }, startPosition: { x: 50, y: 50 }, scale: 2.0 }, // Thin rectangle via css handled in ShapeRender default aspect? Actually rectangle is 80x50. To make it thin, we rely on scaling or assume it's okay. A thin rectangle might need a custom shape or extreme scaling. Let's use scale 2.0 but maybe rotated? No, flat.
      { id: 'l34-skid1', type: 'rectangle', color: 'bg-slate-500', targetPosition: { x: 50, y: 70 }, startPosition: { x: 20, y: 50 }, scale: 1.2 }
    ]
  },
  {
    id: 35,
    title: "Skattkistan",
    description: "Vad finns däri?",
    unlocksAtStars: 100,
    shapes: [
      { id: 'l35-base', type: 'rectangle', color: 'bg-amber-700', targetPosition: { x: 50, y: 65 }, startPosition: { x: 10, y: 20 }, scale: 1.4 },
      { id: 'l35-lid', type: 'semi-circle', color: 'bg-amber-600', targetPosition: { x: 50, y: 40 }, startPosition: { x: 90, y: 90 }, scale: 1.4 },
      { id: 'l35-band1', type: 'rectangle', color: 'bg-amber-900', targetPosition: { x: 35, y: 65 }, startPosition: { x: 50, y: 50 }, rotation: 90 },
      { id: 'l35-band2', type: 'rectangle', color: 'bg-amber-900', targetPosition: { x: 65, y: 65 }, startPosition: { x: 20, y: 80 }, rotation: 90 },
      { id: 'l35-lock', type: 'circle', color: 'bg-yellow-400', targetPosition: { x: 50, y: 55 }, startPosition: { x: 80, y: 20 }, scale: 0.5 },
      { id: 'l35-gold1', type: 'circle', color: 'bg-yellow-300', targetPosition: { x: 20, y: 85 }, startPosition: { x: 10, y: 50 }, scale: 0.4 },
      { id: 'l35-gold2', type: 'circle', color: 'bg-yellow-300', targetPosition: { x: 80, y: 85 }, startPosition: { x: 90, y: 50 }, scale: 0.4 }
    ]
  },
  {
    id: 36,
    title: "Tårtan",
    description: "Grattis på födelsedagen!",
    unlocksAtStars: 103,
    shapes: [
      { id: 'l36-base', type: 'rectangle', color: 'bg-pink-300', targetPosition: { x: 50, y: 70 }, startPosition: { x: 15, y: 15 }, scale: 1.6 },
      { id: 'l36-mid', type: 'rectangle', color: 'bg-pink-400', targetPosition: { x: 50, y: 45 }, startPosition: { x: 85, y: 15 }, scale: 1.2 },
      { id: 'l36-top', type: 'rectangle', color: 'bg-pink-500', targetPosition: { x: 50, y: 25 }, startPosition: { x: 50, y: 90 }, scale: 0.8 },
      { id: 'l36-c1', type: 'rectangle', color: 'bg-white', targetPosition: { x: 40, y: 15 }, startPosition: { x: 20, y: 80 }, rotation: 90, scale: 0.4 },
      { id: 'l36-c2', type: 'rectangle', color: 'bg-white', targetPosition: { x: 50, y: 15 }, startPosition: { x: 50, y: 50 }, rotation: 90, scale: 0.4 },
      { id: 'l36-c3', type: 'rectangle', color: 'bg-white', targetPosition: { x: 60, y: 15 }, startPosition: { x: 80, y: 80 }, rotation: 90, scale: 0.4 },
      { id: 'l36-f1', type: 'triangle', color: 'bg-orange-400', targetPosition: { x: 40, y: 5 }, startPosition: { x: 10, y: 50 }, scale: 0.3 },
      { id: 'l36-f2', type: 'triangle', color: 'bg-orange-400', targetPosition: { x: 50, y: 5 }, startPosition: { x: 90, y: 50 }, scale: 0.3 },
      { id: 'l36-f3', type: 'triangle', color: 'bg-orange-400', targetPosition: { x: 60, y: 5 }, startPosition: { x: 50, y: 10 }, scale: 0.3 }
    ]
  },
  {
    id: 37,
    title: "Valvet",
    description: "En ståtlig port.",
    unlocksAtStars: 106,
    shapes: [
      { id: 'l37-arch', type: 'arch', color: 'bg-stone-500', targetPosition: { x: 50, y: 35 }, startPosition: { x: 50, y: 80 }, scale: 1.5 },
      { id: 'l37-p1', type: 'rectangle', color: 'bg-stone-600', targetPosition: { x: 20, y: 70 }, startPosition: { x: 10, y: 20 }, rotation: 90, scale: 1.2 },
      { id: 'l37-p2', type: 'rectangle', color: 'bg-stone-600', targetPosition: { x: 80, y: 70 }, startPosition: { x: 90, y: 20 }, rotation: 90, scale: 1.2 },
      { id: 'l37-key', type: 'square', color: 'bg-yellow-500', targetPosition: { x: 50, y: 15 }, startPosition: { x: 50, y: 50 }, rotation: 45, scale: 0.5 }
    ]
  }
];