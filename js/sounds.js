var mp3_sounds = [
   "cube1",
   "cube2",
   "cube3",
   "cube5",

   "test_drum",
   "clickies",
   "clap",
   "doubleclick",
   "pew",
   "tshh",
   "twinklebeep",

   "bassC",
   "bassD",
   "bassE",
   "bassG",

   "leadG1",
   "leadG2",
   "leadG3",

   "leadE1",
   "leadE2",

];


var sounds = {};

// Load MP3s
for (var name in mp3_sounds) {
   var sound_name = mp3_sounds[name];

   sounds[sound_name] = new buzz.sound( "sounds/" + sound_name, {
      formats: [ "mp3" ]
   });
}

function do_sound(name) {
   if (!name in sounds) {
      console.warn("Tried to play non-existant sound: " + name);
      return;  
   }

   sounds[name].stop();
   sounds[name].play();
}