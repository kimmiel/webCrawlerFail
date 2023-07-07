
const feedDisplay = document.querySelector("#feed");

//1 以下把在local:8000/result的资料放到前端
fetch("http://localhost:8000/results")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      const title =`<div><h3>` + element.title + `</h3><p>`+element.url+`</p></div>`; //2 變成html
      feedDisplay.insertAdjacentHTML("beforeend", title); // 2 加到前端
    });
  })
  .catch((err) => console.log(err));
//npm i cors
