import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import {DishesPageActions} from "./DishesPageActions";

export default class DishCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props;
        const dish = data.editor.dish;

        const actions = DishCreator.buildActions(data);

        return <Row topSpaced>
            <Column>
                <Row>
                    <Column>
                        <h3 className="text-center">Creazione piatto</h3>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <EntityEditor
                            entity={dish}
                            valid={!!dish.name && !!dish.category}
                            confirmMethod={dish => DishesPageActions.createDish(dish)}
                            abortMethod={() => DishesPageActions.selectDish(null)}>
                            {actions}
                        </EntityEditor>
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    static buildActions(data) {
        const actions = [];
        const dish = data.editor.dish;
        const categories = data.data.categories;
        actions.push(DishCreator.buildNameEditor(dish));
        actions.push(DishCreator.buildDescriptionEditor(dish));
        actions.push(DishCreator.buildPriceEditor(dish));
        actions.push(DishCreator.buildCategoryEditor(dish, categories));

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
            callback: result => DishesPageActions.setEditorName(result)
        }}/>;
    }

    static buildDescriptionEditor(dish) {
        return <TextEditor options={{
            label: "Descrizione",
            value: dish.description,
            callback: result => DishesPageActions.setEditorDescription(result)
        }}/>;
    }

    static buildPriceEditor(dish) {
        return <FloatEditor
            options={{
                label: "Prezzo",
                value: dish.price,
                min: 0,
                callback: result => DishesPageActions.setEditorPrice(result)
            }}
        />;
    }

    static buildCategoryEditor(dish, categories) {
        return <SelectEditor options={{
            label: "Categoria",
            value: dish.category,
            values: categories,
            isValid: category => !!category,
            renderer: category => category.name,
            callback: category => DishesPageActions.setEditorCategory(category)
        }}/>
    }
}