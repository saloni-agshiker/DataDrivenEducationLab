import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sentiment", "routes/sentiment.tsx"),
  route("grades", "routes/grades.tsx"),
] satisfies RouteConfig;