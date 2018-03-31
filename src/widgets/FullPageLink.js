import React, {Component} from 'react';
import applicationActions from "../actions/ApplicationActions";
import Button from "./Button";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class FullPageLink extends Component {
    constructor(props) {
        super(props);
    }

    goToPage(page) {
        applicationActions.requestFullScreen()
        applicationActions.goToPage(page);
    }

    render() {
        return (
            <Button
                separator={<br/>}
                size="xl"
                icon={this.props.icon}
                text={this.props.text}
                commitAction={() => this.goToPage(this.props.page)}
                fullHeight
            />
        );
    }

}