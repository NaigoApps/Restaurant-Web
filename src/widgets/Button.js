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
        }
        if (this.props.fullHeight) {
            classes.push("full-height")
        }
        if (this.props.fullSize) {
            classes.push("col-sm-12");
        }
        return classes.join(" ");
    }

    render() {
        let text = this.props.text;
        let icon = this.props.icon;

        let content;
        if (text && icon) {
            content = <span>{text} &nbsp; <Icon name={icon}/></span>;
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