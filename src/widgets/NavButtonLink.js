import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Icon from "./Icon";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class NavButtonLink extends Component {
    constructor(props) {
        super(props);
    }

    clickAction() {
        if (this.props.commitAction) {
            this.props.commitAction();
        }
    }

    getClassName() {
        let classes = ["btn","button-link-container"];
        if (this.props.type && ! this.props.active) {
            classes.push("btn-" + this.props.type)
        } else if(this.props.active){
            classes.push("btn-primary");
        }else{
            classes.push("btn-secondary");
        }
        return classes.join(" ");
    }

    render() {
        let text = this.props.text;
        let glyphicon;
        if (this.props.icon) {
            glyphicon = <Icon name={this.props.icon}/>
        }
        return (
            <button
                type="button"
                className={this.getClassName()}
                onClick={this.clickAction.bind(this)}
                disabled={this.props.disabled}>
                <Link className="button-link" to={this.props.path} replace={true}>
                {text} {glyphicon}
                </Link>
            </button>
        );
    }

}