import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import DiningTablesClosingActions from "./tableClosingFeature/DiningTablesClosingActions";
import OkCancelModal from "../../../widgets/OkCancelModal";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import ButtonGroup from "../../../widgets/ButtonGroup";
import DiningTableMergeDialog from "./DiningTableMergeDialog";
import DiningTableStatus from "../../../model/DiningTableStatus";

export default class DiningTableAdvancedActionsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row grow>
            <Column justify="space-between">
                <Row>
                    <Column>
                        <Row>
                            <Column>
                                <h3>Azioni sul tavolo</h3>
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <Button
                                    text="Fondi tavolo"
                                    type="warning"
                                    commitAction={() => DiningTablesEditorActions.beginMerge()}
                                />
                                <DiningTableMergeDialog table={this.props.table}
                                                        visible={this.props.merging}
                                                        mergeTarget={this.props.mergeTarget}/>
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <Button
                                    text="Chiudi tavolo"
                                    disabled={!this.canCloseTable()}
                                    type="warning"
                                    commitAction={() => DiningTablesClosingActions.beginLocking()}
                                />
                                <OkCancelModal
                                    visible={this.props.closing}
                                    message="I conti non chiusi saranno persi"
                                    confirmMessage="Procedi comunque"
                                    confirmType="warning"
                                    abortType="secondary"
                                    confirmAction={() => DiningTablesClosingActions.lockTable(this.props.table)}
                                    abortAction={() => DiningTablesClosingActions.abortLocking()}
                                />
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <Button
                                    text="Elimina tavolo"
                                    type="danger"
                                    commitAction={() => DiningTablesEditorActions.beginDeletion()}
                                />
                            </Column>
                            <OkCancelModal visible={this.props.deleting}
                                           message="Eliminare il tavolo?"
                                           confirmType="danger"
                                           abortType="secondary"
                                           confirmAction={() => DiningTablesEditorActions.doDelete(this.props.table)}
                                           abortAction={() => DiningTablesEditorActions.abortDeletion()}/>
                        </Row>
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        <Button
                            text="Base"
                            type="info"
                            commitAction={() => DiningTablesEditorActions.hideAdvanced()}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    canCloseTable(){
        return this.props.table.status !== DiningTableStatus.CLOSED &&
            this.props.table.listOpenedOrders().length === 0 &&
            this.props.table.listOpenedCoverCharges() === 0;
    }

}