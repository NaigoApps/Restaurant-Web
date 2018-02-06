import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import GraphWizard from "../../../components/widgets/wizard/GraphWizard";
import DiningTableClosingWizardPage from "./DiningTableClosingWizardPage";

export default class DiningTableClosingView extends React.Component {
    constructor(props) {
        super(props);
    }

    abortDiningTableClosing() {
        diningTablesEditorActions.abortDiningTableClosing();
    }

    confirmInvoice(){
        diningTablesEditorActions.createBill(this.props.data.table.uuid, this.props.data.invoice.orders);
    }

    render() {
        return <GraphWizard
            abortAction={this.abortDiningTableClosing}
            commitAction={() => this.confirmInvoice()}
            visible={this.props.visible}
            isValid={() => this.isInvoiceValid()}
            renderer={data => ""}
            size="lg"
            hideForm>
            <DiningTableClosingWizardPage
                data={this.props.data}

            />
        </GraphWizard>;
    }

    isInvoiceValid() {
        let data = this.props.data;
        return !!data.invoice && !!data.invoice.orders && data.invoice.orders.length > 0;
    }

}