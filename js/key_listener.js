document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup',   onKeyUp, false);

var down_keys = {};
var last_time = 0;

// # of milliseconds since we burned through all the keypresses
var elapsed_ms = 0;
var MS_BETWEEN_BEATS = 100;

var all_loops = [];
var curr_loop = [];
var recording_loop = false;
var curr_loop_start;

var loop_playing_timestart;
var longest_loop_time = 0;

function begin_playing_loops() {
   loop_playing_timestart = Date.now();
   all_loops.forEach(function(loop) {
      loop.forEach(function(step) {
         step.played = false;
      });
   });
}

function play_step(step) {
   activate_instrument(step.key, step.down);
}

function update_loops() {
   var curr_time_offset = Date.now() - loop_playing_timestart;

   for (var loop_ndx = 0; loop_ndx < all_loops.length; loop_ndx++) {
      var loop = all_loops[loop_ndx];

      // Snatch the first unplayed step from this loop.
      var unplayed_steps = loop.filter(function(step) {return !step.played});
      if (unplayed_steps.length > 0) {
         // Grab the first unplayed step
         var next_step = unplayed_steps[0];
         // Check if it's time to play it
         if (next_step.time_offset < curr_time_offset) {
            play_step(next_step);
            unplayed_steps[0].played = true;
         }
      }
   }

   // The longest loop has reset, so begin again!
   if (Date.now() - loop_playing_timestart > longest_loop_time) {
      begin_playing_loops();
   }
}

// Put a key in the "down" array, if it's not there already
function onKeyDown(event) {
   event = event || window.event;
   var key_code = event.keyCode;

   if (!down_keys[key_code]) {
      do_instrument(key_code);
      down_keys[key_code] = true;
   }

   if (key_code == 32) {
      recording_loop = true;
      curr_loop_start = Date.now();
      curr_loop = [];
      curr_loop
   }
}

// Remove a key from the "down" array.
function onKeyUp(event) {
   event = event || window.event;
   var key_code = event.keyCode;

   down_keys[key_code] = false;

   stop_instrument(key_code);

   if (key_code == 32) {
      recording_loop = false;
      all_loops.push(curr_loop);

      if (all_loops.length == 1) {
         begin_playing_loops(); // First loop!
      }

      var new_loop_len = Date.now() - curr_loop_start;
      if (new_loop_len > longest_loop_time) {
         longest_loop_time = new_loop_len;
      }
   }
}

// Stop al previous basses and make the sides wiggle
function do_basswaves(side, stop_me) {
   if (stop_me) {
      // nvm
      return;   
   }

   window.waves_side = side;
   window.waves_dampener = 1.4;

   sounds["bassC"].stop();
   sounds["bassE"].stop();
   sounds["bassG"].stop();
   sounds["bassD"].stop();
}

function do_instrument(key_code) {
   var char_pressed = String.fromCharCode(key_code);
   activate_instrument(char_pressed, false);

   if (recording_loop) {
      var time_offset = Date.now() - curr_loop_start;
      time_offset -= time_offset % 100;
      var new_step = {time_offset: time_offset, key: char_pressed, down: false};
      curr_loop.push(new_step);
   }
}

function stop_instrument(key_code) {
   var char_pressed = String.fromCharCode(key_code);
   activate_instrument(char_pressed, true);

   if (recording_loop) {
      var time_offset = Date.now() - curr_loop_start;
      time_offset -= time_offset % 100;
      var new_step = {time_offset: time_offset, key: char_pressed, down: true};
      curr_loop.push(new_step);
   }
}

function activate_instrument(char_pressed, stop_me) {
   switch (char_pressed) {
      // BASS
      case 'Z':
         do_basswaves(0, stop_me);
         do_sound("bassG", stop_me);
         break;
      case 'X':
         do_basswaves(1, stop_me);
         do_sound("bassE", stop_me);
         break;
      case 'C':
         do_basswaves(2, stop_me);
         do_sound("bassC", stop_me);
         break;
      case 'V':
         do_basswaves(3, stop_me);
         do_sound("bassD", stop_me);
         break;

      // High Percussion
      case 'T':
         do_sound("clickies", stop_me);
         break;
      case 'Y':
         do_sound("doubleclick", stop_me);
         break;
      case 'U':
         do_sound("clap", stop_me);
         break;
      case 'I':
         do_sound("pew", stop_me);
         break;
      case 'O':
         do_sound("tshhh", stop_me);
         break;
      case 'P':
         do_sound("twinklebeep", stop_me);
         break;

      // Thump-low percussion
      case 'B':
         do_sound("test_drum", stop_me);
         break;

      // Lead
      case '1':
         do_sound("leadG1", stop_me);
         cubes[0].bounceTime = 27;
         break;
      case '2':
         do_sound("leadA1", stop_me);
         cubes[1].bounceTime = 27;
         break;
      case '3':
         do_sound("leadB1", stop_me);
         cubes[2].bounceTime = 27;
         break;
      case '4':
         do_sound("leadD1", stop_me);
         cubes[3].bounceTime = 27;
         break;
      case '5':
         do_sound("leadE1", stop_me);
         cubes[4].bounceTime = 27;
         break;
      case '6':
         do_sound("leadG2", stop_me);
         cubes[5].bounceTime = 27;
         break;
      case '7':
         do_sound("leadA2", stop_me);
         cubes[6].bounceTime = 27;
         break;
      case '8':
         do_sound("leadB2", stop_me);
         cubes[7].bounceTime = 27;
         break;
      case '9':
         do_sound("leadD2", stop_me);
         cubes[8].bounceTime = 27;
         break;
      case '0':
         do_sound("leadE2", stop_me);
         cubes[9].bounceTime = 27;
         break;
      case '½':
         do_sound("leadG3", stop_me);
         cubes[10].bounceTime = 27;
         break;
   }
}
