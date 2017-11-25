import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";
import {SIZES} from "./KeyboardButton";

export default class KeyboardButtonSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "kbs_" + uuid()
        }
    }

    onButtonClick(char) {
        this.props.onClick(char);
    }

    computeStyle() {
        let style = "keyboard-character ";
        switch (this.props.size) {
            case SIZES.XSMALL:
                style += "xs";
                break;
            case SIZES.SMALL:
                style += "sm";
                break;
            case SIZES.MEDIUM:
                style += "md";
                break;
            case SIZES.HUGE:
                style += "lg";
                break;
            default:
                style += "xs";
                break;
        }
        return style;
    }

    render() {
        let style = this.computeStyle();
        let result =
            (<span
                key={this.state.uuid}
                className={style}>
            </span>);

        return result
    }

}