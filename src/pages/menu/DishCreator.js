import React from 'react';
import EntityEditor from "../../components/editors/EntityEditor";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import TextEditor from "../../components/widgets/inputs/TextEditor";
import categoriesCreatorActions from "./CategoriesCreatorActions";
import EntitySelectEditor from "../../components/widgets/inputs/EntitySelectEditor";
import dishesCreatorActions from "./DishesCreatorActions";
import FloatEditor from "../../components/widgets/inputs/FloatEditor";

export default class DishCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props.data;
        let name = props.dish.name || "Nuovo piatto";

        return <Row topSpaced>
            <Column>
                <EntityEditor
                    entity={props.dish}
                    confirmMethod={dishesCreatorActions.createDish}
                    render={() => name}>
                    <TextEditor
                        label="Nome"
                        value={props.dish.name}
                        commitAction={dishesCreatorActions.updateDishName}
                    />
                    <TextEditor
                        label="Descrizione"
                        value={props.dish.description}
                        commitAction={dishesCreatorActions.updateDishDescription}
                    />
                    <FloatEditor
                        label="Prezzo"
                        value={props.dish.price}
                        commitAction={dishesCreatorActions.updateDishPrice}
                    />
                </EntityEditor>
            </Column>
        </Row>;
    }

}