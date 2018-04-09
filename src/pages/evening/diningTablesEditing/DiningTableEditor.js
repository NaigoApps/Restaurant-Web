import React from 'react';
import {findByUuid, iGet} from "../../../utils/Utils";
import DiningTableReview from "../tables/DiningTableReview";
import DiningTableDataEditor from "./DiningTableDataEditor";
import DiningTableBillsEditor from "../tables/DiningTableBillsEditor";
import OrdinationEditor from "./ordinationsEditing/OrdinationEditor";

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
        let data = this.props.data;

        //FIXME
        let isEditingData = data.get('editingTableData');
        let isEditingBills = data.get('editingTableBills');

        let ordination = iGet(data, "ordinationEditing.ordination");

        if(ordination){
            return <OrdinationEditor data={data}/>
        }

        if (isEditingData) {
            return <DiningTableDataEditor data={data}/>
        }
        if(isEditingBills){
            return <DiningTableBillsEditor data={data}/>
        }

        return <DiningTableReview data={data}/>;
    }


}