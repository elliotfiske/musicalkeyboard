document.addEventListener('keydown', onKeyDown, false);

var pending_keys = [];
var last_time = 0;

// # of milliseconds since we burned through all the keypresses
var elapsed_ms = 0;

var MS_BETWEEN_BEATS = 100;

function onKeyDown(event) {
   event = event || window.event;
   var key_code = event.keyCode;

   pending_keys.push(key_code);
}

function processPendingKeys() {
	var curr_time = new Date().getTime();
	elapsed_ms += (curr_time - last_time);

	if (elapsed_ms > MS_BETWEEN_BEATS) {
		for (var i = 0; i < pending_keys.length; i++) {
			doInstrument(pending_keys[i]);
		}

		elapsed_ms = 0;
		pending_keys = [];
	}

	last_time = curr_time;
}

function doInstrument(key_code) {
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
