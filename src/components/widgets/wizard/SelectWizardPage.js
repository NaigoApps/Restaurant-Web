import React, {Component} from 'react';
import SelectInput from "../inputs/SelectInput";
import ScrollableSelectInput from "../inputs/ScrollableSelectInput";

export default class SelectWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ScrollableSelectInput
                options={this.props.options}
                selected={this.props.selected}
                renderer={this.props.renderer}
                onSelect={this.props.onSelect}
            />
        )
    }

}