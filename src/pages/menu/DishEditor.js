import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import DishesNavigator from "./DishesNavigator";
import dishesEditorActions from "./DishesEditorActions";
import FloatEditor from "../../components/widgets/inputs/float/FloatEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";

export default class DishEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let dish = props.get('dish');
        if(dish) {

            let uuid = dish.get('uuid');
            return <Row topSpaced>
                <Column>
                    <EntityEditor
                        entity={dish}
                        deleteMethod={dishesEditorActions.deleteDish}
                        valid={props.get('dish').get('name') && props.get('dish').get('status') && props.get('dish').get('category')}
                        render={dish => dish.get('name')}>
                        <TextEditor
                            label="Nome"
                            value={dish.get('name')}
                            commitAction={result => dishesEditorActions.updateDishName(uuid, result)}
                        />
                        <TextEditor
                            label="Descrizione"
                            value={dish.get('description')}
                            commitAction={result => dishesEditorActions.updateDishDescription(uuid, result)}
                        />
                        <FloatEditor
                            label="Prezzo"
                            value={dish.get('price')}
                            commitAction={result => dishesEditorActions.updateDishPrice(uuid, result)}
                        />
                        <SelectEditor
                            label="Stato"
                            value={dish.get('status')}
                            options={props.get('dishStatuses')}
                            commitAction={result => dishesEditorActions.updateDishStatus(uuid, result)}
                        />
                        <EntitySelectEditor
                            label="Categoria"
                            options={props.get('categories')}
                            renderer={cat => cat.get('name')}
                            value={dish.get('category')}
                            commitAction={result => dishesEditorActions.updateDishCategory(uuid, result)}
                        />
                    </EntityEditor>
                </Column>
            </Row>;
        }
        return <div/>;
    }

}