import React, { Suspense, Component,lazy } from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from "react-router-dom";
import { Provider, connect } from 'react-redux';
import store from '@/store';
import { requestClear } from '@/store/asyc/action';
import LoadingPage from "@/components/LoadingPage";
import config from "./router";

import S from './index.m.less';


const renderRoutes = routes => {
  if (!Array.isArray(routes)) {
    return null;
  }

  return (
    <Switch>
      {routes.map((route, index) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          );
        }

        return (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact} // 如果为true，则仅在路径与location.pathname完全匹配时才匹配
            strict={route.strict} // 设置为true时，带有斜杠的路径将只匹配带有斜杠的location.pathname
            render={() => {
              // 目前子路由的处理存在问题
              const renderChildRoutes = renderRoutes(route.childRoutes);
              if (route.component) {
                return (
                  <Suspense fallback={<LoadingPage />}>
                    <route.component route={route}>
                      {renderChildRoutes}
                    </route.component>
                  </Suspense>
                );
              }
              return renderChildRoutes;
            }}
          />
        );
      })}
    </Switch>
  );
};

class App extends Component {

    shouldComponentUpdate (nextProps, nextState) {
      if(nextProps.isLoading) { //正在加载的状态不更新
          return false
      } else if(nextProps.errorMsg && nextProps.code != 0) {
          if(nextProps.showError) { // 在这里统一处理错误
              nextProps.requestClear();  // 每次成功以后要把信息清空，方便重新渲染
              //在这里做其他的一些操作
              alert(nextProps.errorMsg)
          }
          return false;
      } else if(nextProps.message == 'clear') { // 清空的状态不刷新组件
          return false;
      }
      return true;
    }

    render() {
        return (
            <div className={S.app}>
                <Router>
                    <ul>
                        <li>
                            <Link to="/">To Home</Link>
                        </li>
                        <li>
                            <Link to="/about">To About</Link>
                        </li>
                        <li>
                            <Link to="/about/child">To About/child</Link>
                        </li>
                    </ul>
                    {renderRoutes(config)}
                </Router>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
  return {
    showError: state.getAjaxInfo?.showError,
    isLoading: state.getAjaxInfo?.isLoading,
    code: state.getAjaxInfo?.code,
    errorMsg: state.getAjaxInfo?.errorMsg
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      requestClear: () => {
          dispatch(requestClear())
      },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
