document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup',   onKeyUp, false);

var down_keys = {};
var last_time = 0;

// # of milliseconds since we burned through all the keypresses
var elapsed_ms = 0;
var MS_BETWEEN_BEATS = 100;

// Put a key in the "down" array, if it's not there already
function onKeyDown(event) {
   event = event || window.event;
   var key_code = event.keyCode;

   if (!down_keys[key_code]) {
      do_instrument(key_code);
      down_keys[key_code] = true;
   }
}

// Remove a key from the "down" array.
function onKeyUp(event) {
   event = event || window.event;
   var key_code = event.keyCode;

   down_keys[key_code] = false;
}

function do_instrument(key_code) {
   var char_pressed = String.fromCharCode(key_code);

   switch (char_pressed) {
      // BASS
      case 'Z':
         do_sound("tenorB");
         window.waves_side = 0;
         window.waves_dampener = 1;
         break;
      case 'X':
         do_sound("tenorGsharp");
         window.waves_side = 1;
         window.waves_dampener = 1;
         break;
      case 'C':
         do_sound("tenorE");
         window.waves_side = 2;
         window.waves_dampener = 1;
         break;
      case 'V':
         do_sound("tenorFsharp");
         window.waves_side = 3;
         window.waves_dampener = 1;
         break;
      case 'Q':
         do_sound("test_drum");
         break;
   }
   if (key_code == 65) { // a
     cube1.bounceTime = 27;
     do_sound("cube1");
   } else if (key_code == 83) { // s
     cube2.bounceTime = 27;
     do_sound("cube2");
   } else if (key_code == 68) { // d
     cube3.bounceTime = 27;
     do_sound("cube3");
   } else if (key_code == 70) { // f
     cube4.bounceTime = 27;
     do_sound("cube5");
  }
}
