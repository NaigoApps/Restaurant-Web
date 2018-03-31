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
        if(this.props.topSpaced){
            classes.push("top-sep");
        }
        if(this.props.fullHeight){
            classes.push("h-100");
        }
        if(this.props.grow){
            classes.push("flex-grow");
        }
        if(this.props.underNav){
            classes.push("under-nav");
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