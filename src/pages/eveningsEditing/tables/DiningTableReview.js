import React from 'react';
import {iGet} from "../../../utils/Utils";
import OrdinationsUtils from "../OrdinationsUtils";
import Scrollable from "../../../components/widgets/Scrollable";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import DiningTablesUtils from "./DiningTablesUtils";
import FormattedParagraph from "../../../widgets/FormattedParagraph";
import OrdinationEditor from "../diningTablesEditing/ordinationsEditing/OrdinationEditor";
import {OrdinationsEditorActions} from "../diningTablesEditing/ordinationsEditing/OrdinationsEditorActions";
import SelectInput from "../../../components/widgets/inputs/SelectInput";
import {EditorStatus} from "../../StoresUtils";
import {OrdinationsCreatorActions} from "../diningTablesEditing/ordinationsEditing/OrdinationsCreatorActions";
import {OrdersActions} from "../diningTablesEditing/ordinationsEditing/ordersEditing/OrdersActions";
import Button from "../../../widgets/Button";
import ConfirmModal from "../../../widgets/ConfirmModal";
import DiningTableClosingView from "../diningTablesEditing/diningTableClosing/DiningTableClosingView";
import DiningTableOrdersReview from "./DiningTableOrdersReview";

export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deletingOrdination: false,
            deletingDiningTable: false,
            mergingDiningTable: false
        }
    }

    showDeleteDiningTableModal() {
        this.setState({
            deletingDiningTable: true
        });
    }

    doDeleteDiningTable() {
        //FIXME
        this.setState({
            deletingDiningTable: false
        });
        // DiningTablesEditingActions.deleteEveningDiningTable(iGet(this.props.data, "diningTablesEditing.diningTable.uuid"));
    }

    hideDeleteDiningTableModal() {
        this.setState({
            deletingDiningTable: false
        });
    }

    render() {
        let data = this.props.data;
        let table = iGet(data, "diningTablesEditing.diningTable");
        let ordination = iGet(data, "ordinationEditing.ordination");
        let ordinationsListPage = iGet(data, "ordinationEditing.page");
        let ordinationsEditorStatus = iGet(data, "ordinationEditing.status");
        let content = <DiningTableOrdersReview data={data}/>

        if (table.get('ordinations').size === 0 && ordinationsEditorStatus !== EditorStatus.CREATING) {
            return <Row align="center" grow>
                <Column>
                    <h3 className="text-center">Il tavolo è vuoto</h3>
                </Column>
            </Row>
        }

        if (ordinationsEditorStatus === EditorStatus.CREATING) {
            content = <OrdinationEditor data={data} actionsProvider={OrdinationsCreatorActions}/>
        } else if (ordinationsEditorStatus === EditorStatus.EDITING) {
            content = <OrdinationEditor data={data} actionsProvider={OrdinationsEditorActions}/>
        }

        let ordinationActions;

        if (ordination) {
            ordinationActions = this.getOrdinationActions(data);
        }

        return <Row grow>
            <Column>
                {content}
            </Column>
            <Column sm="4">
                <Row>
                    <Column>
                        <h5 className="text-center">Comande</h5>
                    </Column>
                </Row>
                <Row grow>
                    <Column>
                        <Row grow>
                            <Column>
                                <SelectInput
                                    id={ordination => ordination.get("uuid")}
                                    onSelectPage={page => OrdinationsEditorActions.selectOrdinationPage(page)}
                                    onSelect={ordination => OrdinationsEditorActions.beginOrdinationEditing(ordination)}
                                    onDeselect={OrdinationsEditorActions.abortOrdinationEditing}
                                    selected={ordination ? ordination.get('uuid') : null}
                                    page={ordinationsListPage}
                                    rows={4}
                                    cols={1}
                                    options={table.get('ordinations').sort(OrdinationsUtils.ordinationDateSorter)}
                                    renderer={ordination => OrdinationsUtils.renderOrdination(ordination)}
                                />
                            </Column>
                        </Row>
                        <Row>
                            {ordinationActions}
                        </Row>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    getOrdinationActions(data) {
        let ordination = iGet(data, "ordinationEditing.ordination");
        let tableUuid = iGet(data, "diningTablesEditing.diningTable.uuid");
        let ordinationUuid = ordination.get('uuid');

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <h5 className="text-center">Azioni sulla comanda</h5>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Button
                            text="Modifica comanda"
                            icon="pencil"
                            size="lg"
                            commitAction={() => OrdersActions.beginOrdersEditing(ordination.get('orders'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Stampa comanda"
                                icon="print"
                                size="lg"
                                type={ordination.get('dirty') ? "warning" : "secondary"}
                                commitAction={() => OrdinationsEditorActions.printOrdination(ordination.get('uuid'))}
                                fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button
                            text="Annullamento comanda"
                            icon="times-circle"
                            type="danger"
                            size="lg"
                            commitAction={() => OrdinationsEditorActions.abortOrdination(ordination.get('uuid'))}
                            fullHeight/>
                    </Column>
                </Row>
                <Row ofList>
                    <Column>
                        <Button text="Elimina comanda"
                                icon="trash"
                                type="danger"
                                size="lg"
                                commitAction={() => OrdinationsEditorActions.beginOrdinationDeletion()}
                                fullHeight/>
                    </Column>
                </Row>
                <ConfirmModal
                    visible={iGet(data, "ordinationEditing.deletingOrdination")}
                    message="Elminare la comanda e tutti gli ordini associati?"
                    abortType="secondary"
                    confirmType="danger"
                    abortAction={() => OrdinationsEditorActions.abortOrdinationDeletion()}
                    confirmAction={() => OrdinationsEditorActions.deleteOrdination(tableUuid, ordinationUuid)}/>
            </Column>
        </Row>;
    }


    renderDiningTable(dt) {
        return DiningTablesUtils.renderDiningTable(dt, this.props.data.get('tables'), this.props.data.get('waiters'));
    }

}