import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import GraphWizard from "../../components/widgets/wizard/GraphWizard";
import DiningTableClosingWizardPage from "./DiningTableClosingWizardPage";

export default class DiningTableClosingView extends React.Component {
    constructor(props) {
        super(props);
    }

    abortDiningTableClosing() {
        diningTablesEditorActions.abortDiningTableClosing();
    }

    render() {
        return <GraphWizard
            abortAction={this.abortDiningTableClosing}
            visible={this.props.visible}
            renderer={data => ""}
            hideForm>
            <DiningTableClosingWizardPage
                dishes={this.props.dishes}
                additions={this.props.additions}
                table={this.props.diningTable}
                ordinations={this.props.ordinations}
                invoice={this.props.invoice}
            />
        </GraphWizard>;
    }
}