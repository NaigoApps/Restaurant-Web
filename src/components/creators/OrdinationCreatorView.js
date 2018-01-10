import React from 'react';
import EntitySelectInput from "../widgets/inputs/EntitySelectInput";

export default class OrdinationCreatorView extends React.Component {
    /**
     *\
     * @param props = {tables}
     */
    constructor(props) {
        super(props);
        this.state = {
            table: null
        };
    }

    tableChange(table) {
        this.setState({
            table: table
        });
    }

    createOrdination() {
        alert("ordinationcreatorview.createordination");
        // ordinationsActions.createOrdination({
        //     table : this.state.table
        // });
    }

    render() {
        return (
            <div className="form-horizontal">
                <EntitySelectInput
                    label="Tavolo"
                    options={this.props.tables}
                    render={(t => {
                        return t.name;
                    })}
                    commitAction={this.tableChange.bind(this)}/>

                <div className="pull-right">
                    <button type="button" className="btn btn-success" onClick={this.createOrdination.bind(this)}>Crea
                    </button>
                </div>
            </div>
        );
    }

}