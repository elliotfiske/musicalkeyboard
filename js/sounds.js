var mp3_sounds = [
   "test_drum",
   "clickies",
   "clap",
   "doubleclick",
   "pew",
   "tshhh",
   "twinklebeep",
   "metro_hi",
   "metro_lo",

   "bassC",
   "bassD",
   "bassE",
   "bassG",

      
   "leadG1",
   "leadA1",
   "leadB1",
   "leadD1",
   "leadE1",
   "leadG2",
   "leadA2",
   "leadB2",
   "leadD2",
   "leadE2",
   "leadG3",
];

var lead_sounds = [
   "leadG1",
   "leadA1",
   "leadB1",
   "leadD1",
   "leadE1",
   "leadG2",
   "leadA2",
   "leadB2",
   "leadD2",
   "leadE2",
   "leadG3",

   "marimba/lead_c",
   "marimba/lead_d",
   "marimba/lead_e",
   "marimba/lead_f",
   "marimba/lead_g",
   "marimba/lead_a",
   "marimba/lead_b",
   "marimba/lead_c1",
   "marimba/lead_d1",
   "marimba/lead_e1",
]


var sounds = {};

// Load MP3s
for (var name in mp3_sounds) {
   var sound_name = mp3_sounds[name];

   sounds[sound_name] = new buzz.sound( "sounds/" + sound_name, {
      formats: [ "mp3" ]
   });
}

// Load "lead" sounds (they are interruptable)
for (var name in lead_sounds) {
   var sound_name = lead_sounds[name];

   sounds[sound_name] = new buzz.sound( "sounds/" + sound_name, {
      formats: [ "mp3" ]
   });
   sounds[sound_name].interruptable = true;
}

function do_sound(name, stop_me) {
   if (!name in sounds) {
      console.warn("Tried to play non-existant sound: " + name);
      return;  
   }

   if (sounds[name].interruptable && stop_me) {
      sounds[name].stop();
      return;
   }

   if (stop_me) {
      // Do nothing, u stopped boiii
   }
   else {
      sounds[name].stop();
      sounds[name].play();
   }
}