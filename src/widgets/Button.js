import React, {Component} from 'react';
import Icon from "./Icon";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    clickAction() {
        if (this.props.commitAction) {
            this.props.commitAction();
        }
    }

    getClassName() {
        let classes = ["btn"];
        if (this.props.type && !this.props.active) {
            classes.push("btn-" + this.props.type)
        } else if (this.props.active) {
            classes.push("btn-primary");
        } else {
            classes.push("btn-secondary");
        }
        if (this.props.size) {
            classes.push("btn-" + this.props.size)
        }else{
            classes.push("btn-lg")
        }
        if (this.props.fill) {
            classes.push("fill");
        }
        if (this.props.fullSize) {
            classes.push("col-sm-12");
        }
        if (this.props.customClass){
            classes.push(this.props.customClass);
        }
        if(this.props.highPadding){
            classes.push("high-padding");
        }
        return classes.join(" ");
    }

    render() {
        let text = this.props.text;
        let icon = this.props.icon;
        let separator = this.props.separator || " ";

        let content;
        if (text && icon) {
            content = <span><div>{text}</div><Icon name={icon}/></span>;
        } else if (text) {
            content = text;
        } else if (icon) {
            content = <Icon name={icon}/>
        } else {
            content = <span>&nbsp;</span>
        }

        return (
            <button
                type="button"
                className={this.getClassName()}
                onClick={this.clickAction.bind(this)}
                disabled={!!this.props.disabled}>
                {content}
            </button>
        );
    }

}