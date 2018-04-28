import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import DiningTableClosingView from "../diningTablesEditing/diningTableClosing/DiningTableClosingView";
import Button from "../../../widgets/Button";
import {iGet} from "../../../utils/Utils";
import DiningTablesUtils from "./DiningTablesUtils";
import BillReview from "./BillReview";
import RoundButton from "../../../widgets/RoundButton";
import {DiningTablesClosingActions} from "../diningTablesEditing/diningTableClosing/DiningTablesClosingActions";
import SelectInput from "../../../components/widgets/inputs/SelectInput";
import {OrdinationsEditorActions} from "../diningTablesEditing/ordinationsEditing/OrdinationsEditorActions";
import DiningTableOrdersReview from "./DiningTableOrdersReview";
import {OrdersActions} from "../diningTablesEditing/ordinationsEditing/ordersEditing/OrdersActions";
import ConfirmModal from "../../../widgets/ConfirmModal";

export default class DiningTableBillsEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let customers = data.get('customers');
        let table = iGet(data, 'diningTablesEditing.diningTable');

        let bill = iGet(data, "diningTableClosing.selectedBill");
        let billPage = iGet(data, "diningTableClosing.billPage");

        let content = this.buildContent();

        // if (table.get('bills').size === 0) {
        //     return <Row grow align="center">
        //         <Column align="center">
        //             <RoundButton
        //                 text="Nuovo conto"
        //                 type="info"
        //                 icon="plus"
        //                 commitAction={() => DiningTablesClosingActions.beginClosing()}
        //             />
        //         </Column>
        //         <DiningTableClosingView
        //             visible={!!iGet(data, "diningTableClosing.wizardVisible")}
        //             data={data}/>
        //     </Row>
        // }

        let billActions;

        if (bill) {
            billActions = this.getBillActions(data);
        }

        return <Row grow>
            <Column>
                {content}
            </Column>
            <Column sm="4">
                <Row>
                    <Column>
                        <h5 className="text-center">Conti</h5>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <Row grow>
                            <Column>
                                <SelectInput
                                    id={bill => bill.get("uuid")}
                                    onSelectPage={page => DiningTablesClosingActions.selectBillPage(page)}
                                    onSelect={bill => DiningTablesClosingActions.selectBill(bill)}
                                    onDeselect={() => DiningTablesClosingActions.deselectBill()}
                                    selected={bill ? bill.get('uuid') : null}
                                    page={billPage}
                                    rows={4}
                                    cols={1}
                                    options={table.get('bills')}
                                    renderer={bill => DiningTablesUtils.renderBill(bill, customers)}
                                />
                            </Column>
                        </Row>
                        <Row>
                            {billActions}
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    buildContent() {
        if (iGet(this.props.data, "diningTableClosing.selectedBill")) {
            return <BillReview data={this.props.data}/>
        }
        return <DiningTableOrdersReview data={this.props.data}/>;
    }


    getBillActions(data) {
        let bill = iGet(data, "diningTableClosing.selectedBill");
        let tableUuid = iGet(data, "diningTablesEditing.diningTable.uuid");
        let billUuid = bill.get('uuid');

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <h5 className="text-center">Azioni sul conto</h5>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Button text="Stampa conto"
                                icon="print"
                                size="lg"
                                type={!bill.get('printed') ? "warning" : "secondary"}
                                commitAction={() => DiningTablesClosingActions.printBill(bill.get('uuid'))}
                                fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Elimina conto"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => DiningTablesClosingActions.beginBillDeletion()}
                                fullHeight/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={iGet(data, "diningTableClosing.deletingBill")}
                    message="Elminare il conto?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => DiningTablesClosingActions.abortBillDeletion()}
                    confirmAction={() => DiningTablesClosingActions.deleteBill(tableUuid, billUuid)}/>
            </Column>
        </Row>;
    }


}