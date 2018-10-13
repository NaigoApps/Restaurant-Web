import React from 'react';
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";

export default class BillsSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props;
        return <Row grow>
            <Column>
                CONTI
            </Column>
        </Row>
    }
}