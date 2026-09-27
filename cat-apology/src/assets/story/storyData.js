import scene1 from './scene1.jpg'
import scene2a from './scene2a.webp'
import scene2b from './scene2b.jpg'
import scene3 from './scene3.jpg'
import scene4 from './scene4.jpg'
import scene5a from './scene5a.jpg'
import scene5b from './scene5b.jpg'
import scene6 from './scene6.jpg'

export const story = [
  {
    images: [scene1],
    text: "Issa sorry for making the bunbuns feel like this way",

  },
  {
    images: [scene2a, scene2b],
    text: "Issa not ko wants ta like da dota o ako couples. Want ko the sweeties healthy relationship with games and lovey",
  },
  {
    images: [scene3],
    text: "Sorry issa been making the lovey constantly angy bunbun",
  },
  {
    images: [scene4],
    text: "The wombutt also feels sad and will do better to communicate",
  },
  {
    images: [scene5a, scene5b],
    text: "I want a healthy future for us! The cuties!!",
  },
  {
    images: [],
    text: "Because our love is ...",
    audioCue: { track: 'weAreElectric', seekTo: 13 }, // 0:13
  },
  {
    images: [scene6],
    text: "ELECTRIC",
  },
]

export const endingAudioCue = { track: 'honeybee', seekTo: 72 }
export const startingAudioCue = { track: 'honeybee', seekTo: 10 } // example: skip to 0:20