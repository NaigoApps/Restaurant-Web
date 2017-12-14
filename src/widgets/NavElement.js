import React, {Component} from 'react';

export default class NavElement extends Component {
    constructor(props) {
        super(props);
    }

    clickAction(){
        if(this.props.commitAction){
            this.props.commitAction();
        }
    }

    render() {
        const text = this.props.text;
        const active = this.props.active

        return (
                <li className="nav-item" onClick={this.clickAction.bind(this)}>
                    <a className={active ? "nav-link active" : "nav-link"} href="#">{text}</a>
                </li>
        );
    }

}