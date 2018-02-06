import React, {Component} from 'react';
import PaginatedEntitiesList from "../../components/widgets/PaginatedEntitiesList";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import dishesEditorActions from "./DishesEditorActions";
import dishesCreatorActions from "./DishesCreatorActions";

export default class DishesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedEntitiesList
                    rows={6}
                    cols={3}
                    entities={props.get('dishes')}
                    renderer={dish => dish.get('name')}
                    selectMethod={dishesEditorActions.selectDish}
                    deselectMethod={dishesEditorActions.deselectDish}
                />
            </Column>
        </Row>,
            <Row key="new" topSpaced>
                <Column>
                    <Button
                        text="Nuovo piatto"
                        type="info"
                        commitAction={dishesCreatorActions.beginDishCreation}
                    />
                </Column>
            </Row>];
    }

}