import React from 'react';
import Wizard from "../../../../components/widgets/wizard/Wizard";
import DiningTableClosingModePage from "./DiningTableClosingModePage";
import DiningTableClosingSplitPage from "./DiningTableClosingSplitPage";
import DiningTableClosingReviewPage from "./DiningTableClosingReviewPage";
import DiningTablesClosingActions from "./DiningTablesClosingActions";
import {DiningTableClosingWizardPages} from "./TableClosingFeatureStore";
import DiningTableClosingFixPage from "./DiningTableClosingFixPage";

const smallPages = [DiningTableClosingWizardPages.MODE_PAGE, DiningTableClosingWizardPages.FIX_PAGE];

export default class BillCreationWizard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props;
        let wizardData = data.billsEditing.closingWizard;
        let wizardPages = this.buildWizardPages();
        let page = wizardData.page;
        let pages = wizardData.pages;
        const bill = data.billsEditing.currentBill;
        return <Wizard
            id="bill-wizard"
            abortAction={() => DiningTablesClosingActions.abortCreation(bill)}
            confirmAction={() => DiningTablesClosingActions.create(bill)}
            backwardAction={() => DiningTablesClosingActions.backward()}
            forwardAction={() => DiningTablesClosingActions.forward()}
            visible={wizardData.visible}
            currentPage={page}
            renderer={data => ""}
            size={pages.length > page && smallPages.includes(pages[page]) ? "sm" : "lg"}>
            {wizardPages}
        </Wizard>;
    }

    buildWizardPages() {
        let data = this.props;
        let wizardData = data.billsEditing.closingWizard;
        let pages = [];
        if (wizardData && wizardData.visible) {
            if (wizardData.pages.includes(DiningTableClosingWizardPages.FIX_PAGE)) {
                pages.push(<DiningTableClosingFixPage key="fix_page" table={data.currentTable}/>);
            }
            if (wizardData.pages.includes(DiningTableClosingWizardPages.MODE_PAGE)) {
                pages.push(<DiningTableClosingModePage
                    isValid={true}
                    key="mode_page"
                    title="Selezionare il tipo di conto"
                    {...data}
                    wizardData={wizardData}
                />);
            }
            let invoiceOrders = data.billsEditing.currentBill.orders;
            if (wizardData.pages.includes(DiningTableClosingWizardPages.SPLIT_PAGE)) {
                pages.push(<DiningTableClosingSplitPage
                    key="split_page"
                    title="Selezionare gli ordini da includere nel conto"
                    table={this.props.currentTable}
                    {...data}
                    isValid={invoiceOrders && invoiceOrders.length > 0}
                    wizardData={wizardData}
                />);
            }
            if (wizardData.pages.includes(DiningTableClosingWizardPages.REVIEW_PAGE)) {
                pages.push(<DiningTableClosingReviewPage
                    key="review_page"
                    title="Riepilogo"
                    table={this.props.currentTable}
                    {...data}
                    isValid={invoiceOrders && invoiceOrders.length > 0}
                    wizardData={wizardData}
                />);
            }
        }
        return pages;
    }

}