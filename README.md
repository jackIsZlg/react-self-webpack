# react-self-webpack
用webpack手动搭建react项目

React Router附带了一些hooks钩子，可让您访问路由器的状态并从组件内部执行导航。
#### useHistory
#### useLocation
#### useParams
#### useRouteMatch

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

在 webpack 中 css import 使用 alias 相对路径的解决办法有两种：

直接为 css-loader 添加 alias 的路径。

在引用路径的字符串前面加上 ~ 的符号，如：@import “~@/…”。webpack 会以~符号作为前缀的路径视为依赖模块去解析。

