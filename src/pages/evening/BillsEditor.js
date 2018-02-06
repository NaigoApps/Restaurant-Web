import React from 'react';
import diningTablesEditorActions from "./tables/DiningTablesEditorActions";
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import BillReview from "./BillReview";

export default class BillsEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let props = this.props.data;

        if (props.selectedBill) {
            return <BillReview data={BillsEditor.makeBillEditorDescriptor(props)}/>;
        } else {
            return (
                <Row key="bills" topSpaced>
                    <Column>
                        <PaginatedEntitiesList
                            entities={props.diningTable.bills}
                            renderer={(bill) => this.renderBill(bill)}
                            selectMethod={diningTablesEditorActions.selectBill}
                            deselectMethod={diningTablesEditorActions.deselectBill}
                        />
                    </Column>
                </Row>);
        }

    }

    static makeBillEditorDescriptor(props) {
        return {
            table: props.diningTable,
            dishes: props.dishes,
            additions: props.additions,
            bill: props.selectedBill
        };
    }

    renderBill(bill) {
        return "Scontrino " + bill.progressive;
    }
}