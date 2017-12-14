import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    getCss(){
        let classes = ["row"];
        if(this.props.align){
            classes.push("align-items-" + this.props.align);
        }
        if(this.props.justify){
            classes.push("justify-content-" + this.props.justify)
        }
        return classes.join(" ");
    }

    render() {
        return (
            <div className={this.getCss()}>
                {this.props.children}
            </div>
        );
    }

}