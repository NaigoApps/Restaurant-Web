import React, {Component} from 'react';
import Icon from "./Icon";
import Row from "./Row";
import Column from "./Column";
import Text from "./Text";
import Color from "../utils/Color";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class TextButton extends Component {
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
        if (this.props.backgroundColor && !this.props.active) {
            classes.push("btn-" + this.props.backgroundColor)
        } else if (this.props.active) {
            classes.push("btn-primary");
        } else {
            classes.push("btn-secondary");
        }
        if (this.props.fill) {
            classes.push("fill");
        }
        if (this.props.fullSize) {
            classes.push("col-sm-12");
        }
        if (this.props.highPadding) {
            classes.push("high-padding");
        }
        if (this.props.textRows) {
            classes.push("text-rows-" + this.props.textRows)
        }
        return classes.join(" ");
    }

    render() {
        let text = this.props.text;
        let icon = this.props.icon;
        let separator = this.props.separator || " ";

        let content;
        if (text) {
            content = <Text color={this.props.color}>{text}</Text>;
        } else {
            content = <span>&nbsp;</span>
        }

        const style = {};
        if(this.props.color){
            style.color = this.props.color.toHexString();
        }

        return (
            <button
                type="button"
                style={style}
                className={this.getClassName()}
                onMouseUp={this.clickAction.bind(this)}
                disabled={!!this.props.disabled}>
                {content}
            </button>
        );
    }

}