import React, {Component} from 'react';
import graphWizardActions from "./graph-wizard/GraphWizardActions";
import GraphWizardPage from "./graph-wizard/GraphWizardPage";
import PaginatedList from "../PaginatedList";
import SelectInput from "../inputs/SelectInput";

export default class SelectWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <GraphWizardPage>
                <SelectInput
                    id={this.props.id}
                    rows={this.props.rows}
                    cols={this.props.cols}
                    selected={this.props.selected}
                    options={this.props.options}
                    renderer={this.props.renderer}
                    colorRenderer={this.props.colorRenderer}
                    page={this.props.page}
                    onSelect={this.props.onSelect}
                    onSelectPage={this.props.onSelectPage}
                />
            </GraphWizardPage>
        )
    }

}