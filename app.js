const loadLessons = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  const response = await fetch(url);
  const convertJson = await response.json();
  displayLessons(convertJson.data);
};

const displayLessons = (lessons) => {
  console.log(lessons);
  const levelContainer = document.getElementById("level-container");
  for (const lesson of lessons) {
    console.log(lesson);
    const lesnDiv = document.createElement("div");
    lesnDiv.innerHTML = ` <button class="btn btn-outline btn-primary">
      <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
    </button>`;
    levelContainer.append(lesnDiv);
  }
};
loadLessons();
