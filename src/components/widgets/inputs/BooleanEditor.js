import React, {Component} from 'react';
import FormField from "./FormField";

export default class BooleanEditor extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        return {
            selected: props.value || false
        }
    }

    selectionChange(event) {
        this.setState({
            selected: event.target.checked
        });
        this.props.commitAction(event.target.checked);
    }

    render() {
        const label = this.props.descriptor.label;
        const checked = this.state.selected;

        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" checked={checked}
                                       onChange={this.selectionChange.bind(this)}/> {label}
                            </label>
                        </div>
                    </div>
                </div>
            </div>);
    }

}