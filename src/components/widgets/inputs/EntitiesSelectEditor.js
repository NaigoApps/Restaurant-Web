import React, {Component} from 'react';
import {findByUuid} from "../../../utils/Utils";
import GraphWizard from "../wizard/graph-wizard/GraphWizard";
import MultiSelectWizardPage from "../wizard/MultiSelectWizardPage";

export default class EntitiesSelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData) {
        this.props.commitAction(wData["select_page"]);
    }

    wizardRenderer(wData){
        let uuids = wData['select_page'];
        if(uuids && uuids.size > 0) {
            let texts = [];
            for(let i = 0;i < uuids.size;i++){
                let entity = findByUuid(this.props.options, uuids.get(i));
                if (uuids.get(i) && !entity) {
                    console.error(uuids.get(i) + " not found")
                }
                if (entity) {
                    texts.push(this.props.renderer(entity));
                }
            }
            if(texts.length > 10){
                texts.splice(5, texts.length - 10 , "...");
            }
            return texts.join(", ");
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
                isValid={() => true}
                hideReview={true}
                initialPage="select_page"
                labelSize={this.props.labelSize}
                buttonSize={this.props.buttonSize}
                label={label}
                size="lg"
                renderer={wData => this.wizardRenderer(wData)}
                commitAction={this.onWizardConfirm.bind(this)}>
                <MultiSelectWizardPage
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