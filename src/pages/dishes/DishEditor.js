import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import {DishesPageActions} from "./DishesPageActions";

export default class DishEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        const dish = data.editor.dish;

        const actions = DishEditor.buildActions(data);

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={dish}
                    valid={!!dish.name && !!dish.category}
                    deleteMessage="Eliminazione piatto"
                    deleteMethod={dish => DishesPageActions.deleteDish(dish)}>
                    {actions}
                </EntityEditor>
            </Column>
        </Row>;
    }

    static buildActions(data) {
        const actions = [];
        const dish = data.editor.dish;
        const statuses = data.dishStatuses;
        const categories = data.categories;
        actions.push(DishEditor.buildNameEditor(dish));
        actions.push(DishEditor.buildDescriptionEditor(dish));
        actions.push(DishEditor.buildPriceEditor(dish));
        actions.push(DishEditor.buildStatusEditor(dish, statuses));
        actions.push(DishEditor.buildCategoryEditor(dish, categories));

        return actions.map((action, index) => {
            return <Row key={index} ofList={index > 0}>
                <Column>
                    {action}
                </Column>
            </Row>
        });
    }

    static buildNameEditor(dish) {
        return <TextEditor options={{
            label: "Nome",
            value: dish.name,
            callback: result => DishesPageActions.updateDishName(dish.uuid, result)
        }}/>;
    }

    static buildDescriptionEditor(dish) {
        return <TextEditor options={{
            label: "Descrizione",
            value: dish.description,
            callback: result => DishesPageActions.updateDishDescription(dish.uuid, result)
        }}/>;
    }

    static buildPriceEditor(dish) {
        return <FloatEditor
            options={{
                label: "Prezzo",
                value: dish.price,
                min: 0,
                callback: result => DishesPageActions.updateDishPrice(dish.uuid, result)
            }}
        />;
    }

    static buildStatusEditor(dish, statuses) {
        return <SelectEditor options={{
            label: "Stato",
            value: dish.status,
            values: statuses,
            isValid: status => !!status,
            callback: status => DishesPageActions.updateDishStatus(dish.uuid, status)
        }}/>;
    }

    static buildCategoryEditor(dish, categories) {
        return <SelectEditor options={{
            label: "Categoria",
            value: dish.category,
            values: categories,
            isValid: category => !!category,
            renderer: category => category.name,
            callback: category => DishesPageActions.updateDishCategory(dish.uuid, category)
        }}/>
    }
}