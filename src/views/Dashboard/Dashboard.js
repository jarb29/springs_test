import React, { useEffect, useContext } from "react";
import { Context } from "../../AppContext";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import InfoOutline from "@material-ui/icons/InfoOutline";
import DateRange from "@material-ui/icons/DateRange";

// core components
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const { store, actions } = useContext(Context);
  const classes = useStyles();

  useEffect(() => {
    actions.indicadoreApi();
    actions.indicadoresAntier();
  }, []);

  const valores = Object.values(store.indicadores);
  let new_valores = valores.filter(e => typeof e !== "string");

  let colors = ["warning", "success", "danger", "info", "rose"];
  let header_icon = [
    <AttachMoneyIcon />,
    <AccountBalanceIcon />,
    <EuroSymbolIcon />
  ];

  console.log(store.indicadoresrangoDeDias, "los dias arreglados")

  return (
    <div>
      <GridContainer>
        {new_valores.map((val, index) => {
          const a = Math.floor(Math.random() * 5);
          const fecha = val.fecha.split("T")[0];

          const b =
            val.codigo === "dolar" || val.codigo === "dolar_intercambio"
              ? 0
              : val.codigo === "euro"
              ? 2
              : 1;
          return (
            <GridItem xs={12} sm={6} md={6} lg={3} key={index}>
              <Card>
                <CardHeader color={colors[a]} stats icon>
                  <CardIcon color={colors[a]}>
                    <Icon>{header_icon[b]}</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>{val.codigo}</p>
                  <h3 className={classes.cardTitle}>
                    <small>
                      <b>{val.valor} </b>
                    </small>
                    <small>{val.unidad_medida}</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <GridItem>
                      <small>
                        Nombre: <b>{val.nombre} </b>
                      </small>
                      <Danger>
                        <DateRange />
                        <a>{fecha}</a>
                      </Danger>
                    </GridItem>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    </div>
  );
}
