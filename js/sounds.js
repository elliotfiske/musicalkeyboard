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
      console.log("Tried to play non-existant sound: " + name);
      return;  
   }

   sounds[name].stop();
   sounds[name].play();
}

// var test = new buzz.sound("sounds/bassG_middle", { formats: [ "wav" ] });
// test.loop().play();

var loop = new SeamlessLoop();

loop.addUri("sounds/bassG_middle.wav", 329, "test");

function soundsLoaded() {
   loop.start("test");
};

loop.callback(soundsLoaded);