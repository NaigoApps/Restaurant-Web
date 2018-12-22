import React from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationsEditorActions from "./OrdinationsEditorActions";
import Button from "../../../../widgets/Button";
import PopupContainer from "../../../../components/widgets/PopupContainer";

/**
 * props:
 * ordination
 * visible
 */

export default class OrdinationActionsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <PopupContainer
            id={this.props.ordination.uuid}
            blurCallback={() => OrdinationsEditorActions.hideOptions()}
            visible={this.props.visible}>
            <div className="modal-body">
                <Row>
                    <Column>
                        <Row bitSpaced>
                            <Column>
                                <Button
                                    commitAction={() => OrdinationsEditorActions.selectOrdination(this.props.ordination)}
                                    text="Modifica"
                                    icon="pencil"/>
                            </Column>
                        </Row>
                        <Row bitSpaced>
                            <Column>
                                <Button
                                    commitAction={() => OrdinationsEditorActions.printOrdination(this.props.ordination)}
                                    type={this.props.ordination.dirty ? "warning" : "secondary"}
                                    text="Stampa"
                                    icon="print"/>
                            </Column>
                        </Row>
                        <Row bitSpaced>
                            <Column>
                                <Button
                                    commitAction={() => OrdinationsEditorActions.beginOrdinationAbortion(this.props.ordination)}
                                    text="Stampa annullamento"
                                    icon="remove"
                                    type="danger"/>
                            </Column>
                        </Row>
                        <Row bitSpaced>
                            <Column>
                                <Button
                                    commitAction={() => OrdinationsEditorActions.beginOrdinationDeletion(this.props.ordination)}
                                    text="Elimina"
                                    icon="trash"
                                    type="danger"/>
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column auto>
                        <Button text="Torna al tavolo" commitAction={() => OrdinationsEditorActions.hideOptions()}/>
                    </Column>
                </Row>
            </div>
        </PopupContainer>;
    }

}