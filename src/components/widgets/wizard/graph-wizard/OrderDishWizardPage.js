import React, {Component} from 'react';
import {findByUuid, iGet} from "../../../../utils/Utils";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import NavElement from "../../../../widgets/NavElement";
import SelectInput from "../../inputs/SelectInput";
import {OrdersActions} from "../../../../pages/eveningEditing/diningTableEditing/ordinationsEditing/ordersEditing/OrdersActions";
import OrdinationOrdersReview
    from "../../../../pages/eveningEditing/diningTableEditing/ordinationsEditing/OrdinationOrdersReview";
import IntegerEditor from "../../inputs/IntegerEditor";
import SelectEditor from "../../inputs/SelectEditor";

const {List, fromJS} = require('immutable');

export default class OrderDishWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollPulse: 0
        };
    }

    confirmDish(dish) {
        this.setState((prevState) => {
            return {
                scrollPulse: prevState.scrollPulse + 1
            }
        });
    }

    render() {
        let data = this.props.data;
        let orders = iGet(data, "ordersEditing.orders");
        let selectedCategory = iGet(data, "ordersEditing.selectedCategory");

        let nav = this.buildNav();
        let content = null;
        if (selectedCategory) {
            content = this.buildDishesContent(selectedCategory);
        } else {
            content = this.buildCategoriesContent();
        }

        let quantity = iGet(data, "ordersEditing.quantity");

        let sampleOrder = this.props.wizardData["editing"];

        let availablePhases = data.get('phases');
        let selectedPhase = iGet(data, 'ordersEditing.selectedPhase');

        return (<Row grow>
                <Column lg="6">
                    <Row grow>
                        <Column>
                            <OrdinationOrdersReview
                                data={data}
                                orders={orders}
                            />
                        </Column>
                    </Row>
                </Column>
                <Column lg="6">
                    <Row>
                        <Column>
                            <IntegerEditor
                                type="info"
                                options={{
                                    label: "Quantità",
                                    value: quantity,
                                    callback: result => OrdersActions.quantityConfirm(result),
                                    min: 1
                                }}
                            />
                        </Column>
                        <Column>
                            <SelectEditor
                                type="info"
                                options={{
                                    rows: 2,
                                    cols: 2,
                                    label: "Portata",
                                    values: availablePhases,
                                    id: p => p.get('uuid'),
                                    renderer: p => p ? p.get('name') : "",
                                    value: selectedPhase,
                                    callback: result => OrdersActions.selectPhase(result)
                                }}
                            />
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            <Row>
                                <Column>
                                    {nav}
                                </Column>
                            </Row>
                            <Row ofList>
                                <Column>
                                    {content}
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </Column>
            </Row>
        )
    }

    buildNav() {
        let data = this.props.data;
        let selectedCategory = iGet(data, "ordersEditing.selectedCategory");
        let buttons = [];
        buttons.push(<NavElement
            key="categories"
            text="Categorie"
            active={!selectedCategory}
            commitAction={() => OrdersActions.selectCategory(null)}
        />);
        if (selectedCategory) {
            buttons.push(<NavElement
                key="dishes"
                text={this.findCategory(selectedCategory).get('name')}
                active={true}
            />);
        }
        return <Row>
            {buttons}
        </Row>;
    }

    findCategory(catUuid) {
        return findByUuid(this.props.data.get('categories'), catUuid);
    }

    findDish(dishUuid) {
        return findByUuid(this.props.data.get('dishes'), dishUuid);
    }

    buildCategoriesContent() {
        let data = this.props.data;
        let selectedCategory = iGet(data, "ordersEditing.selectedCategory");
        let categoryPage = iGet(data, "ordersEditing.categoryPage");
        let availableCategories = this.props.data.get('categories');
        return <SelectInput
            rows={4}
            cols={3}
            id={cat => cat.get('uuid')}
            options={availableCategories}
            renderer={cat => cat.get('name')}
            selected={selectedCategory}
            page={categoryPage}
            onSelectPage={page => OrdersActions.selectCategoryPage(page)}
            onSelect={cat => OrdersActions.selectCategory(cat)}
            onDeselect={() => OrdersActions.selectCategory(null)}
            alwaysShowPages
        />;
    }

    buildDishesContent(categoryUuid) {
        let data = this.props.data;
        let selectedDish = iGet(data, "ordersEditing.selectedDish");
        let dishPage = iGet(data, "ordersEditing.dishPage");
        let availableDishes = this.props.data.get('dishes')
            .filter(dish => dish.get('status') === "ATTIVO")
            .filter(dish => dish.get('category') === categoryUuid);
        return <SelectInput
            rows={4}
            cols={2}
            id={dish => dish.get('uuid')}
            options={availableDishes}
            renderer={dish => dish.get('name')}
            selected={selectedDish}
            page={dishPage}
            onSelectPage={page => OrdersActions.selectDishPage(page)}
            onSelect={dish => OrdersActions.selectDish(dish)}
            alwaysShowPages
        />;
    }
}