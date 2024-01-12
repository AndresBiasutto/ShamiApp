const Role= require("../models/Role");
const Category= require("../models/ProductCategory");
const Store= require("../models/Stores")

const createRoles= async ()=>{
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return

        const values = await Promise.all([
            new Role({name: "user"}).save(),
            new Role({name: "moderator"}).save(),
            new Role({name: "admin"}).save(),
            new Role({name: "manager"}).save(),
            new Role({name: "supervisor"}).save(),
            new Role({name: "factory"}).save(),
        ])
        console.log(values);
    } catch (error) {
        console.log(error);
    }
}
const CreateCategories= async ()=>{
    try {
        const count = await Store.estimatedDocumentCount();
        if (count > 0) return

        const values = await Promise.all([
            new Store({name: "Shami Carrefour", address: "Av. del Libertador 215, B1638 Vicente López, Provincia de Buenos Aires"}).save(),
            new Store({name: "Shami Unicenter", address: "Paraná 3745, B1640FRC Martínez, Provincia de Buenos Aires"}).save(),
        ])
        console.log(values);
    } catch (error) {
        console.log(error);
    }
}
const CreateStores= async ()=>{
    try {
        const count = await Category.estimatedDocumentCount();
        if (count > 0) return

        const values = await Promise.all([
            new Category({name: "empanadas"}).save(),
            new Category({name: "postres"}).save(),
            new Category({name: "salsas"}).save(),
            new Category({name: "shawarma"}).save(),
            new Category({name: "descartables"}).save(),
            new Category({name: "varios"}).save(),
            new Category({name: "cremas"}).save(),
        ])
        console.log(values);
    } catch (error) {
        console.log(error);
    }
}

module.exports={createRoles, CreateCategories, CreateStores}