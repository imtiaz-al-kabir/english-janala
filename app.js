const createElements = (arr) => {
  const htmlEl = arr.map(
    (el) => `<span class="btn bg-[#edf7ff] px-3 mr-2">${el} </span>`
  );
  return htmlEl.join(" ");
};

const name = ["imtiaz", "al", "kabir"];
createElements(name);

const loadLessons = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  const response = await fetch(url);
  const convertJson = await response.json();
  displayLessons(convertJson.data);
};

// const loadWorldLevel = async () => {
//   const ul = "https://openapi.programming-hero.com/api/level/5";
//   const response = await fetch(ul);
//   const jsonConvert = await response.json();
//   displayWordLevel(jsonConvert);
// };

const loadDetails = async (id) => {
  const ul = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(ul);
  const details = await response.json();
  displayLoadDetails(details.data);
};

const displayLoadDetails = (word) => {
  console.log(word);
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
    
    <div>
            <h2 class="font-bold text-2xl">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${
    word.pronunciation
  })
            </h2>
          </div>
          <div>
            <h2 class="font-semibold text-lg">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div>
            <h2 class="font-semibold text-lg">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div>
            <h2 class="font-medium text-lg bangla pb-3">সমার্থক শব্দ গুলো</h2>
             <div>
             ${createElements(word.synonyms)}
          </div>
          </div>
    
    `;
  document.getElementById("modal_details").showModal();
};

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};

const loadWorldLevel = async (id) => {
  const ul = `https://openapi.programming-hero.com/api/level/${id}`;
  const response = await fetch(ul);
  const jsonConvert = await response.json();

  removeActive();
  const clickBtn = document.getElementById(`lesson-btn-${id}`);
  clickBtn.classList.add("active");
  displayWordLevel(jsonConvert.data);
};
const displayWordLevel = (word) => {
  const wordContainer = document.getElementById("word-Container");
  wordContainer.innerHTML = "";
  if (word.length == 0) {
    wordContainer.innerHTML = `<div class="col-span-full py-20">
    <img class="mx-auto" src="./assets/alert-error.png" alt="" />
        <p class="text-[#79716B] mb-5 bangla">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h1 class="text-[#292524] text-4xl bangla">নেক্সট Lesson এ যান</h1>
      </div>`;
  }
  word.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = ` <div class="bg-white rounded-lg py-10 space-y-5">
        <h2 class="font-bold text-3xl">${word.word}</h2>
        <p class="text-lg">Meaning /Pronounciation</p>
        <h1 class="text-3xl font-semibold bangla">${word.meaning} / ${word.pronunciation}</h1>
        <div class="flex justify-between p-5">
          <button onclick="loadDetails(${word.id})" class="btn bg-[#e8f4ff] p-2 rounded-lg hover:bg-primary">
            <i class="fa-solid fa-circle-question"></i>
          </button>
          <button class="btn bg-[#e8f4ff] p-2 rounded-lg hover:bg-primary">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div> `;
    wordContainer.append(wordDiv);
  });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");

  for (const lesson of lessons) {
    console.log(lesson);
    const lesnDiv = document.createElement("div");
    lesnDiv.innerHTML = ` <button id="lesson-btn-${lesson.level_no}" onclick="loadWorldLevel(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" >
      <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
    </button>`;
    levelContainer.append(lesnDiv);
  }
};
loadLessons();
