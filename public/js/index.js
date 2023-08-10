const imagesList = document.querySelector("#galleries");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  try {
    const images = await fetchImages();
    showImages(images);
  } catch (error) {
    console.log(error)
  }
});

const showImages = (images) => {
  if (images.length === 0) {
    imagesList.innerHTML = `
          <p>
              <span class="text-center">No hay imagenes aún.</span>
          </p>
      `;
    return;
  }

  categories.forEach((image) => {
    categoriesList.innerHTML += `
                  <span>${image}</span>
              `;
  });
};

const fetchImages = async () => {
  const response = await fetch("http://localhost:4000/api");

  if (response.status === 404) {
    return [];
  }

  const data = response.json();

  return data;
};
