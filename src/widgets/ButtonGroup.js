import React, {Component} from 'react';

export default class ButtonGroup extends Component {
    constructor(props) {
        super(props);
    }

    getClassName() {
        let classes = [];
        classes.push(this.props.vertical ? "btn-group-vertical" : "btn-group");
        if (this.props.size) {
            classes.push("btn-group-" + this.props.size);
        }
        if (this.props.justified) {
            if (!this.props.vertical) {
                classes.push("btn-group-justified");
            } else {
                classes.push("btn-group-vertical-justified");
            }
        }
        return classes.join(" ");
    }

    render() {
        return (
            <div className={this.getClassName()}>
                {this.props.children}
            </div>
        );
    }

}