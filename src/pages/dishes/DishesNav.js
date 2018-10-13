import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import EditorMode from "../../utils/EditorMode";
import {DishesPageActions} from "./DishesPageActions";

export default class DishesNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = DishesNav.makeNavContent(this.props);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editor = data.editor;

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="dishes"
            text="Elenco piatti"
            active={!editor.dish}
            commitAction={() => DishesPageActions.selectDish(null)}
        />);
        if (editor.mode === EditorMode.CREATING) {
            elements.push(<NavElement
                key="create-dish"
                text="Nuovo piatto"
                active={true}
            />);
        } else if (editor.mode === EditorMode.EDITING) {
            elements.push(<NavElement
                key="edit-dish"
                text={editor.dish.name}
                active={true}
            />);
        }
        return elements;
    }
}