import React, {Component} from 'react';

export default class NavElement extends Component {
    constructor(props) {
        super(props);
    }

    clickAction(){
        if(this.props.commitAction && !this.props.disabled){
            this.props.commitAction();
        }
    }

    static getClassName(props){
        let classes = ["nav-link"];
        if(props.active){
            classes.push("active");
        }
        if(props.disabled){
            classes.push("not-allowed");
        }
        return classes.join(" ");
    }

    render() {
        const text = this.props.text;
        const active = this.props.active;

        return (
                <li className="nav-item" onClick={this.clickAction.bind(this)}>
                    <a className={NavElement.getClassName(this.props)} href="#">{text}</a>
                </li>
        );
    }

}