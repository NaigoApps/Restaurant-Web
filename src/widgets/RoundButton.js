import React, {Component} from 'react';
import Icon from "./Icon";
import {uuid} from "../utils/Utils";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class RoundButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: uuid()
        }
    }

    clickAction() {
        if (this.props.commitAction) {
            this.props.commitAction();
        }
    }

    componentDidMount() {
        let btn = global.$('#' + this.state.uuid);
        btn.height(btn.width());
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
        } else {
            classes.push("btn-lg")
        }
        if (this.props.fill) {
            classes.push("fill");
        }
        if (this.props.fullSize) {
            classes.push("col-sm-12");
        }
        if (this.props.customClass) {
            classes.push(this.props.customClass);
        }
        if (this.props.highPadding) {
            classes.push("high-padding");
        }
        classes.push("round");
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
                id={this.state.uuid}
                type="button"
                className={this.getClassName()}
                onClick={this.clickAction.bind(this)}
                disabled={!!this.props.disabled}>
                {content}
            </button>
        );
    }

}