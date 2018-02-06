import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Icon from "./Icon";
import applicationStore from "../stores/ApplicationStore";
import applicationActions from "../actions/ApplicationActions";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class FullPageLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let path = this.props.path;
        let icon;
        if (this.props.icon) {
            icon = <Icon name={this.props.icon} size="big"/>
        }
        let text = this.props.text;
        return (
            <Link to={"/restaurant/" + path}
                  replace={true}>
                <div className="full-size" onClick={applicationActions.requestFullScreen}>
                    <div className="text-center top-sep">
                        {icon}
                    </div>
                    <h3 className="text-center">
                        {text}
                    </h3>
                </div>
            </Link>
        );
    }

}