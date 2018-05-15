import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import {EditorStatus} from "../StoresUtils";
import {CategoriesEditorActions} from "./CategoriesEditorActions";
import {DishesEditorActions} from "./DishesEditorActions";

export default class MenuNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = MenuNav.makeNavContent(this.props.data);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const catEditorStatus = data.get('categoriesEditorStatus');
        const dishEditorStatus = data.get('dishesEditorStatus');

        const category = data.get('category');
        const dish = data.get('dish');

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="categories"
            text="Elenco categorie"
            active={catEditorStatus === EditorStatus.SURFING}
            commitAction={CategoriesEditorActions.deselectCategory}
        />);
        if (catEditorStatus === EditorStatus.CREATING) {
            elements.push(<NavElement
                key="create-cat"
                text="Nuova categoria"
                active={true}
            />);
        }else if (catEditorStatus === EditorStatus.EDITING) {
            elements.push(<NavElement
                key="edit-cat"
                text={category.get('name')}
                commitAction={DishesEditorActions.deselectDish}
                active={category && !dish}
            />);
            if (dishEditorStatus === EditorStatus.EDITING) {
                elements.push(<NavElement
                    key="edit-dish"
                    text={dish.get('name')}
                    active={true}
                />);
            } else if (data.get('createdDish')) {
                elements.push(<NavElement
                    key="create-dish"
                    text="Nuovo piatto"
                    active={true}
                />);
            }
        }
        return elements;
    }
}