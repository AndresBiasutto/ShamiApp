const getProductCategory= require("../controllers/ProductCategory/getCategory")

  const getCategoriesHandler = async (req, res) => {
    try {
      const categories = await getProductCategory();
      res.status(200).json(categories);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  module.exports={  getCategoriesHandler}