import React, {Component} from 'react';
import {distribute} from "../utils/Utils";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Row from "./Row";
import Column from "./Column";

export default class PaginatedButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    render() {
        const pageSize = this.props.pageSize || 10;
        const page = this.state.page;
        let pageButtons = this.buildPageButtons();
        let buttons = distribute(React.Children.toArray(this.props.children), pageSize);
        if (buttons.length > 0) {
            while (buttons[buttons.length - 1].length < pageSize) {
                buttons[buttons.length - 1].push(
                    <Button
                        key={buttons[buttons.length - 1].length}
                        disabled={true}
                        text="&nbsp;"/>);
            }
        } else {
            buttons = [[]];
            for (let i = 0; i < pageSize; i++) {
                buttons[0].push(
                    <Button
                        key={buttons[0].length}
                        disabled={true}
                        text="&nbsp;"/>);
            }
        }

        return <Row>
            <Column>
                <Row>
                    <Column>
                        <ButtonGroup vertical={true} justified={true}>
                            {buttons[page]}
                        </ButtonGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        {pageButtons}
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    selectPage(index) {
        this.setState({
            page: index
        });
    }

    buildDefaultButtons(pages, page) {
        return <div className="btn-group">
            <Button disabled={page <= 0}
                    commitAction={this.selectPage.bind(this, page - 1)}
                    icon="arrow-left"/>
            <Button disabled={page >= pages - 1}
                    commitAction={this.selectPage.bind(this, page + 1)}
                    icon="arrow-right"/>
        </div>
    }

    buildNumberButtons(pages, page) {
        let numbers = [];
        for (let i = 0; i < pages; i++) {
            numbers.push(i);
        }
        return <div className="btn-group">
            {numbers.map(number => {
                return <Button key={number}
                               commitAction={this.selectPage.bind(this, number)}
                               active={page === number}
                               text={(number + 1).toString()}
                />
            })}
        </div>
    }

    buildPageButtons() {
        const page = this.state.page;
        const pageSize = this.props.pageSize || 10;
        let pages = parseInt((React.Children.toArray(this.props.children).length - 1) / pageSize + 1);
        pages = Math.max(pages, 1);

        let buttons;
        if (this.props.showNumbers) {
            buttons = this.buildNumberButtons(pages, page);
        } else {
            buttons = this.buildDefaultButtons(pages, page);
        }

        return <nav className="top-sep">
            {buttons}
        </nav>;
    }
}