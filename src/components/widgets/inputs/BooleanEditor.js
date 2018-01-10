import React, {Component} from 'react';

export default class BooleanEditor extends Component {
    constructor(props) {
        super(props);
    }

    selectionChange(event) {
        this.props.commitAction(event.target.checked);
    }

    render() {
        const label = this.props.label;
        const checked = !!this.props.value;

        return (
            <div className="form-group row">
                <label className="col-sm-2">{label}</label>
                <div className="col-sm-10">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" checked={checked}
                                   onChange={this.selectionChange.bind(this)}/>
                        </label>
                    </div>
                </div>
            </div>);
    }

}