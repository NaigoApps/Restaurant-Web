import React, {Component} from 'react';
import dishesPageStore from "./DishesPageStore";
import Page from "../Page";
import DishesNav from "./DishesNav";
import {DishesPageActions} from "./DishesPageActions";
import DishesNavigator from "./DishesNavigator";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import DishEditor from "./DishEditor";
import DishCreator from "./DishCreator";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

export default class DishesPage extends ViewController {
    constructor(props) {
        super(props, dishesPageStore, applicationStore, dataStore);
    }

    componentDidMount() {
        super.componentDidMount();
        DishesPageActions.initDishesPage();
    }

    render() {
        let pageContent = DishesPage.makePageContent(this.state);
        return (
            <Page title="Menu">
                <DishesNav {...this.state.dishes}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editorMode = data.dishes.editor.mode;

        if (editorMode === EditorMode.CREATING) {
            return <DishCreator {...data.dishes} data={data.data}/>;
        } else if (editorMode === EditorMode.EDITING) {
            return <DishEditor {...data.dishes} data={data.data}/>;
        } else {
            return <DishesNavigator {...data}/>;
        }
    }

}