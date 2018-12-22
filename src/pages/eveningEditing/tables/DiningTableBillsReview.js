import React from 'react';
import Scrollable from "../../../components/widgets/Scrollable";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import BillReviewComponent from "../diningTableEditing/tableClosingFeature/BillReviewComponent";
import OrdinationsEditorActions from "../diningTableEditing/ordinationsEditing/OrdinationsEditorActions";
import CRUDStatus from "../../../utils/CRUDStatus";
import OkCancelModal from "../../../widgets/OkCancelModal";
import DiningTablesClosingActions from "../diningTableEditing/tableClosingFeature/DiningTablesClosingActions";
import BillPrintWizard from "../diningTableEditing/BillPrintWizard";

export default class DiningTableBillsReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const table = this.props.table;

        let billsComponents = table.bills.map(bill => {
            return <Row key={bill.uuid} bitSpaced>
                <Column>
                    <BillReviewComponent bill={bill} options={this.props.options}/>
                </Column>
            </Row>;
        });
        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <Scrollable>
                            {billsComponents}
                        </Scrollable>
                        <OkCancelModal
                            message="Eliminare il conto?"
                            confirmType="danger"
                            abortType="secondary"
                            visible={this.props.crudStatus === CRUDStatus.DELETE}
                            confirmAction={() => DiningTablesClosingActions.deleteBill(this.props.currentBill)}
                            abortAction={() => DiningTablesClosingActions.abortBillDeletion()}
                        />
                        <BillPrintWizard
                            bill={this.props.currentBill}
                            {...this.props.printWizard}/>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

}