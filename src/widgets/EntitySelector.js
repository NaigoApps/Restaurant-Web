import React, {Component} from 'react';
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";

export default class EntitySelector extends Component {
    constructor(props) {
        super(props);
    }

    selectEntity(value) {
        if (this.props.commitAction) {
            this.props.commitAction(value);
        }
    }

    render() {

        let buttons = this.props.entities.map(entity => {
            return <Button key={entity.uuid}
                           active={entity.uuid === this.props.selected}
                           text={this.props.renderer ? this.props.renderer(entity) : "?"}
                           commitAction={this.selectEntity.bind(this, entity.uuid)}/>
        });

        return (
            <div>
                <p>{this.props.title}</p>
                <ButtonGroup>
                    {buttons}
                </ButtonGroup>
            </div>
        );
    }

}