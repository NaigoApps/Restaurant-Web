import React, {Component} from 'react';
import Row from "../../../../../widgets/Row";
import Column from "../../../../../widgets/Column";
import NavElement from "../../../../../widgets/NavElement";
import OrdinationsEditorActions from "../OrdinationsEditorActions";
import DishStatus from "../../../../../model/DishStatus";
import IntegerEditor from "../../../../../components/widgets/inputs/IntegerEditor";
import SelectEditor from "../../../../../components/widgets/inputs/SelectEditor";
import SelectInput from "../../../../../components/widgets/inputs/SelectInput";
import Button from "../../../../../widgets/Button";
import OrdersEditorActions from "../OrdersEditorActions";
import TextEditor from "../../../../../components/widgets/inputs/TextEditor";
import FloatEditor from "../../../../../components/widgets/inputs/float/FloatEditor";
import CRUDStatus from "../../../../../utils/CRUDStatus";
import OrdinationSelectableComponent from "./OrdinationSelectableComponent";
import {DataContext} from "../../../EveningPage";

export default class OrdinationEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <DataContext.Consumer>
            {value => this.buildContent(value)}
        </DataContext.Consumer>
    }

    buildContent(data) {
        const ordination = this.props.ordination;
        const selectedGroup = this.props.selectedGroup;
        if (ordination) {
            const controls = this.buildControls(data);

            return (<Row grow>
                    <Column lg="6">
                        <Row grow>
                            <Column>
                                <OrdinationSelectableComponent
                                    ordination={ordination}
                                    selectedGroup={selectedGroup}
                                    scrollable={true}/>
                            </Column>
                        </Row>
                    </Column>
                    <Column lg="6" justify="space-between">
                        {controls}
                    </Column>
                </Row>
            )
        }
        return <div/>;
    }

    buildControls(data) {
        if (this.props.selectedGroup && this.props.selectedGroup.length > 0) {
            return this.buildEditingControls(data);
        } else {
            return this.buildInsertingControls(data);
        }
    }

    buildInsertingControls(data) {
        const wData = this.props.editorData;
        const selectedCategory = wData.selectedCategory;

        let nav = this.buildNav(data);
        let content = null;
        if (selectedCategory) {
            content = this.buildDishesContent(data);
        } else {
            content = this.buildCategoriesContent(data);
        }

        const quantity = wData.quantity;

        let availablePhases = data.phases;
        let selectedPhase = wData.selectedPhase;

        return [<Row key="controls">
            <Column>
                <Row>
                    <Column>
                        <IntegerEditor
                            type="info"
                            options={{
                                label: "Quantità",
                                value: quantity,
                                callback: result => OrdinationsEditorActions.setWizardQuantity(result),
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
                                renderer: p => p ? p.name : "",
                                value: selectedPhase,
                                callback: result => OrdinationsEditorActions.setWizardPhase(result)
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
        </Row>,
            this.buildConfirmButtons()
        ];
    }

    buildEditingControls(data) {
        const orders = this.props.selectedGroup;
        const targetOrder = orders[0];

        const availableAdditions = data.additions.filter(addition => {
            return targetOrder.dish.category.hasAddition(addition) ||
                targetOrder.additions.includes(addition)
        });

        return <Row grow>
            <Column justify="space-between">
                <Row>
                    <Column>
                        <Row>
                            <Column>
                                <h5>{targetOrder.dish.name}</h5>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <TextEditor
                                    options={{
                                        label: "Variante libera",
                                        value: targetOrder ? targetOrder.notes : "",
                                        callback: result => OrdersEditorActions.setFreeAddition(result)
                                    }}
                                />
                            </Column>
                        </Row>
                        <Row ofList>
                            <Column>
                                <FloatEditor
                                    options={{
                                        label: "Prezzo",
                                        value: targetOrder ? targetOrder.price : 0,
                                        callback: result => OrdersEditorActions.setPrice(result),
                                        min: 0.01,
                                    }}
                                    currency
                                />
                            </Column>
                            <Column>
                                <IntegerEditor
                                    options={{
                                        label: "Quantità",
                                        value: orders ? orders.length : 0,
                                        callback: result => this.editQuantity(orders, result)
                                    }}
                                />
                            </Column>
                            <Column>
                                <SelectEditor
                                    options={{
                                        rows: 2,
                                        cols: 2,
                                        label: "Portata",
                                        values: data.phases,
                                        renderer: p => p.name,
                                        value: targetOrder ? targetOrder.phase : null,
                                        callback: result => OrdersEditorActions.setPhase(result),
                                        isValid: value => !!value
                                    }}
                                />
                            </Column>
                            <Column auto>
                                <Button
                                    type="danger"
                                    icon="trash"
                                    commitAction={() => OrdersEditorActions.decreaseQuantity(orders)}
                                />
                            </Column>
                        </Row>
                        <Row topSpaced>
                            <Column><h5>Varianti fisse</h5></Column>
                        </Row>
                        <Row ofList>
                            <Column>
                                <SelectInput
                                    uuid="order_fixed_additions"
                                    rows={7}
                                    cols={2}
                                    options={availableAdditions}
                                    renderer={addition => addition.name}
                                    selected={targetOrder ? targetOrder.additions : []}
                                    page={this.props.editorData.additionsPage}
                                    onSelectPage={page => OrdersEditorActions.selectAdditionsPage(page)}
                                    onSelect={addition => OrdersEditorActions.setAdditions(addition, true)}
                                    onDeselect={addition => OrdersEditorActions.setAdditions(addition, false)}
                                    multiSelect
                                />
                            </Column>
                        </Row>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Button text="Torna a inserimento" type="info"
                                commitAction={() => OrdersEditorActions.deselectOrders()}/>
                    </Column>
                </Row>
            </Column>
        </Row>
    }

    editQuantity(orders, quantity){
        if(quantity > orders.length){
            OrdersEditorActions.increaseQuantity(orders[0], quantity - orders.length);
        }else{
            OrdersEditorActions.decreaseQuantity(orders.slice(0, orders.length - quantity))
        }
    }

    buildNav() {
        const editorData = this.props.editorData;
        const selectedCategory = editorData.selectedCategory;
        let buttons = [];
        buttons.push(<NavElement
            key="categories"
            text="Categorie"
            active={!selectedCategory}
            commitAction={() => OrdinationsEditorActions.deselectWizardCategory()}
        />);
        if (selectedCategory) {
            buttons.push(<NavElement
                key="dishes"
                text={selectedCategory.name}
                active={true}
            />);
        }
        return <Row>
            {buttons}
        </Row>;
    }

    buildCategoriesContent(data) {
        const editorData = this.props.editorData;

        let selectedCategory = editorData.selectedCategory;
        let categoryPage = editorData.categoryPage;

        let availableCategories = data.categories;
        return <SelectInput
            rows={8}
            cols={2}
            options={availableCategories}
            renderer={cat => cat.name}
            selected={selectedCategory}
            page={categoryPage}
            onSelectPage={page => OrdinationsEditorActions.selectWizardCategoryPage(page)}
            onSelect={cat => OrdinationsEditorActions.selectWizardCategory(cat)}
            onDeselect={() => OrdinationsEditorActions.deselectWizardCategory()}
            alwaysShowPages
        />;
    }

    buildDishesContent(data) {
        const wData = this.props.editorData;
        const selectedCategory = wData.selectedCategory;
        let dishPage = wData.dishPage;
        let availableDishes = selectedCategory.dishes
            .filter(dish => dish.status === DishStatus.ACTIVE);

        return <SelectInput
            rows={8}
            cols={2}
            options={availableDishes}
            renderer={dish => dish.name}
            page={dishPage}
            onSelectPage={page => OrdinationsEditorActions.selectWizardDishPage(page)}
            onSelect={dish => OrdinationsEditorActions.selectWizardDish(dish, this.props.ordination, wData.quantity, wData.selectedPhase)}
            alwaysShowPages
        />;
    }

    buildConfirmButtons() {
        const isUpdate = this.props.crudStatus === CRUDStatus.UPDATE;
        return <Row key="buttons">
            <Column>
                <Button
                    type="success"
                    text={isUpdate ? "Aggiorna comanda" : "Conferma comanda"}
                    commitAction={() => {
                        isUpdate ? OrdinationsEditorActions.updateOrdination(this.props.ordination) :
                            OrdinationsEditorActions.createOrdination(this.props.table, this.props.ordination)
                    }}
                />
            </Column>
            <Column>
                <Button
                    type="danger"
                    text={isUpdate ? "Annulla modifiche" : "Annulla comanda"}
                    commitAction={() => {
                        isUpdate ? OrdinationsEditorActions.deselectOrdination(this.props.ordination) :
                            OrdinationsEditorActions.abortOrdinationCreation(this.props.ordination)
                    }}
                />
            </Column>
        </Row>
    }

}