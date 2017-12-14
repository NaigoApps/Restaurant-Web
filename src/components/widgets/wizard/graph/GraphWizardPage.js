import React, {Component} from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";

/**
 * function canEnter(data) -> true if page can be accessed
 */

export default class GraphWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    static initializeWizard(props) {
        if (props.initializer !== undefined) {
            if (typeof props.initializer === "function") {
                return props.initializer();
            } else {
                return props.initializer;
            }
        }
        return null;
    }

    render() {
        return (
            <Row>
                <Column>
                    {this.props.children}
                </Column>
            </Row>
        )
    }

}