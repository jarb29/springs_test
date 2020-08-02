import React, { useEffect, useContext } from "react";
import { Context } from "../../AppContext";
// react plugin for creating charts
import Datetime from "react-datetime";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
// import InfoOutline from "@material-ui/icons/InfoOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";


import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Calender() {
  const { actions } = useContext(Context);
  const [diaInicio, setDiaInicio] = React.useState([]);
  const [diaFinal, setDiaFinal] = React.useState([]);

  const classes = useStyles();
  useEffect(() => {
    actions.indicadoresRango(diaInicio, diaFinal);
  }, [diaFinal]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <FormControl >
                <Datetime
                  timeFormat={false}
                  inputProps={{ placeholder: "Fecha de Inicio" }}
                  onChange={e => {
                    setDiaInicio(e._d);
                  }}
                />
                <Datetime
                  timeFormat={false}
                  onChange={e => {
                    setDiaFinal(e._d);
                  }}
                  inputProps={{ placeholder: "Fecha Final" }}
                />
              </FormControl>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
