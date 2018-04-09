import React, {Component} from 'react';
import Button from "./Button";

export default class NavElement extends Component {
    constructor(props) {
        super(props);
    }

    clickAction(){
        if(this.props.commitAction && !this.props.disabled){
            this.props.commitAction();
        }
    }

    render() {
        const text = this.props.text;
        const active = this.props.active;
        const disabled = this.props.disabled;
        const type = this.props.type;

        return (
                <li className="nav-item" onClick={this.clickAction.bind(this)}>
                    <Button type={type || "secondary"} text={text} disabled={disabled} active={active}/>
                </li>
        );
    }

}