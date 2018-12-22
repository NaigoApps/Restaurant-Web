import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import DiningTablesUtils from "../tables/DiningTablesUtils";
import BillCreationWizard from "./tableClosingFeature/BillCreationWizard";
import DiningTableReview from "../tables/DiningTableReview";
import CRUDStatus from "../../../utils/CRUDStatus";
import OrdinationEditor from "./ordinationsEditing/editor/OrdinationEditor";
import DiningTableActionsComponent from "./DiningTableActionsComponent";
import DiningTableAdvancedActionsComponent from "./DiningTableAdvancedActionsComponent";

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const ordinationEditing = this.props.ordinationEditing;
        const ordersEditing = this.props.ordersEditing;

        if (ordinationEditing.crudStatus === CRUDStatus.CREATE ||
            ordinationEditing.crudStatus === CRUDStatus.UPDATE) {
            return <OrdinationEditor
                data={this.props.data}
                table={this.props.currentTable}
                crudStatus={ordinationEditing.crudStatus}
                ordination={ordinationEditing.currentOrdination}
                editorData={ordinationEditing.wizardData}
                selectedGroup={ordersEditing.currentOrders}
            />
        }

        let actionsComponent;
        if(this.props.advanced){
            actionsComponent = <DiningTableAdvancedActionsComponent
                tab={this.props.tab}
                deleting={this.props.crudStatus === CRUDStatus.DELETE}
                table={this.props.currentTable}
                merging={this.props.merging}
                closing={this.props.billsEditing.lockingTable}
                mergeTarget={this.props.mergeTarget}
            />
        }else{
            actionsComponent = <DiningTableActionsComponent
                tab={this.props.tab}
                deleting={this.props.crudStatus === CRUDStatus.DELETE}
                table={this.props.currentTable}
            />
        }

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        <DiningTableReview {...this.props}/>
                        <BillCreationWizard {...this.props}/>
                    </Column>
                </Row>
            </Column>
            <Column auto>
                {actionsComponent}
            </Column>
        </Row>
    }

}