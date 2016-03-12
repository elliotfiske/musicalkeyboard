var mp3_sounds = [
   "cube1",
   "cube2",
   "cube3",
   "cube5",

   "test_drum",
];

var wav_sounds = [
   "hibassE",
   "hibassFsharp",
   "hibassGsharp",
   "hibassB",
   "tenorE",
   "tenorFsharp",
   "tenorGsharp",
   "tenorB",

];

var sounds = {};

// Load MP3s
for (var name in mp3_sounds) {
   var sound_name = mp3_sounds[name];

   sounds[sound_name] = new buzz.sound( "sounds/" + sound_name, {
      formats: [ "mp3" ]
   });
}

// Load WAVs
for (var name in wav_sounds) {
   var sound_name = wav_sounds[name];

   sounds[sound_name] = new buzz.sound( "sounds/" + sound_name, {
      formats: [ "wav" ]
   });
}

function do_sound(name) {
   if (!name in sounds) {
      console.log("Tried to play non-existant sound: " + name);
      return;  
   }

   sounds[name].stop();
   sounds[name].play();
}
