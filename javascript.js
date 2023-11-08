const searchForm = document.querySelector("#search-form");
const inputList = document.querySelector(".inputs");
const createInputElement = (inp) => {
  const queryDiv = document.createElement("div");
  queryDiv.classList.add("inp");

  const newQueries = document.createElement("li");
  newQueries.textContent = inp;
  newQueries.classList.add("input");

  queryDiv.appendChild(newQueries);
  return queryDiv;
};
const SpeechRecognition = window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  const micButton = searchForm.querySelector("button");
  const micIcon = micButton.firstElementChild;

  micButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (micIcon.classList.contains("fa-microphone")) {
      recognition.start();
    } else {
      recognition.stop();
    }
  });

  recognition.addEventListener("start", (e) => {
    console.log("Start Speech Recognition");
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
  });

  recognition.addEventListener("end", (e) => {
    console.log("Stop Speech Recognition");
    micIcon.classList.add("fa-microphone");
    micIcon.classList.remove("fa-microphone-slash");
  });

  recognition.addEventListener("result", (e) => {
    const detectedText = e.results[e.resultIndex][0].transcript;

    const temp = createInputElement(detectedText);
    inputList.appendChild(temp);
    // console.log(instruction);
  });
} else {
  const button = searchForm.querySelector("button");
  button.remove();
  console.log("Speech Recognition Not Supported");
}
const inps = inputList.children;
for (let i = 0; i < inps.length; i++) {
  inps[i].style.display = "grid";
}
