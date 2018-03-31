import React, {Component} from 'react';
import SelectWizardPage from "../wizard/SelectWizardPage";
import {findByUuid} from "../../../utils/Utils";
import GraphWizard from "../wizard/graph-wizard/GraphWizard";

export default class EntitySelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData) {
        this.props.commitAction(wData["select_page"].get('uuid'));
    }

    wizardRenderer(wData){
        let uuid = wData['select_page'];
        if(uuid) {
            let entity = findByUuid(this.props.options, uuid);
            if (uuid && !entity) {
                console.error(uuid + " not found")
            }
            if (entity) {
                return this.props.renderer(entity)
            }
        }
        return "?"
    }

    render() {
        const renderer = this.props.renderer;
        const options = this.props.options;
        const label = this.props.label;
        const value = this.props.value;

        return (
            <GraphWizard
                isValid={wData => !!wData["select_page"]}
                hideReview={true}
                initialPage="select_page"
                label={label}
                size="lg"
                renderer={wData => this.wizardRenderer(wData)}
                commitAction={this.onWizardConfirm.bind(this)}>
                <SelectWizardPage
                    rows={this.props.rows}
                    cols={this.props.cols}
                    identifier="select_page"
                    initializer={value}
                    id={entity => entity.get('uuid')}
                    options={options}
                    renderer={renderer}
                    colorRenderer={this.props.colorRenderer}
                />
            </GraphWizard>
        );

    }

}