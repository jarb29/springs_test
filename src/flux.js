const getState = ({ getStore, getActions, setStore }) => {
  return {
    // base
    store: {
      /////URL
      baseURL: "https://mindicador.cl/api",

      // Variables del retorno Indicador
      indicadores: [],
      indicadoresI: [],
      indicadores_dia_anterior: [],

      // Errores del retorno
      errorIndicador: [],
      errorindi_nombres_filt: [],
    },

    actions: {
      // funcion que obtienes los indocadores totales
      indicadoreApi: () => {
        getActions().indicadoresRetorno();
      },
      indicadoresRetorno: async () => {
        const store = getStore();
        const { baseURL } = store;
        const resp = await fetch(baseURL);
        const dato = await resp.json();

        console.log(dato, "para ver que retorna");
        if (dato.msg) {
          setStore({
            errorIndicador: dato
          });
        } else {
          setStore({
            indicadores: dato,
            indicadoresI: dato
          });
        }
      },

      // funcion que obtiene los indces del dia anterior
      indicadoresAntier: () => {
        const store = getStore();
        const { indicadores } = store;
        const indi_nombres = Object.keys(indicadores);
        let indi_nombres_filt = indi_nombres.slice(3, 15);

        var date = new Date();
        date.setDate(date.getDate() - 1);
        let formatted_date =
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear();
        if (store.indicadores_dia_anterior.length === 0) {
          getActions().indicadoresAntierRetorno(
          formatted_date,
          indi_nombres_filt
        );}
      },

      indicadoresAntierRetorno: async (formatted_date, indi_nombres_filt) => {
        const store = getStore();
        const { baseURL } = store;

        for (let i = 0; i < indi_nombres_filt.length; i++) {
          const resp = await fetch(
            baseURL + `/${indi_nombres_filt[i]}/${formatted_date}`
          );
          const dato = await resp.json();
          if (dato.msg) {
            setStore({
              errorindi_nombres_filt: dato
            });
          } else {
            store.indicadores_dia_anterior.push(dato);
          }
        }
      },

      // Funcion para filtrar los hoteles
      filtro: e => {
        const store = getStore();
        if (e.target.value.length === 0) {
          setStore({ hoteles: store.hotelesII });
        } else {
          setStore({
            hoteles: store.hotelesII.filter(
              hotel =>
                hotel.companyName
                  .toLowerCase()
                  .slice(0, e.target.value.length) ===
                e.target.value.toLowerCase()
            )
          });
        }
      }
    }
  };
};

export default getState;
