import React, {Component} from 'react';

export default class FormField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const label = this.props.label;
        const field = this.props.field;
        const compact = this.props.compact;

        let size = "col-sm-" + this.props.size;

        if (compact) {
            return (
                <td>
                    {field}
                </td>
            );
        } else {
            return (
                <div className="form-group">
                    <label className="col-sm-3 control-label">{label}</label>
                    <div className="col-sm-9">
                        {field}
                    </div>
                </div>
            );
        }
    }

}