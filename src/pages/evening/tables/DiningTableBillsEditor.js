import React from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import PaginatedList from "../../../components/widgets/PaginatedList";
import DiningTableClosingView from "./DiningTableClosingView";
import diningTablesEditorActions from "./DiningTablesEditorActions";
import Button from "../../../widgets/Button";
import {findByUuid} from "../../../utils/Utils";
import EntityEditor from "../../../components/editors/EntityEditor";
import DiningTablesUtils from "./DiningTablesUtils";
import BillEditor from "./BillEditor";

export default class DiningTableBillsEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let content = this.buildContent();

        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        {content}
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Button
                            text="Nuovo conto"
                            commitAction={() => diningTablesEditorActions.beginDiningTableClosing()}
                        />
                    </Column>
                </Row>
            </Column>
            <DiningTableClosingView
                // visible={!!this.props.data.get('currentInvoice')}
                data={this.props.data}/>
        </Row>;
    }

    buildContent(){
        if(!this.props.data.get('selectedBill')){
            return this.buildBillsList();
        }else{
            return this.buildBillEditor();
        }
    }

    buildBillsList(){
        let table = this.props.data.get('editingTable');
        return <PaginatedList
            selectMethod={uuid => diningTablesEditorActions.selectBill(uuid)}
            entities={table.get('bills')}
            renderer={bill => DiningTablesUtils.renderBill(bill, this.props.data.get('customers'))}
        />
    }

    buildBillEditor(){
        let table = this.props.data.get('editingTable');
        return <BillEditor data={this.props.data}/>;
    }
}