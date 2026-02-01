    const elForm = document.getElementById("form");

      elForm.addEventListener("Submit", (evt) => {
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




  
  // const elForm = document.getElementById("form");

  // elForm.addEventListener("Submit", async (evt) => {
  //   evt.preventDefault();

  //   const formData = new FormData(elForm);
  //   const result = Object.fromEntries(formData.entries());

  //   result.isWild = elForm.elements.isWild.checked;

  //   result.speed = Number(result.speed);
  //   result.year = Number(result.year);
  //   result.weight = Number(result.weight);

  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("Token topilmadi. Login qiling.");
  //     location.href = "/login.html";
  //     return;
  //   }

  //   const res = await fetch("https://json-api.uz/api/project/game-over/animals", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //     body: JSON.stringify(result),
  //   });

  //   if (!res.ok) {
  //     const err = await res.json().catch(() => ({}));
  //     alert(err?.message || "Xatolik: ma'lumot yuborilmadi");
  //     return;
  //   }

  //   location.href = "/index.html";
  // });

