import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {DishesEditorActions} from "./DishesEditorActions";
import {DishesCreatorActions} from "./DishesCreatorActions";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";

export default class DishesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        const category = data.get('category');

        return [
            <Row key="title">
                <Column>
                    <h5>Elenco piatti categoria {category.get('name')}</h5>
                </Column>
            </Row>,
            <Row key="list" topSpaced>
                <Column>
                    <SelectInput
                        bordered
                        id={dish => dish.get('uuid')}
                        rows={StoresUtils.settings(data, "dishesRows", 3)}
                        cols={StoresUtils.settings(data, "dishesColumns", 3)}
                        options={data.get('dishes')}
                        page={data.get('dishesPage')}
                        colorRenderer={dish => DishesNavigator.color(dish)}
                        renderer={dish => dish.get('name')}
                        onSelectPage={index => DishesEditorActions.selectDishPage(index)}
                        onSelect={dish => DishesEditorActions.selectDish(dish)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuovo piatto"
                                 type="success"
                                 commitAction={() => DishesCreatorActions.beginDishCreation()}
                    />
                </Column>
            </Row>];
    }

    static color(dish) {
        if (dish.get('status') === "SOSPESO") {
            return "warning";
        }
        if (dish.get('status') === "RIMOSSO") {
            return "danger";
        }
        return "secondary";
    }

}