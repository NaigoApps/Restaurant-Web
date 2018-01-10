import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import DishesNavigator from "./DishesNavigator";
import dishesEditorActions from "./DishesEditorActions";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";

export default class DishEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let uuid = props.dish.uuid;


        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.dish}
                    abortMethod={dishesEditorActions.deleteDish}
                    render={dish => dish.name}>
                    <TextEditor
                        label="Nome"
                        value={props.dish.name}
                        commitAction={result => dishesEditorActions.updateDishName(uuid, result)}
                    />
                    <TextEditor
                        label="Descrizione"
                        value={props.dish.description}
                        commitAction={result => dishesEditorActions.updateDishDescription(uuid, result)}
                    />
                    <FloatEditor
                        label="Prezzo"
                        value={props.dish.price}
                        commitAction={result => dishesEditorActions.updateDishPrice(uuid, result)}
                    />
                    <SelectEditor
                        label="Stato"
                        value={props.dish.status}
                        options={props.dishesStatuses}
                        commitAction={result => dishesEditorActions.updateDishPrice(uuid, result)}
                    />
                    <EntitySelectEditor
                        label="Categoria"
                        options={props.categories}
                        renderer={cat => cat.name}
                        value={props.dish.category}
                        commitAction={result => dishesEditorActions.updateDishCategory(uuid, result)}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}