import { reactive, watchEffect } from 'vue';
// @ts-expect-error
import mp3 from './assets/bg.mp3';
// @ts-expect-error
import hit from './assets/hit.wav';
// @ts-expect-error
import hit1 from './assets/hit1.wav';
// @ts-expect-error
import hit2 from './assets/hit2.wav';
// @ts-expect-error
import hit3 from './assets/hit3.wav';

const store = reactive({
   isGameStarted: false,
   backgroundAudio: new Audio(mp3),
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
   targets: [] as { x: number; y: number }[],
   slashes: [] as { x: number; y: number }[],
   particles: [] as { x: number; y: number }[],
});

{
   store.backgroundAudio.loop = true;
}
// watchEffect(() => {
//    store.backgroundAudio.muted = store.isBackgroundAudioMuted;
// });

// BLOB ALIYORUM
const getBlobUrl = async (url: string) => {
   const result = await fetch(url);
   const data = await result.blob();
   return URL.createObjectURL(data);
};
//BURADA SAYFA İLK YÜKLENDİĞİNDE ARKA PLANDA GEREKLİ SES
//DOSYALARINI YÜKLÜYORUM
//VE ONLARI BLOB OLARAK KAYDEDİYORUM
//BLOB SEKMEYE ÖZEL "URL"DİR.
(async () => {
   store.sound.hit = new Audio(await getBlobUrl(hit));
   store.sound.hit1 = new Audio(await getBlobUrl(hit1));
   store.sound.hit2 = new Audio(await getBlobUrl(hit2));
   store.sound.hit3 = new Audio(await getBlobUrl(hit3));
})();

export const playRandomHit = () => {
   const random = Math.random();
   if (random < 0.25) {
      store.sound.hit!.currentTime = 0;
      store.sound.hit?.play();
   } else if (random < 0.5) {
      store.sound.hit1!.currentTime = 0;
      store.sound.hit1?.play();
   } else if (random < 0.75) {
      store.sound.hit2!.currentTime = 0;
      store.sound.hit2?.play();
   } else {
      store.sound.hit3!.currentTime = 0;
      store.sound.hit3?.play();
   }
};

// OYUNUN SÜRE AZALTMA MEKANİZMASI
export const gameUpdate = () => {
   if (store.progress < 0) {
      store.isLost = true;
      store.targets = [];
      return;
   }

   // SOL SKOR SAĞ HIZ
   // MANTIK ŞU
   // 1000 / 10 / HIZ = saniye : kutuya vurulması gereken süre
   // 1000 / 10 / 230(SON SEVİYE) ? 0.43 SANİYE
   const levels = [
      '15:10',
      '35:25',
      '50:45',
      '75:60',
      '100:85',
      '120:100',
      '150:120',
      '180:145',
      '200:165',
      '230:185',
      '260:200',
      '290:210',
      '320:220',
      '350:230',
   ];
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
   store.targets.push({
      x,
      y,
   });
};

export const createParticle = ({ x, y }: { x: number; y: number }): void => {
   const html = `
   <div class="mr-5 particle">
      <div></div><div></div><div></div><div></div>
   </div>
   `;

   const parent = document.createElement('div');
   parent.className = 'mr-5 particle';
   const transitionDiv = document.createElement('div');
   parent.insertAdjacentElement('afterbegin', transitionDiv);
   parent.insertAdjacentHTML('beforeend', '<div></div><div></div><div></div>');

   parent.style.left = x + '%';
   parent.style.top = y + '%';
   parent.style.transform = `rotate(${Math.random() * (110 - -110) + -110}deg)`;

   console.log(parent.style.transform);

   const areaWrapper = document.querySelector('.shoot-wrapper');
   areaWrapper?.appendChild(parent);

   setTimeout(() => {
      parent.classList.add('active');
      setTimeout(() => {
         parent.remove();
      }, 1000);
   }, 20);
};

export default store;
