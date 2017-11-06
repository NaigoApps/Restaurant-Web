import React, {Component} from 'react';
import CategoriesList from '../old/CategoriesList';
import CategoryEditor from '../old/CategoryEditor';
import categoriesStore from '../generic/CategoriesStore';

import * as Actions from '../actions/EntityActions';

export default class ApplicationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            selectedCategory: undefined
        }


        this.updateContent = this.updateContent.bind(this);
        this.updateSelection = this.updateSelection.bind(this);
    }

    componentWillMount() {
        categoriesStore.on(ENTITY_LIST_CHANGED, this.updateContent);
        // categoriesStore.on(Events.SELECTED_ENTITY_CHANGED, this.updateSelection);

    }

    componentDidMount() {
        Actions.retrieveEntities("categories");
    }

    updateContent() {
        this.setState({
            categories: categoriesStore.getEntities()
        });
    }

    updateSelection() {
        this.setState({
            selectedDish: categoriesStore.getSelectedEntity()
        });
    }

    componentWillUnmount() {
        categoriesStore.removeListener(ENTITY_LIST_CHANGED, this.updateContent);
        // categoriesStore.removeListener(Events.SELECTED_ENTITY_CHANGED, this.updateSelection);
    }

    unselectcategory() {
        Actions.selectEntity(undefined, "categories");
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Gestione categorie</h1>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="row">
                            <CategoriesList categories={this.state.categories}/>
                        </div>
                        <div className="row text-center top-sep">
                            <button className="btn btn-success" onClick={this.unselectcategory}>Nuova</button>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <CategoryEditor
                            entityName="categories"
                            entity={this.state.selectedDish}/>
                    </div>
                </div>
            </div>
        );
    }
}