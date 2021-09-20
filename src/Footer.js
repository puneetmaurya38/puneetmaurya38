import React, { Component } from 'react';
export default class Footer extends Component {
    render() {
        return (
             <div>
                <button className="aboutbtn" onClick={this.props.showAboutUs} > About Us</button>
            </div>
        )
    }
}


