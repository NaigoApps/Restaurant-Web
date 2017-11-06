import React, {Component} from 'react';
import TextInput from "../widgets/inputs/TextInput";
import Button from "../../widgets/Button";
import categoriesActions from "../../pages/menu/CategoriesActions";

export default class CategoryCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };

        this.nameChange = this.nameChange.bind(this);
    }

    nameChange(name) {
        this.setState({
            name: name
        });
    }

    createCategory() {
        let category = {
            name: this.state.name
        };
        categoriesActions.createCategory(category);
    }

    render() {
        return (
            <div className="form-horizontal">
                <TextInput
                    label="Nome"
                    default={this.state.name}
                    commitAction={this.nameChange.bind(this)}/>

                <Button
                    icon="ok"
                    commitAction={this.createCategory.bind(this)}/>
            </div>
        );
    }

}