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

function do_basswaves(side) {
   window.waves_side = side;
   window.waves_dampener = 1.4;

   sounds["bassC"].stop();
   sounds["bassE"].stop();
   sounds["bassG"].stop();
   sounds["bassD"].stop();
}

function do_instrument(key_code) {
   var char_pressed = String.fromCharCode(key_code);

   switch (char_pressed) {
      // BASS
      case 'Z':
         do_basswaves(0);
         do_sound("bassG");
         break;
      case 'X':
         do_basswaves(1);
         do_sound("bassE");
         break;
      case 'C':
         do_basswaves(2);
         do_sound("bassC");
         break;
      case 'V':
         do_basswaves(3);
         do_sound("bassD");
         break;

      // Percussion
      case 'B':
         do_sound("test_drum");
         break;

      // Lead
      case '1':
         do_sound("leadG1");
         break;
      case '2':
         break;
      case '3':
         break;
      case '4':
         break;
      case '5':
         break;
      case '6':
         break;
      case '7':
         break;
      case '8':
         break;
      case '9':
         break;
      case '0':
         break;
      case '-':
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
