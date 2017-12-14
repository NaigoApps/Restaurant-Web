import React from 'react';
import diningTablesEditorActions from "./DiningTablesEditorActions";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import IntegerEditor from "../../components/widgets/inputs/IntegerEditor";
import Button from "../../widgets/Button";
import {findByUuid, uuid} from "../../utils/Utils";
import {beautifyTime} from "../../components/widgets/inputs/DateInput";
import OrdinationEditor from "../../components/OrdinationEditor";
import ordinationsCreatorActions from "./OrdinationsCreatorActions";
import OrdinationCreator from "../../components/widgets/inputs/OrdinationCreator";
import ordinationsEditorActions from "./OrdinationsEditorActions";
import ButtonGroup from "../../widgets/ButtonGroup";
import OrdinationReview from "../../components/OrdinationReview";
import OrdinationsUtils from "./OrdinationsUtils";
import ordinationsActions from "./OrdinationsActions";
import PaginatedLines from "../../widgets/PaginatedLines";

export default class DiningTableReview extends React.Component {
    constructor(props) {
        super(props);
    }

    printPartialBill(){
        diningTablesEditorActions.printPartialBill(this.props.table.uuid);
    }

    static getReviewContent(props) {
        let orders = [];
        props.ordinations.forEach(ordination => {
            ordination.orders.forEach(order => {
                orders.push(order);
            });
        });
        orders = OrdinationsUtils.implode(orders);
        let ordersComponents = orders.map(o => {
            return <div key={o.order.dish + uuid()}>
                <p className="col-sm-8 text-left">{o.quantity} {findByUuid(props.dishes, o.order.dish).name}</p>
                <p className="col-sm-4 text-right">{OrdinationsUtils.formatPrice(o.price)}</p>
            </div>;
        });
        return <PaginatedLines>
            {ordersComponents}
        </PaginatedLines>;
    }

    render() {

        return <div className="form top-sep">
            <div className="row">
                <div className="col-sm-12">
                    {DiningTableReview.getReviewContent(this.props)}
                </div>
            </div>
            <div className="row top-sep">
                <div className="col-sm-12">
                    <ButtonGroup>
                        <Button text="Stampa pre-conto" icon="print"
                                commitAction={this.printPartialBill.bind(this)}/>
                        <Button text="Conto" icon="euro"
                                commitAction={this.printPartialBill.bind(this)}/>
                    </ButtonGroup>
                </div>
            </div>
        </div>;
    }
}