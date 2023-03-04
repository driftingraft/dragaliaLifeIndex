let container = document.querySelector(".comics");
let comicObject;
let comicArray;
let currentComic = 1;
const params = new URLSearchParams(window.location.search);
let lan = "jp";
if (params.get("lan")) {
  lan = params.get("lan");
}

async function init() {
  await fetch("./comics.json")
    .then((response) => {
      return response.json();
    })
    .then((output) => {
      comicObject = output;
      return (comicArray = Object.keys(output).sort(function (a, b) {
        return Number(a) - Number(b);
      }));
    });
  loadCard();
  let navHTML =
    "<a href='../index.html?lan=" +
    lan +
    "'> ドラガリまんが・まとめ</a> | <form action='comic.html'><input type='number' name='no' placeholder='話数を入力' pattern='[0-9]+'><input type='hidden' name='lan' value='" +
    lan +
    "'></form>";
  document.querySelector(".top").innerHTML =
    navHTML + document.querySelector(".top").innerHTML;

  let localOutput =
    '<a href="index.html?lan=en" ' +
    `${lan == "en" ? 'class="selected"' : "class"}` +
    '>ENG</a> <a href="index.html?lan=jp" ' +
    `${lan == "jp" ? 'class="selected"' : "class"}` +
    '>日本語</a> <a href="index.html?lan=chs" ' +
    `${lan == "chs" ? 'class="selected"' : "class"}` +
    '>简</a> <a href="index.html?lan=cht" ' +
    `${lan == "cht" ? 'class="selected"' : "class"}` +
    "> 繁</a>";
  document.querySelector(".top .local").innerHTML += localOutput;
  document.querySelector("li.local").innerHTML += localOutput;
}
function loadCard(numCards = 24) {
  for (i = 0; i < numCards; i++) {
    if (currentComic > Math.max(comicArray[comicArray.length - 1])) {
      break;
    }
    let targetLocal = lan + "Name";
    let numb = currentComic - 1;
    console.log();
    let imgSrc = comicArray[numb] + ".png";
    let outputHTML =
      "<a class='card comicCard' href='comic.html?no=" +
      comicArray[currentComic - 1] +
      "&lan=" +
      lan +
      "'><div><div class='comicNumb'>" +
      comicArray[currentComic - 1] +
      "</div><img class='thumb' src='thumb/" +
      imgSrc +
      "'><div class='comicName'>" +
      comicObject[comicArray[numb]][targetLocal] +
      " </div></div></a>\n";
    container.innerHTML += outputHTML;
    currentComic += 1;
  }
}
init();
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 1
  ) {
    loadCard();
  }
});
