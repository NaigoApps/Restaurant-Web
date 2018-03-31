import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";

export const SIZES = {XXSMALL: "XXSMALL",XSMALL: "XSMALL", SMALL: "SMALL", MEDIUM: "MEDIUM", HUGE: "HUGE", SPACE: "SPACE"};

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
        let style = ["btn", "btn-lg", "btn-secondary", "keyboard-character"];
        switch (this.props.size) {
            case SIZES.XXSMALL:
                style.push("xxs");
                break;
            case SIZES.XSMALL:
                style.push("xs");
                break;
            case SIZES.SMALL:
                style.push("sm");
                break;
            case SIZES.MEDIUM:
                style.push("md");
                break;
            case SIZES.HUGE:
                style.push("lg");
                break;
            case SIZES.SPACE:
                style.push("space");
                break;
            default:
                style.push("xs");
                break;
        }
        if(this.props.reduced){
            style.push("reduced");
        }
        if(this.props.fullHeight){
            style.push("full-height");
        }
        return style.join(" ");
    }

    render() {
        const disabled = this.props.disabled;
        let style = this.computeStyle();
        let content = "";
        if (this.props.text || this.props.char) {
            content = this.props.text || this.props.char;
        } else if (this.props.icon) {
            content = <span className={"fa fa-" + this.props.icon}/>
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