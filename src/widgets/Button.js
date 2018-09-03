import React, {Component} from 'react';
import Icon from "./Icon";
import Row from "./Row";
import Column from "./Column";
import Text from "./Text";

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
        if (text && icon) {
            if (this.props.vertical) {
                content = <Row>
                    <Column>
                        <Row>
                            <Column>
                                {text}
                            </Column>
                        </Row>
                        <Row ofList>
                            <Column>
                                <Icon name={icon}/>
                            </Column>
                        </Row>
                    </Column>
                </Row>;
            } else {
                content = <Row justify="center">
                    <Column auto>
                        {text}
                    </Column>
                    <Column auto>
                        <Icon name={icon}/>
                    </Column>
                </Row>;
            }
        } else if (text) {
            content = <Text color={this.props.color || "#000000"}>{text}</Text>;
        } else if (icon) {
            content = <Icon name={icon}/>
        } else {
            content = <span>&nbsp;</span>
        }

        let bg = undefined;
        if (this.props.backgroundColor) {
            bg = this.props.backgroundColor.toHexString();
        }

        return (
            <button
                type="button"
                className={this.getClassName()}
                style={{backgroundColor : bg}}
                onMouseUp={this.clickAction.bind(this)}
                disabled={!!this.props.disabled}>
                {content}
            </button>
        );
    }

}