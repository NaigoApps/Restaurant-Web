import React, {Component} from 'react';
import graphWizardActions from "./graph-wizard/GraphWizardActions";
import GraphWizardPage from "./graph-wizard/GraphWizardPage";
import PaginatedList from "../PaginatedList";

export default class MultiSelectWizardPage extends Component {
    constructor(props) {
        super(props);
    }

    selectOption(option) {
        let oldData = this.props.wizardData[this.props.identifier];
        oldData = oldData.push(option);
        graphWizardActions.setWizardData(this.props.wizardId, oldData, this.props.identifier);
        console.log(oldData)
    }

    deselectOption(option) {
        let oldData = this.props.wizardData[this.props.identifier];
        oldData = oldData.remove(oldData.indexOf(option));
        graphWizardActions.setWizardData(this.props.wizardId, oldData, this.props.identifier);
        console.log(oldData)
    }

    render() {

        return (
            <GraphWizardPage>
                <PaginatedList
                    id={this.props.id}
                    rows={this.props.rows}
                    cols={this.props.cols}
                    selected={this.props.wizardData[this.props.identifier]}
                    entities={this.props.options}
                    renderer={this.props.renderer}
                    colorRenderer={this.props.colorRenderer}
                    selectMethod={entity => this.selectOption(entity)}
                    deselectMethod={entity => this.deselectOption(entity)}
                    multiSelect={true}
                />
            </GraphWizardPage>
        )
    }

}