import React, {Component} from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/autocomplete';
import FormField from "./FormField";
import {findByUuid} from "../../../utils/Utils";

export default class DishInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        return {
            selected: props.default || "",
            names: props.options.map(o => o.name)
        }
    }

    commitChange(event, ui) {
        let selected = this.findByName(this.props.options, ui.item.value);
        if(selected) {
            this.setState({selected: selected.uuid});
            if (this.props.commitAction) {
                this.props.commitAction(selected ? selected.uuid : null);
            }
        }
    }

    findByName(arr, name) {
        return arr.find(o => o.name === name);
    }

    render() {
        const label = this.props.label;
        const field = <input className="form-control autocomplete" ref={x => this.autocompleteTag = x}/>;
        return (<FormField compact={this.props.compact} size={this.props.size} label={label} field={field}/>);
    }

    componentDidMount() {

        let defaultValue = findByUuid(this.props.options, this.props.default);
        defaultValue = defaultValue ? defaultValue.name : "";

        $(this.autocompleteTag).autocomplete({
            source: this.state.names,
            select: this.commitChange.bind(this),
            delay: 0
        }).val(defaultValue);
    }

    componentWillUnmount() {
        // $(React.findDOMNode(this)).find(".autocomplete").autocomplete('destroy');
    }

}