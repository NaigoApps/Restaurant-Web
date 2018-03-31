import React, {Component} from 'react';
import Button from "../../../../widgets/Button";

export default class BooleanInput extends Component {
    constructor(props) {
        super(props);
    }

    toggleSelection() {
        this.props.onConfirm(!this.props.value);
    }

    containerStyle() {
        let classes = ["switch-container"];
        if (!!this.props.value) {
            classes.push("bg-success");
            classes.push("checked");
        } else {
            classes.push("bg-danger");
        }
        return classes.join(" ");
    }

    render() {
        return <div className={this.containerStyle()} onClick={() => this.toggleSelection()}>
            <Button/>
        </div>;
    }

}