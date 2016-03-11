var NAMES = [
   "cube1",
   "cube2",
   "cube3",
   "cube5",
   "bassE"
];

var sounds = {};

for (var name in NAMES) {
   var sound_name = NAMES[name];

   sounds[sound_name] = new buzz.sound( "sounds/" + sound_name, {
      formats: [ "mp3" ]
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
