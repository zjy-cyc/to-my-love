import { MemoryLocation, DiaryEntry } from './types';

// NOTE: Dates are set to 2025 as requested. 
// If viewed before these dates occur, the day counts will be negative.

export const DATES = {
  firstMet: new Date('2025-07-22T00:00:00'),
  together: new Date('2025-08-17T00:00:00'),
  lastMet: new Date('2025-12-30T00:00:00'), 
  nextMeeting: new Date('2026-02-20T00:00:00'),
};

export const PASSCODE = "220725";

export const LETTER_CONTENT = `
老婆,

我想你的次数，比我真正说出口的要多得多。它并不总是那种轰轰烈烈的方式。有时候只是一些很小的瞬间，比如我会想你今天过得怎么样，此刻在做什么，或者有没有什么事情让你笑了一下。

当我看到一些我知道你会喜欢的东西时，你会突然出现在我的脑海里。听到一个你会笑的笑话时也是。路过一个让人想起我们的地方时也是。

即使是在忙碌的一天中间，也总会有那么一秒，我会不自觉地停下来想起你。到了晚上，你常常是我入睡前最后想到的人。到了早上，你通常也是我最先想到的人之一。

我很想你。真的很想。

Forever yours.
`;

export const DIARY_ENTRIES: DiaryEntry[] = [
  {
    title: "Hong Kong",
    date: "Summer 2025",
    content: "This was when I first saw my future, a girl that looked like no other. It must be fate that we sat next to each other, and belonged to the same group. I wanted to have a conversation with you but was too shy to do so...",
    color: "bg-amber-50",
    image: "https://res.cloudinary.com/dw2gihkv5/image/upload/v1771005858/IMG_5387_c2jucv.jpg" // PASTE YOUR IMAGE LINK HERE
  },
  {
    title: "Ho Chi Minh City",
    date: "Autumn 2025",
    content: "Where we first met after becoming official. That night, I was the happiest man in the entire city, country, and probably the world. I couldn't stop thinking about you in my dreams for many nights after you left",
    color: "bg-emerald-50",
    image: "https://res.cloudinary.com/dw2gihkv5/image/upload/v1771005655/IMG_6385_pwwtyf.jpg" // PASTE YOUR IMAGE LINK HERE
  },
  {
    title: "Beijing",
    date: "Winter 2025",
    content: "This adventure is one I will treasure and remember for the rest of my life. Being able to embrace you, try new things, and spend time with you made me feel like I am the luckiest. Thank you for taking me to see your hometown, your city, and what you love",
    color: "bg-red-50",
    image: "https://res.cloudinary.com/dw2gihkv5/image/upload/v1771005283/IMG_7939_b8sjif.jpg" // PASTE YOUR IMAGE LINK HERE
  },
  {
    title: "Our Future Journeys...",
    date: "2026 & Beyond",
    content: "The world is vast, but it feels small when I'm holding your hand. There are so many more horizons to chase, so many more sunrises to witness. I can't wait to see where we go next.",
    color: "bg-rose-50",
    image: "" // PASTE YOUR IMAGE LINK HERE
  }
];

// Updated coordinates for Beijing, Hong Kong, and Ho Chi Minh City
export const MEMORY_LOCATIONS: MemoryLocation[] = [
  {
    id: 1,
    position: [39.9042, 116.4074],
    title: "Beijing",
    description: "Memories in the capital."
  },
  {
    id: 2,
    position: [22.3193, 114.1694],
    title: "Hong Kong",
    description: "Our time in the harbor city."
  },
  {
    id: 3,
    position: [10.8231, 106.6297],
    title: "Ho Chi Minh City",
    description: "Adventures in Vietnam."
  }
];