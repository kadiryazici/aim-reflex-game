import { reactive } from 'vue';
import mp3 from './assets/bg.mp3';
import hit from './assets/hit.wav';
import hit1 from './assets/hit1.wav';
import hit2 from './assets/hit2.wav';
import hit3 from './assets/hit3.wav';
import { nanoid } from 'nanoid';

export interface Vec2 {
  x: number;
  y: number;
}

export interface Target extends Vec2 {
  id: string;
}

const store = reactive({
  isGameStarted: false,
  backgroundAudio: (() => {
    const audio = new Audio(mp3);
    audio.loop = true;

    return audio;
  })(),
  isBackgroundAudioMuted: false,
  progress: 100,
  decreaseSpeed: 5,
  score: 0,
  isLost: false,
  sound: {
    hit: null as HTMLAudioElement | null,
    hit1: null as HTMLAudioElement | null,
    hit2: null as HTMLAudioElement | null,
    hit3: null as HTMLAudioElement | null,
    fail: '',
  },
  target: null as Target | null,
  slash: null as Vec2 | null,
});

const getBlobUrl = async (url: string) => {
  const result = await fetch(url);
  const data = await result.blob();
  return URL.createObjectURL(data);
};

(
  [
    ['hit', hit],
    ['hit1', hit1],
    ['hit2', hit2],
    ['hit3', hit3],
  ] as const
).forEach(([key, url]) =>
  getBlobUrl(url).then((url) => {
    store.sound[key] = new Audio(url);
  }),
);

export const playRandomHit = () => {
  const random = Math.random();
  let randomHit = store.sound.hit3;

  if (random < 0.25) {
    randomHit = store.sound.hit;
  } else if (random < 0.5) {
    randomHit = store.sound.hit1;
  } else if (random < 0.75) {
    randomHit = store.sound.hit2;
  }

  if (randomHit) {
    randomHit.currentTime = 0;
    randomHit.play();
  }
};

// Left: Score, Right: Speed
// 100 / Speed = Seconds to hit the box
// 100 / 230(last level) ? 0.43 second
const levels = [
  '15:10', // 10 sec
  '35:15', // 6.6 sec
  '50:35', // 2.8 sec
  '75:50', // 2 sec
  '100:90', // 1.1 sec
  '120:100', // 1 sec
  '150:120', // 0.8 sec
  '180:140', // 0.7 sec
  '200:160', // 0.625 sec
  '230:185', // 0.54 sec
  '260:200', // 0.5 sec
  '290:210', // 0.47 sec
  '320:220', // 0.45 sec
  '350:230', // 0.43 sec
] as const;

export const gameUpdate = () => {
  if (store.progress < 0) {
    store.isLost = true;
    store.target = null;
    return;
  }

  for (const val of levels) {
    const splitted = val.split(':');
    const targetedScore = Number(splitted[0]);
    const speed = Number(splitted[1]);
    if (store.score <= targetedScore) {
      store.decreaseSpeed = speed;
      break;
    }
  }

  setTimeout(() => {
    store.progress -= store.decreaseSpeed / 10;
    gameUpdate();
  }, 1000 / 10);
};

export const createTarget = () => {
  const x = Math.random() * (90 - 5) + 5;
  const y = Math.random() * (90 - 5) + 5;
  store.target = {
    id: nanoid(),
    x,
    y,
  };
};

function* range(start: number, end: number) {
  let rangeStart = start - 1;

  while (rangeStart < end) {
    rangeStart += 1;
    yield rangeStart;
  }
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const particleAnimationDuration = 2000;
const particleCount = 30;
export const createParticle = ({ x, y }: Target): void => {
  const areaEl = document.querySelector('.shoot-wrapper') as HTMLDivElement;
  const elements = [] as HTMLDivElement[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of range(0, particleCount)) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    Object.assign(particle.style, {
      left: `${x}%`,
      top: `${y}%`,
    });
    elements.push(particle);
  }

  for (const element of elements) {
    const angle = Math.floor(Math.random() * 360);
    const targetX = randomBetween(500, 800) * Math.cos((angle * Math.PI) / 180);
    const targetY = randomBetween(500, 800) * Math.sin((angle * Math.PI) / 180);

    element.animate(
      [
        {
          opacity: 1,
          transform: `translate(0px, 0px) rotate(0deg)`,
        },
        {
          opacity: 0,
          transform: `translate(${targetX}px, ${targetY}px) rotate(10deg)`,
        },
      ],
      {
        duration: particleAnimationDuration,
        easing: 'ease-out',
      },
    );
    areaEl.append(element);
  }

  setTimeout(() => {
    elements.forEach((el) => el.remove());
    elements.length = 0;
  }, particleAnimationDuration);
};

export default store;
