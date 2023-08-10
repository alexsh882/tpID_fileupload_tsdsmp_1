const imagesLocal = document.querySelector("#galeriaLocal");
const imagesRemota = document.querySelector("#galeriaRemota");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  try {
    const images = await fetchImages();
    showImages(images);
  } catch (error) {
    console.log(error);
  }
});

const showImages = (images) => {
  if (images.length === 0) {
    imagesLocal.innerHTML = `
          <p>
              <span class="text-center">No hay imagenes aún.</span>
          </p>
      `;
    return;
  }

  images.forEach((image) => {
    console.log(image);
    imagesLocal.innerHTML += `
            <figure class="figure col-3">
              <img src="http://localhost:4000/api/${image.id}/show" class="figure-img img-fluid rounded" alt="...">
              <figcaption class="figure-caption text-end">Imagen Local</figcaption>
            </figure>
              `;
    imagesRemota.innerHTML += `
              <figure class="figure col-3">
                <img src="${image.url}" class="figure-img img-fluid rounded" alt="...">
                <figcaption class="figure-caption text-end">Imagen Alojada en Cloudinary</figcaption>
              </figure>
                `;
  });
};

const fetchImages = async () => {
  const response = await fetch("http://localhost:4000/api");

  if (response.status === 404) {
    return [];
  }

  const data = await response.json();
  console.log(data);
  return data;
};
