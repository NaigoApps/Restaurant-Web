import React, {Component} from 'react';
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";

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
                           active={number === this.props.selected}
                           text={"X " + number}
                           commitAction={this.selectQuantity.bind(this, number)}/>
        });

        return (
            <div>
                <p>Quantità</p>
                <ButtonGroup>
                    {buttons}
                </ButtonGroup>
            </div>
        );
    }

}