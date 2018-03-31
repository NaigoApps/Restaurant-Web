import React, {Component} from 'react';
import graphWizardActions from "./graph-wizard/GraphWizardActions";
import GraphWizardPage from "./graph-wizard/GraphWizardPage";
import PaginatedList from "../PaginatedList";

export default class SelectWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectOption(option) {
        graphWizardActions.setWizardData(this.props.wizardId, option, this.props.identifier);
    }

    render() {

        return (
            <GraphWizardPage>
                <PaginatedList
                    rows={this.props.rows}
                    cols={this.props.cols}
                    selected={this.props.wizardData[this.props.identifier]}
                    entities={this.props.options}
                    renderer={this.props.renderer}
                    colorRenderer={this.props.colorRenderer}
                    selectMethod={entity => this.selectOption(entity)}
                    deselectMethod={() => {}}
                />
            </GraphWizardPage>
        )
    }

}