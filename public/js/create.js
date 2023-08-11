const uploadForm = document.querySelector("#uploadForm");
const btnSubmit = document.querySelector("#btnSubmit");
const spinner = document.querySelector("#spinner");
const image = document.querySelector("#image");
const validationErrors = document.querySelector("#validationErrors");

uploadForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  btnSubmit.classList.add("disabled");
  spinner.classList.remove("visually-hidden");

  const fd = new FormData();
  fd.append("image", image.files[0]);

  try {
    const response = await fetch("http://localhost:4000/api", {
      method: "POST",
      body: fd,
    });

    const data = await response.json();

    if (response.status !== 201 && response.status !== 200) {
      validationErrors.innerHTML = `
                <small class="text-danger">${data.mensaje}</small>
            `;
      btnSubmit.classList.remove("disabled");
      spinner.classList.add("visually-hidden");

      return;
    }

    if (data.mensaje) {
      btnSubmit.classList.remove("disabled");
      spinner.classList.add("visually-hidden");
      validationErrors.innerHTML = `
                <small class="text-danger">${data.mensaje}</small>
            `;

      return;
    }

    validationErrors.innerHTML = ``;

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
  }
});
