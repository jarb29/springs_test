const getState = ({ getStore, getActions, setStore }) => {
  return {
    // base
    store: {
      /////URL
      baseURL: "https://mindicador.cl/api",

      // Variables del retorno Indicador
      indicadores: [],
      indicadoresI: [],

      // Errores del retorno
      errorIndicador: []
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

      // funcion que obtiene los mensajes
      mensajes: () => {
        const store = getStore();
        const { token } = store;
        let data = {
          token: token,
          data: {
            id: "personNickname",
            name: "name",
            date_time: "dateTime|UNIX",
            message: "It is a long established fact that a reader will",
            _repeat: 10
          }
        };
        getActions().retornomensajes(data);
      },

      retornomensajes: async data => {
        const store = getStore();
        const { baseURL } = store;
        const resp = await fetch(baseURL, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const dato = await resp.json();
        if (dato.msg) {
          setStore({
            errorMensaje: dato
          });
        } else {
          setStore({
            mensajes: dato
          });
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
