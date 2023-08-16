const imagesLocalContainer = document.querySelector("#galeriaLocal");
const imagesRemota = document.querySelector("#galeriaRemota");
const alertBanner = document.querySelector("#alertBanner");
const bannerMessage = document.querySelector("#bannerMessage");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  try {
    const imagesLocal = await fetchImagesLocal();
    const imagesCloudinary = await fetchImagesCloudinary();
    showImagesLocal(imagesLocal);
    showImagesClodinary(imagesCloudinary);
  } catch (error) {
    console.log(error);
  }
});

const showImagesLocal = (images) => {
  if (images.length === 0) {
    imagesLocalContainer.innerHTML = `
          <p>
              <span class="text-center">No hay imagenes locales aún.</span>
          </p>
      `;
    return;
  }

  images.forEach((image) => {
    imagesLocalContainer.innerHTML += `
              <figure id="${image.id}" class="figure col-3">
                <input type="button" onclick="deleteImageLocal(${image.id})" value="x" class="btn btn-danger btn-sm position-absolute">X</input>
                <img src="local/api/${image.id}/show" class="figure-img img-fluid rounded" alt="...">
                <figcaption class="figure-caption text-end">Imagen Alojada en Almacenamiento Local</figcaption>
              </figure>
                `;
  });
};

const showImagesClodinary = (images) => {
  if (images.length === 0) {
    imagesRemota.innerHTML = `
          <p>
              <span class="text-center">No hay imagenes en cloudinary aún.</span>
          </p>
      `;
    return;
  }

  images.forEach((image) => {
    imagesRemota.innerHTML += `
              <figure id="${image.id}-rm" class="figure col-3">
                <input type="button" onclick="deleteImageCloudinary(${image.id})" value="x" class="btn btn-danger btn-sm position-absolute">X</input>
                <img src="${image.url}" class="figure-img img-fluid rounded" alt="...">
                <figcaption class="figure-caption text-end">Imagen Alojada en Cloudinary</figcaption>
              </figure>
                `;
  });
};

const deleteImageCloudinary = async (id) => {
  const response = await fetch(
    `http://localhost:4000/cloudinary/api/${id}/destroy`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    bannerMessage.innerHTML = data.success;
    alertBanner.classList.add("show");
    const lmgremote = document.getElementById(`${id}-rm`);
    imagesRemota.removeChild(lmgremote);
  } else {
    bannerMessage.innerHTML = data.message;
    alertBanner.classList.add("show");
  }

  setTimeout(() => {
    alertBanner.classList.remove("show");
  }, 2000);
};

const deleteImageLocal = async (id) => {
  const response = await fetch(
    `http://localhost:4000/local/api/${id}/destroy`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();
  if (response.status === 200) {
    bannerMessage.innerHTML = data.success;
    alertBanner.classList.add("show");
    const imglocal = document.getElementById(`${id}`);
    imagesLocalContainer.removeChild(imglocal);
  } else {
    bannerMessage.innerHTML = data.message;
    alertBanner.classList.add("show");
  }

  setTimeout(() => {
    alertBanner.classList.remove("show");
  }, 2000);
};

const fetchImagesLocal = async () => {
  const response = await fetch("http://localhost:4000/local/api");

  const data = await response.json();

  if (data.status === 404) {
    return [];
  }

  console.log(data);
  return data;
  
};

const fetchImagesCloudinary = async () => {
  const response = await fetch("http://localhost:4000/cloudinary/api");

  const data = await response.json();

  if (data.status === 404) {
    return [];
  }
  
  return data;
};
