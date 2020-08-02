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
      indicadoresrangoDeDias: [],
      rangoDeDias: [],

      // Errores del retorno
      errorIndicador: [],
      errorindi_nombres_filt: [],
      errorRandoDeDias: []
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
          );
        }
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

      // funcion para obtener los indicadores en un rango de fechas dadas
      indicadoresRango: (inicio, final) => {
        const store = getStore();
        const { indicadores } = store;
        const indi_nombres = Object.keys(indicadores);
        let indi_nombres_filt = indi_nombres.slice(3, 15);

        // funcion para dar formato a la fecha
        const fecha = function(number) {
          var date = new Date(number);
          return (
            date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()
          );
        };
        // funcion para buscar todos los dias dentro del rando de dias
        const rangoDias = (startDate, endDate) => {
          let dates = [];
          const theDate = new Date(startDate);
          while (theDate < endDate) {
            dates = [...dates, fecha(new Date(theDate))];
            theDate.setDate(theDate.getDate() + 1);
          }
          return dates;
        };
        const rango_dias = rangoDias(inicio, final);
        setStore({
          rangoDias: rango_dias
        });
        getActions().indicadoresRangoRetorno(rango_dias, indi_nombres_filt);
      },

      indicadoresRangoRetorno: async (rango_dias, indi_nombres_filt) => {
        for (let i = 0; i < indi_nombres_filt.length; i++) {
          let valores = [];
          for (let b = 0; b < rango_dias.length; b++) {
            const store = getStore();
            const { baseURL } = store;
            const resp = await fetch(
              baseURL + `/${indi_nombres_filt[i]}/${rango_dias[b]}`
            );
            const dato = await resp.json();
            if (b === rango_dias.length-1) {
              let data = {};
              data["labels"] = rango_dias;
              data["series"] = [valores];
              data["nombre"] = dato.nombre;
              store.indicadoresrangoDeDias.push(data);
            } else if (dato.msg) {
              setStore({
                errorRangoDeDias: dato
              });
            } else if (dato.serie.length === 0) {
              valores.push(0);
            } else {
              valores.push(dato.serie[0].valor)
            };
          }
        }
      },

      // Funcion para filtrar
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
