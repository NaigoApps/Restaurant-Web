import React, {Component} from 'react';

export default class TableEntitySelectInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        return {
            selectedOption: props.default || ""
        }
    }


    onChange(event) {
        if (event.target.value) {
            this.props.commitAction(this.findByUuid(this.props.options, event.target.value));
        } else {
            this.props.commitAction("");
        }
        this.setState({
            selectedOption: event.target.value
        });
    }

    findByUuid(array, uuid) {
        var result = undefined;
        array.forEach((value) => {
            if (value.uuid === uuid) {
                result = value;
            }
        });
        return result;
    }

    render() {
        const options = this.props.options.map((option, index) =>
            <option key={option.uuid} value={option.uuid}>{this.props.render(option)}</option>
        );
        return (
            <div>
                <select value={this.state.selectedOption} className="form-control"
                        onChange={this.onChange.bind(this)}>
                    <option></option>
                    {options}
                </select>
            </div>
        );
    }

}