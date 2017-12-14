import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Icon from "./Icon";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class FullPageLink extends Component {
    constructor(props) {
        super(props);
    }

    clickAction() {
        if (this.props.commitAction) {
            this.props.commitAction();
        }
    }

    render() {
        let path = this.props.path;
        let icon;
        if (this.props.icon) {
            icon = <Icon name={this.props.icon} size="big"/>
        }
        let text = this.props.text;
        return (
            <div onClick={this.clickAction.bind(this)} className="home-link">
                <Link
                    className="full-size"
                    to={"/restaurant/" + path}
                    replace={true}>
                    <div className="full-size">
                        <div className="text-center top-sep">
                            {icon}
                        </div>
                        <h3 className="text-center">
                            {text}
                        </h3>
                    </div>
                </Link>
            </div>
        );
    }

}