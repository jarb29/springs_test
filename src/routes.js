import Buttons from "views/Components/Buttons.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import DashboardI from "views/DashboardI/DashboardI.js";
import DashboardII from "views/DashboardII/DashboardII.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import Typography from "views/Components/Typography.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GridOn from "@material-ui/icons/GridOn";
import Timeline from "@material-ui/icons/Timeline";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/variacion",
    name: "Variacion",
    icon: Timeline,
    component: DashboardI,
    layout: "/admin"
  },
  {
    path: "/graficas",
    name: "Graficas",
    icon: Timeline,
    component: DashboardII,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Components",
    icon: Apps,
    state: "componentsCollapse",
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        mini: "MC",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            mini: "B",
            component: Buttons,
            layout: "/admin"
          }
        ]
      },
      {
        path: "/buttons",
        name: "Buttons",
        mini: "B",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/grid-system",
        name: "Grid System",
        mini: "GS",
        component: GridSystem,
        layout: "/admin"
      },
      {
        path: "/panels",
        name: "Panels",
        mini: "P",
        component: Panels,
        layout: "/admin"
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        mini: "SA",
        component: SweetAlert,
        layout: "/admin"
      },
      {
        path: "/notifications",
        name: "Notifications",
        mini: "N",
        component: Notifications,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        mini: "I",
        component: Icons,
        layout: "/admin"
      },
      {
        path: "/typography",
        name: "Typography",
        mini: "T",
        component: Typography,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    icon: "content_paste",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        mini: "EF",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        mini: "VF",
        component: ValidationForms,
        layout: "/admin"
      },
      {
        path: "/wizard",
        name: "Wizard",
        mini: "W",
        component: Wizard,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    icon: GridOn,
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        mini: "RT",
        component: RegularTables,
        layout: "/admin"
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        mini: "ET",
        component: ExtendedTables,
        layout: "/admin"
      },
      {
        path: "/react-tables",
        name: "React Tables",
        mini: "RT",
        component: ReactTables,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/charts",
    name: "Charts",
    icon: Timeline,
    component: Charts,
    layout: "/admin"
  }
];
export default dashRoutes;
