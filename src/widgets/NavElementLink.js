import React, {Component} from 'react';

export default class NavElementLink extends Component {
    constructor(props) {
        super(props);
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
        const disabled = this.props.disabled;

        return (
                <li className="nav-item">
                    <a className={NavElementLink.getClassName(this.props)} href={disabled ? "#" : this.props.href}>{text}</a>
                </li>
        );
    }

}