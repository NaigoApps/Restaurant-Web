import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import EditorMode from "../../utils/EditorMode";
import {CategoriesPageActions} from "./CategoriesPageActions";

export default class CategoriesNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = CategoriesNav.makeNavContent(this.props);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const editor = data.editor;

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="categories"
            text="Elenco categorie"
            active={!editor.category}
            commitAction={() => CategoriesPageActions.selectCategory(null)}
        />);
        if (editor.mode === EditorMode.CREATING) {
            elements.push(<NavElement
                key="create-cat"
                text="Nuova categoria"
                active={true}
            />);
        } else if (editor.mode === EditorMode.EDITING) {
            elements.push(<NavElement
                key="edit-cat"
                text={editor.category.name}
                active={true}
            />);
        }
        return elements;
    }
}