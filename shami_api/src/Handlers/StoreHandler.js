const getStores= require("../controllers/Stores/GetStores")

const getStoresHandler = async (req, res) => {
    try {
      const Stores = await getStores()
      res.status(200).json(Stores);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  module.exports= {getStoresHandler}