import React from 'react';
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import Button from "../../../../widgets/Button";
import GroupEditorPanel from "./GroupEditorPanel";
import {OrdersActions} from "./ordersEditing/OrdersActions";
import {iGet} from "../../../../utils/Utils";

export default class GroupEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let grp = this.props.group;
        let editingGroup = iGet(this.props.data, "ordersEditing.editingGroup");

        let panel;
        if (editingGroup === grp.get('groupId')) {
            panel = <GroupEditorPanel>
                <Row>
                    <Column>
                        <Button
                            icon="trash"
                            type="danger"
                            size="lg"
                            commitAction={() => this.props.trashAction(grp)}
                            highPadding
                        />
                    </Column>
                </Row>
            </GroupEditorPanel>;
        }

        return <Row>
            <Column>
                <Button icon={editingGroup === grp.get('groupId') ? "caret-left" : "caret-right"}
                        active={editingGroup === grp.get('groupId')}
                        commitAction={() => OrdersActions.toggleGroupEditing(grp)}
                        highPadding
                />
                {panel}
            </Column>
        </Row>
    }

}