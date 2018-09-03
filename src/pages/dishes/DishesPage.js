import React, {Component} from 'react';
import dishesPageStore from "./DishesPageStore";
import Page from "../Page";
import DishesNav from "./DishesNav";
import {DishesPageActions} from "./DishesPageActions";
import DishesNavigator from "./DishesNavigator";
import EditorMode from "../../utils/EditorMode";
import ViewController from "../../widgets/ViewController";
import DishEditor from "./DishEditor";

const {Map} = require('immutable');

export default class DishesPage extends ViewController {
    constructor(props) {
        super(props, dishesPageStore);
    }

    componentDidMount() {
        super.componentDidMount();
        DishesPageActions.initDishesPage();
    }

    render() {
        let pageContent = DishesPage.makePageContent(this.state.data);
        return (
            <Page title="Menu">
                <DishesNav data={this.state.data}/>
                {pageContent}
            </Page>
        )
    }

    static makePageContent(data) {
        const editorMode = data.editor.mode;

        if (editorMode === EditorMode.CREATING) {
            return <div/>;
        } else if (editorMode === EditorMode.EDITING) {
            return <DishEditor data={data}/>;
        } else {
            return <DishesNavigator data={data}/>;
        }
    }

}