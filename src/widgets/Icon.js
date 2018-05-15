import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Icon extends Component {
    constructor(props) {
        super(props);
    }

    getClassName() {
        let classes = ["fa", "fa-" + this.props.name];
        if(this.props.size){
            classes.push("icon-size-" + this.props.size);
        }
        if(this.props.type){
            classes.push("text-" + this.props.type);
        }
        return classes.join(" ");
    }

    render() {
        let name = this.props.name;
        return (
            <span className={this.getClassName()}/>
        );
    }

}