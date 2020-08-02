import React, { useEffect, useContext } from "react";
import { Context } from "../../AppContext";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

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
    <AccountBalanceIcon  />,
    <EuroSymbolIcon />
  ];

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
          console.log(b);
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
