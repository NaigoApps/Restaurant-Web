import React from 'react';
import {iGet} from "../../../utils/Utils";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import {DiningTablesCreatorActions} from "./DiningTablesCreatorActions";
import Button from "../../../widgets/Button";
import DiningTableDataEditor from "./DiningTableDataEditor";
import RoundButton from "../../../widgets/RoundButton";

export default class DiningTableCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let table = iGet(this.props.data, "diningTablesEditing.diningTable");
        let uuid = table.get('uuid');
        let editorData = iGet(this.props.data, 'diningTablesEditing.editor');

        return <Row grow>
            <Column>
                <Row>
                    <Column>
                        <DiningTableDataEditor data={this.props.data} actionsProvider={DiningTablesCreatorActions}/>
                    </Column>
                </Row>
                <Row justify="center" grow>
                    <Column justify="center" align="center">
                        <RoundButton
                            icon="check"
                            type="success"
                            size="lg"
                            commitAction={() => DiningTablesCreatorActions.onConfirm(table)}
                        />
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    isValid() {
        let table = iGet(this.props.data, "diningTablesEditing.diningTable");
        return table.get("waiter") && table.get("table") && table.get("coverCharges") > 0;
    }
}