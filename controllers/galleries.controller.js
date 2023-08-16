


//VISTAS
const indexView = (_req, res) => {
    res.render("galleries/index", { mensaje: "" });
  };
  
  const createView = (_req, res) => {
    res.render("galleries/create");
  };
  

  
export {
    indexView,
    createView
  };
  