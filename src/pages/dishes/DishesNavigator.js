import React, {Component} from 'react';
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import SelectInput from "../../components/widgets/inputs/SelectInput";
import {DishesPageActions} from "./DishesPageActions";
import StoresUtils from "../StoresUtils";
import RoundButton from "../../widgets/RoundButton";
import DishStatus from "../../model/DishStatus";
import SelectEditor from "../../components/widgets/inputs/SelectEditor";
import Button from "../../widgets/Button";
import Text from "../../widgets/Text";

export default class DishesNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return [
            <Row key="cat" topSpaced>
                <Column>
                    <SelectEditor options={{
                        multiSelect: true,
                        label: "Categorie visualizzate",
                        value: data.visibleCategories,
                        values: data.categories,
                        rows: 4,
                        columns: 4,
                        color: category => category.color,
                        renderer: category => category.name,
                        callback: categories => DishesPageActions.showCategories(categories)
                    }}/>
                </Column>
                <Column auto>
                    <Button text="Seleziona tutte" commitAction={() => DishesPageActions.showAllCategories(true)}/>
                </Column>
                <Column auto>
                    <Button text="Deseleziona tutte" commitAction={() => DishesPageActions.showAllCategories(false)}/>
                </Column>
            </Row>,
            <Row key="list" topSpaced>
                <Column>
                    <SelectInput
                        bordered
                        rows={StoresUtils.option(data, "dishesRows", 3)}
                        cols={StoresUtils.option(data, "dishesColumns", 3)}
                        options={data.visibleDishes}
                        page={data.navigator.page}
                        color={dish => dish.category.color}
                        renderer={dish => dish.name}
                        colorRenderer={dish => DishesNavigator.color(dish)}
                        onSelectPage={index => DishesPageActions.selectDishPage(index)}
                        onSelect={category => DishesPageActions.selectDish(category)}
                    />
                </Column>
            </Row>,
            <Row key="new" justify="center" topSpaced grow>
                <Column justify="center" auto>
                    <RoundButton key="new"
                                 icon="plus"
                                 text="Nuovo piatto"
                                 type="success"
                                 commitAction={() => DishesPageActions.beginDishCreation()}
                    />
                </Column>
            </Row>];
    }

    static color(dish) {
        if (dish.status === DishStatus.SUSPENDED) {
            return "warning";
        }
        if (dish.status === DishStatus.REMOVED) {
            return "danger";
        }
        return "secondary";
    }

}