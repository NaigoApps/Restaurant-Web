import React, {Component} from 'react';

export default class CategoryView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const category = this.props.category;
        return (
            <span>
                {category.name}
            </span>
        );
    }

}