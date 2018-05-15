import React, {Component} from 'react';
import Icon from "./Icon";
import {uuid} from "../utils/Utils";
import Row from "./Row";
import Column from "./Column";

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
        // let btn = global.$('#' + this.state.uuid);
        // btn.height(btn.width());
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
        if (this.props.customClass) {
            classes.push(this.props.customClass);
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
            content = <Row>
                <Column>
                    <Row>
                        <Column>{text}</Column>
                    </Row>
                    <Row>
                        <Column><Icon name={icon}/></Column>
                    </Row>
                </Column>
            </Row>;
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