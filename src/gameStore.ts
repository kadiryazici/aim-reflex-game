import { reactive, watchEffect } from 'vue';
// @ts-expect-error
import mp3 from './assets/bg.mp3';
// @ts-expect-error
import hit from './assets/hit.wav';
// @ts-expect-error
import hit1 from './assets/hit1.wav';
// @ts-expect-error
import hit2 from './assets/hit2.wav';

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
})();

export const playRandomHit = () => {
   const random = Math.random();
   if (random < 0.33) {
      store.sound.hit!.currentTime = 0;
      store.sound.hit?.play();
   } else if (random < 0.66) {
      store.sound.hit1!.currentTime = 0;
      store.sound.hit1?.play();
   } else {
      store.sound.hit2!.currentTime = 0;
      store.sound.hit2?.play();
   }
   console.log({ random });
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
      '75:70',
      '100:100',
      '120:125',
      '150:140',
      '180:160',
      '200:175',
      '230:190',
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

export default store;
