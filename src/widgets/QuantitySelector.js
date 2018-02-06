import React, {Component} from 'react';
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import Row from "./Row";
import Column from "./Column";

export default class QuantitySelector extends Component {
    constructor(props) {
        super(props);
    }

    selectQuantity(number) {
        if (this.props.commitAction) {
            this.props.commitAction(number);
        }
    }

    render() {

        let buttons = this.props.numbers.map(number => {
            return <Button key={number}
                           size="lg"
                           active={number === this.props.selected}
                           text={number}
                           commitAction={this.selectQuantity.bind(this, number)}/>
        });

        return (
            <Row>
                <Column auto>Quantità</Column>
                <Column>
                    <ButtonGroup>
                        {buttons}
                    </ButtonGroup>
                </Column>
            </Row>
        );
    }

}