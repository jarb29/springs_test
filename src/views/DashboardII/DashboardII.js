import React, { useEffect, useContext } from "react";
import { Context } from "../../AppContext";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import Datetime from "react-datetime";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
// import InfoOutline from "@material-ui/icons/InfoOutline";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
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


const useStyles = makeStyles(styles);

export default function DashboardII() {
  const { store} = useContext(Context);
  const [diaInicio, setDiaInicio] = React.useState([]);
  const [diaFinal, setDiaFinal] = React.useState([]);
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
        let new_value = val.valor-val_a.valor;
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

  console.log(diaInicio, diaFinal,  "los datos para ver que son")

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LibraryBooks />
              </CardIcon>
            </CardHeader>
            <CardBody>
              <InputLabel className={classes.label}>
                Seleccione un rango de fechas
              </InputLabel>
              <br />
              <FormControl fullWidth>
                <Datetime
                  timeFormat={false}
                  inputProps={{ placeholder: "Inicio" }}
                  onChange={e => {
                    setDiaInicio(e._d);
                  }}
                />
                  <Datetime
                  timeFormat={false}
                  onChange={e => {
                    setDiaFinal(e._d);
                  }}
                  inputProps={{ placeholder: "Final" }}
                />
              </FormControl>
            </CardBody>
          </Card>
        </GridItem>
        </GridContainer>
        <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="warning" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="danger" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
