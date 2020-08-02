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

import { simpleBarChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function DashboardII() {
  const { store, actions } = useContext(Context);
  const [diaInicio, setDiaInicio] = React.useState([]);
  const [diaFinal, setDiaFinal] = React.useState([]);
  const classes = useStyles();

  let colors = ["warning", "success", "danger", "info", "rose"];
  useEffect(() => {
    actions.indicadoresRango(diaInicio, diaFinal);
  }, [diaFinal]);

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
        {store.indicadoresrangoDeDias.map((indicadores, index) => {
          const a = Math.floor(Math.random() * 5);
          return (
            <GridItem xs={12} sm={12} md={6} key={index}>
              <Card chart className={classes.cardHover}>
                <CardHeader
                  color={colors[a]}
                  className={classes.cardHeaderHover}
                >
                  <ChartistGraph
                    className="ct-chart-white-colors"
                    data={indicadores}
                    type="Bar"
                    options={simpleBarChart.options}
                    responsiveOptions={simpleBarChart.responsiveOptions}
                    listener={simpleBarChart.animation}
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
                  
                </CardBody>
                <CardFooter chart>
                  <h4 className={classes.cardTitle}>{indicadores.nombre}</h4>
                </CardFooter>
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    </div>
  );
}
