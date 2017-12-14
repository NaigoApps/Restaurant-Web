import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";

export const SIZES = {XSMALL: "XSMALL", SMALL: "SMALL", MEDIUM: "MEDIUM", HUGE: "HUGE", SPACE: "SPACE"};

export default class KeyboardButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "kbtn_" + uuid()
        }
    }

    onButtonClick(char) {
        this.props.onClick(char);
    }

    computeStyle() {
        let style = "btn btn-lg btn-secondary keyboard-character ";
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
            case SIZES.SPACE:
                style += "space";
                break;
            default:
                style += "xs";
                break;
        }
        return style;
    }

    render() {
        const disabled = this.props.disabled;
        let style = this.computeStyle();
        let content;
        if(this.props.char){
            content = this.props.char;
        }else if(this.props.icon){
            content = <span className={"glyphicon glyphicon-" + this.props.icon}/>
        }
        let c = this.props.char;
        let button = <button
            disabled={disabled}
            type="button"
            key={this.state.uuid}
            className={style}
            onClick={this.onButtonClick.bind(this, c)}>{content}</button>;

        return button
    }

}