import Dashboard from "views/Dashboard/Dashboard.js";
import DashboardI from "views/DashboardI/DashboardI.js";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import GridOn from "@material-ui/icons/GridOn";

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
    icon: GridOn,
    component: DashboardI,
    layout: "/admin"
  }
];
export default dashRoutes;
