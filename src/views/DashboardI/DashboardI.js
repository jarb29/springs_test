import React, { useEffect, useContext } from "react";
import { Context } from "../../AppContext";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function DashboardI() {
  const { store, actions } = useContext(Context);


  useEffect(() => {
    actions.indicadoreApi();
    actions.indicadoresAntier();
  }, [valores]);

  const classes = useStyles();
  const diferen_indi = [];
  let valore_tabla = [];
  let valore_head = [];

  const valores = Object.values(store.indicadores);
  let new_valores = valores.filter(e => typeof e !== "string");

  // Funcion para calcular la diferencia...
  store.indicadores_dia_anterior.map(ind => {
    let valor_hoy = new_valores.filter(e => e.nombre === ind.nombre);
    let valor_antier = ind.serie;
    valor_hoy.map(val => {
      valor_antier.map(val_a => {
        let new_value = val.valor - val_a.valor;
        val["fecha"] = val.fecha.split("T")[0];
        val["Variacion"] = Math.round(new_value);
        diferen_indi.push(val);
      });
    });
  });

  //Arreglando los datos para la tabla.
  diferen_indi.map(valor => {
    valore_head.push(Object.keys(valor));
  });
  diferen_indi.map(valor => {
    valore_tabla.push(Object.values(valor));
  });

  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <Language />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Comparacion con el dia anterior
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={12} md={12}>
                  <Table tableHead={valore_head[0]} tableData={valore_tabla} />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
