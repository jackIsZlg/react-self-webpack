import React, {lazy} from "react";
import loadable from 'loadable-components'

const Home = lazy(() => import('@/views/Home'))
// const About = lazy(() => import('@/views/About'))
const AboutChild = lazy(() => import('@/views/About/AboutChild'))

const About = lazy(() => new Promise(resolve => setTimeout(resolve, 2000)).then(
  () => import('@/views/About')
));

const Login = lazy(() => import('@/views/Login'))
// const Login = () => import('@/views/Login')

const config = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/about",
    component: About,
    childRoutes: [
      {
          path: "/about/child",
          name: "欢迎页",
          icon: "smile",
          exact: true,
          component: AboutChild
      }
    ]
  },
  {
    path: "/login",
    component: Login,
  },
  { path: "/", exact: true, redirect: "/home" },
  { path: "*", exact: true, redirect: "/home" }
];

export default config;
