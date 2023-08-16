const uploadForm = document.querySelector("#uploadForm");
const btnSubmit = document.querySelector("#btnSubmit");
const spinner = document.querySelector("#spinner");
const image = document.querySelector("#image");
const sending = document.querySelector("#sending");
const validationErrors = document.querySelector("#validationErrors");

const uploadToCloudinary = async (formData) => {
  const response = await fetch("http://localhost:4000/cloudinary/api", {
    method: "POST",
    body: formData,
  });
  const dataCloudinary = await response.json();
  console.log("dataCloudinary");
  console.log(dataCloudinary);
  if (response.status !== 201 && response.status !== 200) {
    validationErrors.innerHTML = `
                  <small class="text-danger">${dataCloudinary.mensaje}</small>
              `;
    btnSubmit.classList.remove("disabled");
    spinner.classList.add("visually-hidden");
    sending.classList.add("visually-hidden");

    return;
  }  
  return dataCloudinary;
};
const uploadToLocal = async (formData) => {
  const response = await fetch("http://localhost:4000/local/api", {
    method: "POST",
    body: formData,
  });
  const dataLocal = await response.json();
  console.log("dataLocal");
  console.log(dataLocal);
  if (response.status !== 201 && response.status !== 200) {
    validationErrors.innerHTML = `
                  <small class="text-danger">${dataLocal.mensaje}</small>
              `;
    btnSubmit.classList.remove("disabled");
    spinner.classList.add("visually-hidden");
    sending.classList.add("visually-hidden");

    return;
  }

  return dataLocal;
};

uploadForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const checkCloudinary = uploadForm.checkCloudinary.checked;
  const checkLocal = uploadForm.checkLocal.checked;
  

  btnSubmit.classList.add("disabled");
  spinner.classList.remove("visually-hidden");
  sending.classList.remove("visually-hidden");

  if (image.files.length == 0) {
    validationErrors.innerHTML = `
                  <small class="text-danger">Tenes que seleccionar una imagen para subirla.</small>
              `;
    btnSubmit.classList.remove("disabled");
    spinner.classList.add("visually-hidden");
    sending.classList.add("visually-hidden");

    return;
  }

  const fd = new FormData();
  fd.append("image", image.files[0]);
  let dataCloudinary;
  let dataLocal;
  try {
    if (checkCloudinary && checkLocal) {
      dataCloudinary = await uploadToCloudinary(fd);
      dataLocal = await uploadToLocal(fd);
    }
    if (checkCloudinary) {
      dataCloudinary = await uploadToCloudinary(fd);
    } else if (checkLocal) {
      dataLocal = await uploadToLocal(fd);
    } else {
      validationErrors.innerHTML = `
                  <small class="text-danger">Seleccioná a que servidor queres subir tu imagen.</small>
              `;
      btnSubmit.classList.remove("disabled");
      spinner.classList.add("visually-hidden");
      sending.classList.add("visually-hidden");
      return;
    }
    console.log(dataCloudinary,dataLocal)
    if (dataCloudinary?.mensaje || dataLocal?.mensaje) {
      btnSubmit.classList.remove("disabled");
      spinner.classList.add("visually-hidden");
      sending.classList.add("visually-hidden");
      validationErrors.innerHTML = `
                    <small class="text-danger">${dataCloudinary.mensaje ?? dataCloudinary.mensaje}</small>
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
