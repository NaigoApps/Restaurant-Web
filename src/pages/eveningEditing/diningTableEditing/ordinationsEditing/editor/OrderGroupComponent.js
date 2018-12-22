import React from 'react';
import OrdinationsUtils from "../../../OrdinationsUtils";
import Row from "../../../../../widgets/Row";
import Column from "../../../../../widgets/Column";
import ClickableRow from "../../../../../widgets/ClickableRow";
import OrdersEditorActions from "../OrdersEditorActions";
import FormattedParagraph from "../../../../../widgets/FormattedParagraph";

export default class OrderGroupComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(){
        if(this.props.selected){
            OrdersEditorActions.deselectOrders();
        }else{
            OrdersEditorActions.selectOrders(this.props.group.orders);
        }
    }

    render() {
        const group = this.props.group;

        const result = OrdinationsUtils.renderImplodedOrder(group);
        const rightText = OrdinationsUtils.formatGroupPrice(group);

        return <Row>
            <Column>
                <ClickableRow
                    selected={this.props.selected}
                    align="center"
                    onClick={() => this.onClick()}
                    bitSpaced>
                    <Column>
                        <Row align="center">
                            <Column>
                                <FormattedParagraph
                                    leftText={result}
                                    rightText={rightText}
                                    bgBlink={group.price === 0 ? "warning" : null}/>
                            </Column>
                        </Row>
                    </Column>
                </ClickableRow>
            </Column>
        </Row>;
    }
}