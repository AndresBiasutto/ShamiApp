import styles from "./SolicitarPedido.module.css";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const REGISTER_URL = "/order";

import { useEffect, useState } from "react";

const SolicitarPedido = () => {
  const { setOrder } = useAuth();
  const [fechaEnvio, setFechaEnvio] = useState("");
  const [category, setCategory] = useState("");
  const [formulario, setFormulario] = useState({
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const setDate = () => {
      const fechaActual = new Date();
      const day = fechaActual.getDate();
      const month = fechaActual.getMonth() + 1;
      const year = fechaActual.getFullYear();
      const dateOptions = { weekday: "long" };
      const dayName = fechaActual.toLocaleDateString("es-ES", dateOptions);
      const date = `${dayName} ${day}/${month}/${year}`;

      setFechaEnvio(date);
      setFormulario({
        ...formulario,
        sendDate: date,
      });
    };

    setDate();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = (await axios.get("/products")).data;

        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormulario({
      ...formulario,
      date: fechaEnvio,
    });
    setOrder(formulario);
    console.log(formulario);
    try {
      const newOrder = {
        ternera: formulario.ternera,
        cordero: formulario.cordero,
        pollo: formulario.pollo,
        mutabal: formulario.mutabal,
        homus: formulario.homus,
        empanadascarne: formulario.empanadascarne,
        empanadasqueso: formulario.empanadasqueso,
        empanadaspicante: formulario.empanadaspicante,
        empanadasverdura: formulario.empanadasverdura,
        kepefrito: formulario.kepefrito,
        kepeasado: formulario.kepeasado,
        lahmuyin: formulario.lahmuyin,
        yabras: formulario.yabras,
        mayonesaajo: formulario.mayonesaajo,
        yogurt: formulario.yogurt,
        salsapicante: formulario.salsapicante,
        granada: formulario.granada,
        mamulnuez: formulario.mamulnuez,
        mamulcoco: formulario.mamulcoco,
        mamuldatiles: formulario.mamuldatiles,
        baklawa: formulario.baklawa,
        kadaef: formulario.kadaef,
        namura: formulario.namura,
        cesamob: formulario.cesamob,
        cesamon: formulario.cesamon,
        queso: formulario.queso,
        aceiteoliva: formulario.aceiteoliva,
        aceitegirasol: formulario.aceitegirasol,
        nueces: formulario.nueces,
        aceitunas: formulario.aceitunas,
        papelshawarma: formulario.papelshawarma,
        potecremas: formulario.potecremas,
        servilletas: formulario.servilletas,
        potesalsas: formulario.potesalsas,
        potedulces: formulario.potedulces,
        bolsachicas: formulario.bolsachicas,
        bolsasgrandes: formulario.bolsasgrandes,
        bandejaschicas: formulario.bandejaschicas,
        bandejasmedianas: formulario.bandejasmedianas,
        bandejasgrandes: formulario.bandejasgrandes,
        guantes: formulario.guantes,
        pita: formulario.pita,
        pan: formulario.pan,
        grasa: formulario.grasa,
        trigo: formulario.trigo,
        falafel: formulario.falafel,
        sendDate: formulario.sendDate,
      };
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(newOrder),
        {
          headers: { "Content-Type": "application/json" },
          credentials: "true",
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredProducts = category
  ? products.filter((product) => product.category.name === category)
  : products;

  return (
    <section className={styles.sp}>
       <label htmlFor="category"></label>
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">selecciona una categoria</option>
        <option value="shawarma">Carne Shawarma</option>
        <option value="cremas">cremas</option>
        <option value="empanadas">empanadas</option>
        <option value="postres">postres</option>
        <option value="descartables">descartables</option>
        <option value="salsas">salsas</option>
        <option value="semillasyfiambres">semillas y fiambres</option>
        <option value="varios">varios</option>
      </select> 

      <form onSubmit={handleSubmit}>
        { category !== "" && filteredProducts.map((product, i) => {
            return (
              <div key={i} className={styles.card}>
                <label htmlFor={product.name}>{product.name}:</label>
                <input
                  type="number"
                  name={product.name}
                  min={0}
                  value={formulario[product.name]} 
                  onChange={handleInputChange}
                />
                <p>{product.storageCapacity}</p>
              </div>
            );
          })}

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default SolicitarPedido;

// import axios from "../../api/axios";
// const GET_PRODUCTS_URL = "/products";
// const [fechaEnvio, setFechaEnvio] = useState("");
// useEffect(() => {
//   let isMounted = true;

//   const getProducts = async () => {
//     try {
//       const response = await axios.get(GET_PRODUCTS_URL);
//       isMounted && setProduct(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   getProducts();
//   return () => {
//     isMounted = false;
//   };
// }, [setProduct]);

// useEffect(() => {
//   console.log(products);
// }, [products]);
/* {category === "shawarma" && (
          <div>
            <label htmlFor="ternera">ternera kg:</label>
            <input
              type="number"
              name="ternera"
              min={0}
              value={formulario.ternera}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="cordero">cordero kg:</label>
            <input
              type="number"
              name="cordero"
              min={0}
              value={formulario.cordero}
              onChange={handleInputChange}
            />

            <br />
            <label htmlFor="pollo">pollo kg:</label>
            <input
              type="number"
              name="pollo"
              min={0}
              value={formulario.pollo}
              onChange={handleInputChange}
            />
          </div>
        )}

        <br />
        {category === "empanadas" && (
          <div>
            <label htmlFor="empanadascarne">
              empanadas de carne cajon de 45u.
            </label>
            <input
              type="number"
              name="empanadascarne"
              min={0}
              value={formulario.empanadascarne}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="empanadasqueso">
              empanadas de queso cajon de 45u.
            </label>
            <input
              type="number"
              name="empanadasqueso"
              min={0}
              value={formulario.empanadasqueso}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="empanadaspicante">
              empanadas picantes cajon de 45u.
            </label>
            <input
              type="number"
              name="empanadaspicante"
              min={0}
              value={formulario.empanadaspicante}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="empanadasverdura">
              empanadas de verdura cajon de 45u.
            </label>
            <input
              type="number"
              name="empanadasverdura"
              min={0}
              value={formulario.empanadasverdura}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="lahmuyin">lahmuyin cajon de 40u.</label>
            <input
              type="number"
              name="lahmuyin"
              min={0}
              value={formulario.lahmuyin}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="kepeasado">bandeja kepe asado de 8u</label>
            <input
              type="number"
              name="kepeasado"
              min={0}
              value={formulario.kepeasado}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="kepefrito">bandeja kepe frito de 8u</label>
            <input
              type="number"
              name="kepefrito"
              min={0}
              value={formulario.kepefrito}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="yabras">yabras cajon de 30u</label>
            <input
              type="number"
              name="yabras"
              min={0}
              value={formulario.yabras}
              onChange={handleInputChange}
            />
            <br />
          </div>
        )}
        {category === "cremas" && (
          <div>
            <label htmlFor="mutabal">mutabal pack x 2 kg:</label>
            <input
              type="number"
              name="mutabal"
              min={0}
              value={formulario.mutabal}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="homus">homus balde x 9 kg:</label>
            <input
              type="number"
              name="homus"
              min={0}
              value={formulario.homus}
              onChange={handleInputChange}
            />
            <br />
          </div>
        )}
        {category === "salsas" && (
          <div>
            <label htmlFor="yogurt">yogurt bidón 5L:</label>
            <input
              type="number"
              name="yogurt"
              min={0}
              value={formulario.yogurt}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="mayonesaajo">mayonesa de ajo bidón 5L:</label>
            <input
              type="number"
              name="mayonesaajo"
              min={0}
              value={formulario.mayonesaajo}
              onChange={handleInputChange}
            />

            <br />
            <label htmlFor="salsapicante">salsa picante 2L:</label>
            <input
              type="number"
              name="salsapicante"
              min={0}
              value={formulario.salsapicante}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="salsagranada">salsa granada 2L:</label>
            <input
              type="number"
              name="salsagranada"
              min={0}
              value={formulario.salsagranada}
              onChange={handleInputChange}
            />
          </div>
        )}
        {category === "postres" && (
          <div>
            <label htmlFor="Mamulcoco">Mamul coco bandeja de 18u</label>
            <input
              type="number"
              name="mamulcoco"
              min={0}
              value={formulario.mamulcoco}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="Mamulnuez">Mamul nuez bandeja de 18u</label>
            <input
              type="number"
              name="mamulnuez"
              min={0}
              value={formulario.mamulnuez}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="Mamul datiles">Mamul datiles bandeja de 18u</label>
            <input
              type="number"
              name="mamuldatiles"
              min={0}
              value={formulario.mamuldatiles}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="baklawa">baklawa bandeja de 80u</label>
            <input
              type="number"
              name="baklawa"
              min={0}
              value={formulario.baklawa}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="kadaef">kadaef bandeja de 10u</label>
            <input
              type="number"
              name="kadaef"
              min={0}
              value={formulario.kadaef}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="namura">namura bandeja de 10u</label>
            <input
              type="number"
              name="namura"
              min={0}
              value={formulario.namura}
              onChange={handleInputChange}
            />
            <br />
          </div>
        )}
        {category === "semillasyfiambres" && (
          <div>
            <label htmlFor="cesamob">Cesamo blanco</label>
            <input
              type="number"
              name="cesamob"
              min={0}
              value={formulario.cesamob}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="cesamon">Cesamo negro</label>
            <input
              type="number"
              name="cesamon"
              min={0}
              value={formulario.cesamon}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="queso">Queso kg</label>
            <input
              type="number"
              name="queso"
              min={0}
              value={formulario.queso}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="nueces">nueces bolsa 500g</label>
            <input
              type="number"
              name="nueces"
              min={0}
              value={formulario.nueces}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="aceitegirasol">aceite de girasol de 5L</label>
            <input
              type="number"
              name="aceitegirasol"
              min={0}
              value={formulario.aceitegirasol}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="aceiteoliva">aceite de oliva bandeja de 10u</label>
            <input
              type="number"
              name="aceiteoliva"
              min={0}
              value={formulario.aceiteoliva}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="aceitunas">aceitunas de 5L</label>
            <input
              type="number"
              name="aceitunas"
              min={0}
              value={formulario.aceitunas}
              onChange={handleInputChange}
            />
            <br />
          </div>
        )}
        {category === "descartables" && (
          <div>
            <label htmlFor="papelshawarma">Papel encerado resma</label>
            <input
              type="number"
              name="papelshawarma"
              min={0}
              value={formulario.papelshawarma}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="potecremas">pote grande para cremas:</label>
            <input
              type="number"
              name="potecremas"
              min={0}
              value={formulario.potecremas}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="servilletas">servilletas cajas:</label>
            <input
              type="number"
              name="servilletas"
              min={0}
              value={formulario.servilletas}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="potesalsas">pote para salsas cajas</label>
            <input
              type="number"
              name="potesalsas"
              min={0}
              value={formulario.potesalsas}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="potedulces">potes chicos para dulces caja:</label>
            <input
              type="number"
              name="potedulces"
              min={0}
              value={formulario.potedulces}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="bolsachicas">Bolsas chicas pack de 10u</label>
            <input
              type="number"
              name="bolsachicas"
              min={0}
              value={formulario.bolsachicas}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="bolsasgrandes">bolsas grandes pack x 5</label>
            <input
              type="number"
              name="bolsasgrandes"
              min={0}
              value={formulario.bolsasgrandes}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="bandejaschicas">bandejas chicas bolsa</label>
            <input
              type="number"
              name="bandejaschicas"
              min={0}
              value={formulario.bandejaschicas}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="bandejasmedianas">bandejas medianas bolsa</label>
            <input
              type="number"
              name="bandejasmedianas"
              min={0}
              value={formulario.bandejasmedianas}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="bandejasgrandes">bandejas grandes bolsa</label>
            <input
              type="number"
              name="bandejasgrandes"
              min={0}
              value={formulario.bandejasgrandes}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="guantes">Guantes caja:</label>
            <input
              type="number"
              name="guantes"
              min={0}
              value={formulario.guantes}
              onChange={handleInputChange}
            />
            <br />
          </div>
        )}
        {category === "varios" && (
          <div>
            <label htmlFor="pita">pita de 7u</label>
            <input
              type="number"
              name="pita"
              min={0}
              value={formulario.pita}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="pan">pan de 50u</label>
            <input
              type="number"
              name="pan"
              min={0}
              value={formulario.pan}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="trigo">trigo 500g</label>
            <input
              type="number"
              name="trigo"
              min={0}
              value={formulario.trigo}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="falafel">falafel 30kg</label>
            <input
              type="number"
              name="falafel"
              min={0}
              value={formulario.falafel}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="grasa">grasa de 1kg</label>
            <input
              type="number"
              name="grasa"
              min={0}
              value={formulario.grasa}
              onChange={handleInputChange}
            />
            <br />
          </div>
        )} */
