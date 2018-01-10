import React, {Component} from 'react';

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class Column extends Component {
    constructor(props) {
        super(props);
    }

    getCss() {
        let classes = ["d-flex", "flex-column"];
        if (this.props.sm) {
            classes.push("col-sm-" + this.props.sm);
        }
        if (this.props.md) {
            classes.push("col-md-" + this.props.md);
        }
        if (this.props.lg) {
            classes.push("col-lg-" + this.props.lg);
        }
        if (this.props.xl) {
            classes.push("col-xl-" + this.props.xl);
        }
        if (classes.length === 2) {
            classes.push("col");
        }
        if (this.props.align) {
            classes.push("align-self-" + this.props.align);
        }
        if (this.props.centered) {
            classes.push("text-center");
        }
        if (this.props.right) {
            classes.push("text-right");
        } else if (this.props.left) {
            classes.push("text-left");
        }
        if (this.props.bordered) {
            classes.push("bordered");
        }
        if (this.props.type && !this.props.active) {
            classes.push("bg-" + this.props.type)
        } else if (this.props.active) {
            classes.push("bg-primary");
        } else {
            classes.push("bg-secondary");
        }
        return classes.join(" ");
    }

    render() {
        return (
            <div className={this.getCss()}>
                {this.props.children}
            </div>
        );
    }

}