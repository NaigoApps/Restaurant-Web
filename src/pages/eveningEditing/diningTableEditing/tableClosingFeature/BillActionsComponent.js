import React from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Button from "../../../../widgets/Button";
import PopupContainer from "../../../../components/widgets/PopupContainer";
import DiningTablesClosingActions from "./DiningTablesClosingActions";

export default class BillActionsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const bill = this.props.bill;
        return <PopupContainer
            id={bill.uuid}
            blurCallback={() => DiningTablesClosingActions.hideOptions()}
            visible={this.props.visible}>
            <div className="modal-body">
                <Row>
                    <Column>
                        <Row bitSpaced>
                            <Column>
                                <Button
                                    commitAction={() => DiningTablesClosingActions.select(bill)}
                                    text="Modifica"
                                    disabled={true}
                                    icon="pencil"/>
                            </Column>
                        </Row>
                        <Row bitSpaced>
                            <Column>
                                <Button
                                    commitAction={() => DiningTablesClosingActions.beginBillSoftPrinting(bill)}
                                    text="Stampa preconto"
                                    icon="print"/>
                            </Column>
                        </Row>
                        <Row bitSpaced>
                            <Column>
                                <Button
                                    commitAction={() => DiningTablesClosingActions.beginBillPrinting(bill)}
                                    text="Stampa"
                                    disabled={!bill.isGeneric()}
                                    icon="print"/>
                            </Column>
                        </Row>
                        <Row bitSpaced>
                            <Column>
                                <Button
                                    commitAction={() => DiningTablesClosingActions.beginBillDeletion(bill)}
                                    type="danger"
                                    text="Elimina"
                                    icon="trash"/>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column auto>
                        <Button text="Torna al tavolo" commitAction={() => DiningTablesClosingActions.hideOptions()}/>
                    </Column>
                </Row>
            </div>
        </PopupContainer>;
    }

}