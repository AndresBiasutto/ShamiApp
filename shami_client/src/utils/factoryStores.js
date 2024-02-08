const filterUniqueStores = (orders) => {
    const stores = {};
    return orders.filter((item) => {
      if (stores[item.store]) {
        return false;
      } else {
        stores[item.store] = true;
        return true;
      }
    });
  };

  export default filterUniqueStores;