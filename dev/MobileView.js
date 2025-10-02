<script>
	window.onload = function () {
		let myInterval = null;
		// document.getElementById("btn-map").click();
		if (navigator.userAgent.indexOf("Mac") != -1) {
			console.log("Loading x3d file for mac");
			shapeSwitch(0, '');
			myInterval = setInterval(function () {
				playVideoAfterSomeTime("tp__MT");
			}, 200);

		}
		if (navigator.userAgent.indexOf("Android") != -1) {
			console.log("Loading x3d file for android");
			shapeSwitch(7, '');
			myInterval = setInterval(function () {
				playVideoAfterSomeTime("tp_android__MT");
			}, 200);
		}

		function playVideoAfterSomeTime(movieTextureId) {
			let video = document.getElementById(movieTextureId)._x3domNode._video;
			console.log("half a second later");

			if (video != null) {
				if (video.readyState === 4) {
					document.getElementById("play").addEventListener('click', togglePlay(video));
					video.setAttribute('autoplay', 'false');
					video.pause();
					video.setAttribute('playsinline', 'true');
					video.setAttribute('muted', 'true');
					clearInterval(myInterval);
				}
			}
		}
	};


</script>

<script>

	/* function added by sheeban for reference */
	function handleOrientation(event) {
		updateFieldIfNotNull('Orientation_a', event.alpha);
		updateFieldIfNotNull('Orientation_b', event.beta);
		updateFieldIfNotNull('Orientation_g', event.gamma);

		incrementEventCount();

		var V = document.getElementById('vp');
		var degtorad = Math.PI / 180; // Degree-to-Radian conversion

		// if the alpha beta gamma in degrees give them radians

		var a = event.alpha * degtorad;
		var b = event.beta * degtorad;
		var c = event.gamma * degtorad;

		var q1 = x3dom.fields.Quaternion.prototype.setFromEuler(c, b, a)

		var vector = new x3dom.fields.SFVec3f(1, 0, 0)
		var newmat = x3dom.fields.Quaternion.axisAngle(vector, -1.578)
		var m = newmat.toMatrix()
		newmat.setValue(m)
		var q2 = newmat.multiply(q1)
		var r = q2.toAxisAngle();

		V.setAttribute('orientation', r[0].x + ' ' + r[0].y + ' ' + r[0].z + ' ' + r[1])

	}


	function incrementEventCount() {
		let counterElement = document.getElementById("num-observed-events")
		let eventCount = parseInt(counterElement.innerHTML)
		counterElement.innerHTML = (eventCount + 1); //truncated the change here
	}

	// can tweak this function to get less precision
	function updateFieldIfNotNull(fieldName, value, precision = 1) {
		if (value != null)
			document.getElementById(fieldName).innerHTML = value.toFixed(precision);
	}

	function handleMotion(event) {
		updateFieldIfNotNull('Accelerometer_gx', event.accelerationIncludingGravity.x);
		updateFieldIfNotNull('Accelerometer_gy', event.accelerationIncludingGravity.y);
		updateFieldIfNotNull('Accelerometer_gz', event.accelerationIncludingGravity.z);

		updateFieldIfNotNull('Accelerometer_x', event.acceleration.x);
		updateFieldIfNotNull('Accelerometer_y', event.acceleration.y);
		updateFieldIfNotNull('Accelerometer_z', event.acceleration.z);

		updateFieldIfNotNull('Accelerometer_i', event.interval, 2);

		// need to get rid of this code Gyroscope_z is not reffering
		updateFieldIfNotNull('Gyroscope_z', event.rotationRate.alpha);
		updateFieldIfNotNull('Gyroscope_y', event.rotationRate.beta);
		updateFieldIfNotNull('Gyroscope_x', event.rotationRate.gamma);//changes made here z=alpha, y=beta, x = gamma
		updateFieldIfNotNull('Gyroscope_x', event.rotationRate.x);
		updateFieldIfNotNull('Gyroscope_x', event.rotationRate.y);
		updateFieldIfNotNull('Gyroscope_x', event.rotationRate.z);
		updateFieldIfNotNull('Gyroscope_x', event.rotationRate.w);

		incrementEventCount();

	}

	let is_running = false;
	let demo_button = document.getElementById("start_demo");
	demo_button.onclick = function (e) {
		document.getElementById('x3dElement').scrollIntoView();
		e.preventDefault();

		//Request permission for iOS 13+ devices
		if (
			DeviceMotionEvent &&
			typeof DeviceMotionEvent.requestPermission === "function"
		) {
			DeviceMotionEvent.requestPermission();
		}

		if (is_running) {
			window.removeEventListener("devicemotion", handleMotion);
			window.removeEventListener("deviceorientation", handleOrientation);
			demo_button.innerHTML = "Start";
			is_running = false;
		} else {
			window.addEventListener("devicemotion", handleMotion);
			window.addEventListener("deviceorientation", handleOrientation);
			document.getElementById("start_demo").innerHTML = "Stop";
			is_running = true;
		}
	};
</script>


	<div id="buttons">

			<button id="start_demo" class="btn-header"><a class="btn btn-lg btn-success py-1" href="#"
					role="button">Mobile</a></button>
		</div>
