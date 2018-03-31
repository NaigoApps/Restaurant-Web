import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";
import Column from "../../widgets/Column";
import dishesEditorActions from "./DishesEditorActions";
import dishesCreatorActions from "./DishesCreatorActions";
import PaginatedList from "../../components/widgets/PaginatedList";

export default class DishesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.data;

        return [<Row key="list" topSpaced>
            <Column>
                <PaginatedList
                    id={dish => dish.get('uuid')}
                    rows={5}
                    cols={3}
                    entities={props.get('dishes')}
                    renderer={dish => dish.get('name')}
                    colorRenderer={dish => this.color(dish)}
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

    color(dish){
        if(dish.get('status') === "SOSPESO"){
            return "warning";
        }
        if(dish.get('status') === "RIMOSSO"){
            return "danger";
        }
        return "secondary";
    }

}