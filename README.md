# react-self-webpack
用webpack手动搭建react项目

React Router附带了一些hooks钩子，可让您访问路由器的状态并从组件内部执行导航。
** useHistory
** useLocation
** useParams
** useRouteMatch

```javascript
// 用法
const history = useHistory();
history.push("/home");

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]);
}

const { slug } = useParams();

const match = useRouteMatch("/blog/:slug");
```

