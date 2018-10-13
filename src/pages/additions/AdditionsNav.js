import React, {Component} from 'react';
import NavElement from "../../widgets/NavElement";
import RestaurantNav from "../../components/RestaurantNav";
import NavConfigurationButton from "../../widgets/NavConfigurationButton";
import EditorMode from "../../utils/EditorMode";
import AdditionsPageActions from "./AdditionsPageActions";

export default class AdditionsNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let navContent = AdditionsNav.makeNavContent(this.props);
        return <RestaurantNav>{navContent}</RestaurantNav>;
    }

    static makeNavContent(data) {
        let elements = [];

        const mode = data.editor.mode;
        const addition = data.editor.addition;

        elements.push(<NavConfigurationButton key="home"/>);

        elements.push(<NavElement
            key="additions"
            text="Elenco varianti"
            active={!addition}
            commitAction={() => AdditionsPageActions.selectAddition()}
        />);
        if (mode === EditorMode.EDITING) {
            elements.push(<NavElement
                key="selected"
                text={addition.name}
                active={true}
            />);
        } else if (mode === EditorMode.CREATING) {
            elements.push(<NavElement
                key="selected"
                text={"Creazione variante"}
                active={true}
            />);
        }
        return elements;
    }
}