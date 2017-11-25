import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class TouchButton extends Component {
    constructor(props) {
        super(props);
    }

    clickAction() {
        this.props.commitAction();
    }

    getClassName(props) {
        let classes = ["btn touch all-sep"];
        if (props.type) {
            classes.push("btn-" + props.type)
        } else {
            classes.push("btn-default");
        }
        if (props.size) {
            classes.push("btn-" + props.size)
        } else {
            classes.push("btn-lg");
        }
        return classes.join(" ");
    }

    render() {
        let text = this.props.text;
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div
                    className={this.getClassName(this.props)}
                    onClick={this.clickAction.bind(this)}>
                    <span>{text}</span>
                </div>
            </div>
        );
    }

}