
const createProduct = require("../controllers/Products/createProduct")
const deleteProductById = require("../controllers/Products/deleteProductById")
const getProduct = require("../controllers/Products/getProduct")
const getProductById = require("../controllers/Products/getProductById")
const updateProductById = require("../controllers/Products/updateProductById")

const createProductHandler = async (req, res) => {
  const data = req.body;
  try {
    const product = await createProduct(data);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
const deleteProductByIdHandler = async (req, res) => {
  const prodId = req.params.productId; // No es necesario usar await aquí

  try {
    const deletedProduct = await deleteProductById(prodId);
    res.status(200).json(deletedProduct); // Enviar la respuesta como JSON
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
const getProductByIdHandler = async (req, res) => {
  const prodId = req.params.productId; // Debes acceder al parámetro "productId" específico

  try {
    const product = await getProductById(prodId);
    res.status(200).json(product); // Enviar la respuesta como JSON
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
const getProductsHandler = async (req, res) => {
  try {
    const products = await getProduct()
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
const UpdateProductsByIdHandler = async (req, res) => {
  try {
    const productid = req.params.productId; // No es necesario usar await aquí
    const updatedProduct = req.body; // Debes acceder al cuerpo de la solicitud para obtener los datos actualizados
    await updateProductById(productid, updatedProduct); // No necesitas almacenar el resultado de la función

    // Si es necesario, puedes enviar una respuesta vacía con un status 200
    res.status(200).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}



module.exports = {
  getProductsHandler,
  createProductHandler,
  deleteProductByIdHandler,
  getProductByIdHandler,
  UpdateProductsByIdHandler
}