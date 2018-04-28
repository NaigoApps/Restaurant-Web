import React, {Component} from 'react';
import Button from "../../widgets/Button";

export default class Switch extends Component {
    constructor(props) {
        super(props);
    }

    toggleSelection() {
        this.props.onToggle(!this.props.value);
    }

    containerStyle() {
        let classes = ["switch-container"];
        if (!!this.props.value) {
            if(this.props.rightBg){
                classes.push("bg-" + this.props.rightBg);
            }else{
                classes.push("bg-success");
            }
            classes.push("checked");
        } else {
            if(this.props.rightBg){
                classes.push("bg-" + this.props.leftBg);
            }else{
                classes.push("bg-danger");
            }
        }
        return classes.join(" ");
    }

    render() {
        return <div className={this.containerStyle()} onClick={() => this.toggleSelection()}>
            <Button/>
        </div>;
    }

}