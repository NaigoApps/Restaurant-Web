import React from 'react';
import {findByUuid} from "../../../utils/Utils";
import DiningTableReview from "./DiningTableReview";
import DiningTableDataEditor from "./DiningTableDataEditor";
import DiningTableBillsEditor from "./DiningTableBillsEditor";

export default class DiningTableEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    getOrdersEditor(ordination) {
        let props = this.props.data;
        let ordersEditor = ordination.get('orders').map(o => {
            return <div className="row">{findByUuid(props.get('dishes'), o.get('dish')).get('name')}</div>;
        });
        return <div>
            {ordersEditor}
        </div>;
    }


    render() {

        let table = this.props.data.get("editingTable");
        let isEditingData = this.props.data.get('editingTableData');
        let isEditingBills = this.props.data.get('editingTableBills');

        if (isEditingData) {
            return <DiningTableDataEditor data={this.props.data}/>
        }
        if(isEditingBills){
            return <DiningTableBillsEditor data={this.props.data}/>
        }

        return <DiningTableReview data={this.props.data}/>;


    }


}