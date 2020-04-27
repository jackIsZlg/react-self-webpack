import React, { useState, lazy } from 'react';
import { Route, Switch } from "react-router-dom";
import loadable from 'loadable-components'

import S from './index.m.less';

const AboutChild = lazy(() => import('@/views/About/AboutChild'))

export default function about () {
    const [count, setCount] = useState(0);
    const hookClick = () => {
        setCount(prv => prv + 1);
    }
    return (
        <div className={S.about} onClick={hookClick}>
            about
            <div>hook: {count} </div>
            <Switch>
                <Route path="/about/child" component={AboutChild} />
            </Switch>
            <div>foot</div>
        </div>
    )
}