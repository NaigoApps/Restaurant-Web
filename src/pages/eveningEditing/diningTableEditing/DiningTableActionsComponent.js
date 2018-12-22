import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import DiningTablesClosingActions from "./tableClosingFeature/DiningTablesClosingActions";
import OrdinationsEditorActions from "./ordinationsEditing/OrdinationsEditorActions";
import OkCancelModal from "../../../widgets/OkCancelModal";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import {DiningTableEditorTabs} from "./DiningTableEditorStore";
import ButtonGroup from "../../../widgets/ButtonGroup";

export default class DiningTableActionsComponent extends React.Component {
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
                                <ButtonGroup vertical>
                                    <Button
                                        text="Visualizza riepilogo"
                                        type="info"
                                        active={this.props.tab === DiningTableEditorTabs.REVIEW}
                                        commitAction={() => DiningTablesEditorActions.selectTab(DiningTableEditorTabs.REVIEW)}/>
                                    <Button
                                        text="Visualizza comande"
                                        type="info"
                                        active={this.props.tab === DiningTableEditorTabs.ORDINATIONS}
                                        commitAction={() => DiningTablesEditorActions.selectTab(DiningTableEditorTabs.ORDINATIONS)}/>
                                    <Button
                                        text="Visualizza conti"
                                        type="info"
                                        active={this.props.tab === DiningTableEditorTabs.BILLS}
                                        commitAction={() => DiningTablesEditorActions.selectTab(DiningTableEditorTabs.BILLS)}/>
                                </ButtonGroup>
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <Button
                                    text="Nuova comanda"
                                    type="success"
                                    commitAction={() => OrdinationsEditorActions.beginCreation(EntitiesUtils.newOrdination(this.props.table))}
                                />
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column>
                                <ButtonGroup vertical>
                                    <Button
                                        text="Nuovo conto"
                                        type="success"
                                        disabled={this.props.table.canBeClosed() || this.props.table.listOpenedOrders().length === 0}
                                        commitAction={() => DiningTablesClosingActions.beginCreation(EntitiesUtils.newBill(this.props.table))}
                                    />
                                    <Button
                                        text="Conto rapido"
                                        type="success"
                                        disabled={this.props.table.canBeClosed() || this.props.table.listOpenedOrders().length === 0}
                                        commitAction={() => DiningTablesClosingActions.quickBill(this.props.table)}
                                    />
                                </ButtonGroup>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        <Button
                            text="Avanzate"
                            type="info"
                            commitAction={() => DiningTablesEditorActions.showAdvanced()}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

}