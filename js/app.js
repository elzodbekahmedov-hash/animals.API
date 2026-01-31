const elContainer = document.getElementById("container");
const elLoader = document.getElementById("loader");
const elTemplateSkeleton = document.getElementById("templateSkeleton");
const elTemp = document.getElementById("templateCard");

let state = null

loader(true);
fetch("https://json-api.uz/api/project/game-over/animals")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    ui(res.data);
  })
  .catch(() => { })
  .finally(() => {
    loader(false);
  });

function loader(bool) {
  if (bool) {
    elLoader.innerHTML = null;
    Array.from({ length: 200 }, (_, index) => index).forEach(() => {
      elLoader.appendChild(elTemplateSkeleton.content.cloneNode(true));
    });
  } else {
    elLoader.innerHTML = null;
  }
}

function ui(data) {
  elContainer.innerHTML=""
  data.forEach(element => {
    const clone = elTemp.content.cloneNode(true);
    clone.querySelector("h5").innerText = element.name ? element.name : "No Name";
    clone.querySelector("p").innerText = element.category ? element.category : "No Category";
    clone.querySelector("button").id = "js-delete-button" + element.id;
    clone.querySelector(".js-delete-btn").setAttribute("data-delete-id",element.id)
    clone.querySelector(".js-edit-button").href="/edit.html?id="+element.id
    clone.querySelector(".js-more-btn").href="/info/info.html?id="+element.id
    elContainer.appendChild(clone);
  });
};

elContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("js-delete-btn")) {
    evt.target.disabled = true;
    evt.target.innerHTML = `<svg class="animate-spin w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
</svg>`;
    deleteAnimals(evt.target.getAttribute("data-delete-id"));

  }
 
  if (evt.target.classList.contains("card-body") && evt.target.classList.contains("js-delete-button") === false
  ) {
    window.open(window.location, { target: "blank" });
  }
})
function deleteAnimals(id) {
  fetch("https://json-api.uz/api/project/game-over/animals/" + id, {
    method: "DELETE",headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      
      if(res=="deleted successfully") {
      fetch("https://json-api.uz/api/project/game-over/animals")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    ui(res.data);
  })
  .catch(() => { })
  .finally(() => {
    loader(false);
  });

      } else if(res=="Token expired!") {
        localStorage.removeItem("token");
        window.location.href=window.location.origin+"/login.html";
      }
    })
    .catch(() => {
        localStorage.removeItem("token");
        window.location.href=window.location.origin+"/login.html";})
    .finally(() => { });
}

function stateChanger(value) {
  state = value
  return state
}

elContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("js-edit-button")) {
    evt.target.disabled = true;
    evt.target.innerHTML = `<svg class="animate-spin w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
</svg>`;
    deleteAnimals(evt.target.id);
  }
  })