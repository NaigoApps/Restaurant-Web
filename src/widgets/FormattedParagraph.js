import React, {Component} from 'react';
import Column from "./Column";
import Row from "./Row";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class FormattedParagraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let left = this.props.leftText;
        let right = this.props.rightText;

        return (
            <div>
                <Row>
                    <Column left>{left}</Column>
                    <Column right auto>{right}</Column>
                </Row>
            </div>
        );
    }

}