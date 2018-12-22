import React from 'react';
import FloatEditor from "../../../../components/widgets/inputs/float/FloatEditor";
import OrdersEditorActions from "../ordinationsEditing/OrdersEditorActions";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import OrdinationsUtils from "../../OrdinationsUtils";

export default class OrderEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row align="center">
            <Column auto>
                {OrdinationsUtils.renderOrder(this.props.order)}
            </Column>
            <Column/>
            <Column auto>
                <FloatEditor
                    options={{
                        value: this.props.order.price,
                        min: 0.01,
                        callback: price => OrdersEditorActions.updatePrice(this.props.order, price)
                    }}
                    currency
                />
            </Column>
        </Row>;
    }


}