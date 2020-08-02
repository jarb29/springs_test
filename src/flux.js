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
      indicadoresrangoDeDiasII: [],
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
        getActions().indicadoresAntierRetorno(
          formatted_date,
          indi_nombres_filt
        );
      },

      indicadoresAntierRetorno: async (formatted_date, indi_nombres_filt) => {
        const store = getStore();
        const { baseURL } = store;
        let indicadores_dia_anterior_I = [];

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
            indicadores_dia_anterior_I.push(dato);
          }
        }
        setStore({ indicadores_dia_anterior: indicadores_dia_anterior_I });
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
          while (theDate <= endDate) {
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
        let indicadoresrangoDeDiasI = [];

        for (let i = 0; i < indi_nombres_filt.length; i++) {
          let valores = [];
          for (let b = 0; b < rango_dias.length; b++) {
            const store = getStore();
            const { baseURL } = store;
            const resp = await fetch(
              baseURL + `/${indi_nombres_filt[i]}/${rango_dias[b]}`
            );
            const dato = await resp.json();
            console.log(dato, "el dato");
            if (b === rango_dias.length - 1) {
              let data = {};
              data["labels"] = rango_dias;
              data["series"] = [valores];
              data["nombre"] = dato.nombre;
              data["fecha_inicial"] = rango_dias[0];
              data["fecha_final"] = rango_dias[rango_dias.length - 1];
              indicadoresrangoDeDiasI.push(data);
            } else if (dato.msg) {
              setStore({
                errorRangoDeDias: dato
              });
            } else if (dato.serie.length === 0) {
              valores.push(0);
            } else {
              valores.push(dato.serie[0].valor);
            }
          }
        }
        setStore({
          indicadoresrangoDeDias: indicadoresrangoDeDiasI,
          indicadoresrangoDeDiasII: indicadoresrangoDeDiasI
        });
      },

      // Funcion para filtrar
      filtro: e => {
        const store = getStore();
        const valores_indicadores = Object.values(store.indicadores);
        const valores_indicadores_I = Object.values(store.indicadoresI);
        let new_valores = valores_indicadores.filter(
          e => typeof e !== "string"
        );
        let new_valores_I = valores_indicadores_I.filter(
          e => typeof e !== "string"
        );

        console.log(new_valores, "para ver que sale");
        if (e.target.value.length === 0) {
          setStore({
            indicadores: new_valores_I,
            indicadoresrangoDeDias: store.indicadoresrangoDeDiasII
          });
        } else {
          setStore({
            indicadores: new_valores_I.filter(
              indi =>
                indi.nombre.toLowerCase().slice(0, e.target.value.length) ===
                e.target.value.toLowerCase()
            ),
            indicadoresrangoDeDias: store.indicadoresrangoDeDiasII.filter(
              indi =>
                indi.nombre.toLowerCase().slice(0, e.target.value.length) ===
                e.target.value.toLowerCase()
            )
          });
        }
      }
    }
  };
};

export default getState;
