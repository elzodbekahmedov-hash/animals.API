    const elForm = document.getElementById("form");

      elForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const formData = new FormData(elForm);
        const result = {};

        formData.forEach((value, key) => {
          result[key] = value;
        });

        fetch("https://json-api.uz/api/project/game-over/animals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(result),
        }).then((res) => {
          location.href = "/index.html";
        });
      });