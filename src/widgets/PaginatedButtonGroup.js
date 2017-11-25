import React, {Component} from 'react';
import {distribute, uuid} from "../utils/Utils";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";

export default class PaginatedButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    render() {

        const page = this.state.page;
        let pageButtons = this.buildPageButtons();
        let buttons = distribute(React.Children.toArray(this.props.children), 9);
        if (buttons.length > 0) {
            while (buttons[buttons.length - 1].length < 9) {
                buttons[buttons.length - 1].push(<Button key={buttons[buttons.length - 1].length} disabled={true} text="&nbsp;"/>);
            }
        }

        return <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <ButtonGroup vertical={true} justified={true}>
                            {buttons[page]}
                        </ButtonGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {pageButtons}
                    </div>
                </div>
            </div>
        </div>;
    }

    selectPage(index) {
        this.setState({
            page: index
        });
    }

    buildPageButtons() {
        const page = this.state.page;
        const pages = React.Children.toArray(this.props.children).length / 10;
        return <nav>
            <ul className="pagination pagination-lg">
                <li className={page <= 0 ? "disabled" : "clickable"}>
                    <a onClick={this.selectPage.bind(this, page - 1)}>
                        <span className="glyphicon glyphicon-arrow-left"/>
                    </a>
                </li>
                <li className={page >= pages - 1 ? "disabled" : "clickable"}>
                    <a onClick={this.selectPage.bind(this, page + 1)}>
                        <span className="glyphicon glyphicon-arrow-right"/>
                    </a>
                </li>
            </ul>
        </nav>;
    }
}