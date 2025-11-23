import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
  } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"), // main page
    // define other pages
    // route("test", "routes/header/header.tsx"), 
    route("grade-prediction", "routes/GradePrediction.tsx"),

] satisfies RouteConfig;
