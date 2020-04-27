import React, { Component } from 'react';


function A() {
    return <div>A</div>
}

export default class Home extends Component {
    render() {
        return (
            <div>
                home
                <A />
            </div>
        )
    }
}