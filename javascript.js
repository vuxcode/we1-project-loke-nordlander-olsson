		//Finds and sets this variable to the assigned id
		var homeAudio = document.querySelector("#home");

		//Lowers the audio by 25%
		homeAudio.volume = 0.55;
		//Function that plays the descriptive sound
		function playHomeAudio() {
			homeAudio.play();
		}
		//Same as above
		var informationAudio = document.querySelector("#information");
		informationAudio.volume = 0.55;
		function playInformationAudio() {
			informationAudio.play();
		}
		//Same as first one
		var contactAudio = document.querySelector("#contact")
		contactAudio.volume = 0.55;
		function playContactAudio() {
			contactAudio.play();
		}

		//Function that checks if the person has visited the website before
		function firstVisitCheck() {
			//If "firstVisit" with value no exists in sessionStorage,
			//triggers return and stops
			//Does not work correctly in IE
			if (sessionStorage.getItem("firstVisit") == "no") {
				//Returns this message
				return "User has returned";
			}
			else {
				//Each of these vars finds the id's associated with those elements
				var ttsError = document.querySelector("#ttsError");
				var ttsPlay = document.querySelector("#play");
				var ttsStop = document.querySelector("#stop");
				//Plays a sound to inform that the user can
				ttsError.play();
				//Tells each style of these elements to not display
				ttsPlay.style.display = "none";
				ttsStop.style.display = "none";
				//Alerts the user that it does not support TTS
				alert("This browser does not support text to speech!");
				//Sets firstvisit and the value no for sessionStorage
				//This is only saved for the current browser session
				sessionStorage.setItem("firstVisit", "no");
			}
		}

		//When the page is loaded, this function is triggered
		onload = function() {
			//If the website supports text-to-speech, it will trigger this
			if ('speechSynthesis' in window) {
				//Outputs in console log that it supports TTS
				console.log("This browser supports text to speech!");
				//Defines this variable with speechsynthesis
				//It means that the computer can translate it into an audible voice
				var speech = speechSynthesis;
				//A variable used so the voice doesn't overlap with itself if clicked multiple times
				var flag = false;

				//Checks for the element with the id of play and stop
				//Stores the information in these variables
				var ttsPlay = document.querySelector("#play");
				var ttsStop = document.querySelector("#stop");

				//Adds events to these variables and connects it to functions
				ttsPlay.addEventListener("click", play);
				ttsStop.addEventListener("click", stop);

				//Function that plays the TTS
				function play() {
					//If flag is false, runs this part of the function
					if (!flag) {
						//Sets the flag variable to true, can't play it twice
						flag = true;
						//Variable that looks at the content of the text inside of the article div
						//and defines it so it can be synthesised into a voice
						talk = new SpeechSynthesisUtterance(document.querySelector(".article").textContent);
						//Changes the voice of the speaker
						//depending on the default voices in the computer
						talk.voice = speech.getVoices()[0];
						//When the talk function ends, sets flag to false
						//and the function can then be used again
						talk.onend = function() {
							flag = false;
						};
						//Defines this variable as a speech synthesiser
						information = new SpeechSynthesisUtterance();
						//Defines what text the information variable contains
						information.text = "The following text is read from top to bottom.";
						//Creates a new variable that defines the variable as a "voice gatherer"
						var voices = window.speechSynthesis.getVoices();
						//Sets the voice of the information variable to the first default
						//In this case it is zero
						information.voice = voices[0];
						//Synthesises the voice inside of the window and tells information
						window.speechSynthesis.speak(information);
						//When the information variable ends its speech,
						//triggers the speech variable to speak with the talk variable
						information.onend = speech.speak(talk);
					}
					//If the text is already being read then it triggers this
					else {
						console.log("The text is already being read.");
					}
				}

				//Function to stop the speaker from talking
				function stop() {
					//If the speaker is talking, triggers this
					if (speech.speaking) {
						//Sets the flag to false
						flag = false;
						//Cancels the speech
						speech.cancel();
					}
				}
			}
			//If TTS isn't functional in the browser then it alerts the user
			//I've tried using localStorage and cookies to not make it appear twice
			else {
				firstVisitCheck();
			}
		}