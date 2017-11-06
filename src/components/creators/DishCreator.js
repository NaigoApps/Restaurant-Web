import React, {Component} from 'react';
import TextInput from "../widgets/inputs/TextInput";
import FloatInput from "../widgets/inputs/FloatInput";
import EntitySelectInput from "../widgets/inputs/EntitySelectInput";
import SelectInput from "../widgets/inputs/SelectInput";
import menuManagementActions from "../../pages/menu/CategoriesActions";
import {findByUuid} from "../../utils/Utils";
import dishesActions from "../../pages/menu/DishesActions";
import dishCreatorActions from "../../actions/creators/DishCreatorActions";
import Button from "../../widgets/Button";

const DEFAULT_STATE = "ATTIVO";

export default class DishCreator extends Component {
    constructor(props) {
        super(props);
    }

    nameChange(name) {
        dishCreatorActions.updateName(name);
    }

    descriptionChange(desc) {
        dishCreatorActions.updateDescription(desc);
    }

    priceChange(price) {
        dishCreatorActions.updatePrice(price);
    }

    createDish() {
        dishCreatorActions.createDish(this.props.dish);
    }

    render() {
        const name = this.props.dish.name;
        const desc = this.props.dish.description;
        const price = this.props.dish.price;

        return (
            <div>
                <TextInput
                    label="Nome"
                    default={name}
                    commitAction={this.nameChange.bind(this)}
                />

                <TextInput
                    label="Descrizione"
                    default={desc}
                    commitAction={this.descriptionChange.bind(this)}
                />

                <FloatInput
                    label="Prezzo"
                    default={price}
                    unit="€"
                    commitAction={this.priceChange.bind(this)}
                />

                <TextInput
                    label="Stato"
                    default={DEFAULT_STATE}
                    enablingCondition={txt => false}
                />

                <TextInput
                    label="Categoria"
                    default={this.props.category.name}
                    enablingCondition={txt => false}
                />

                <Button
                    icon="ok"
                    commitAction={this.createDish.bind(this)}/>
            </div>
        );
    }

}