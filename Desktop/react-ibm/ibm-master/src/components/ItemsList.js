import React, { Component } from 'react';
import itemService from '../services/ItemService';
import ErrMsgBox from '../components/ErrMsgBox';
import InfoMsgBox from '../components/InfoMsgBox';
import { Link } from 'react-router-dom';

class ItemsList extends Component {
    constructor() {
        super();
        this.state = {
            items: null,
            errMsg: null
        }
    }

    componentDidMount = () => {
        itemService.findAll(
            (resp) => {
                this.setState({ items: resp.data });
            },
            (err) => {
                console.log(err);
                this.setState({ errMsg: 'Sorry! Server was not reachable!' });
            }
        );
    }

    createItemsTable = (items) => {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Item#</th>
                        <th>Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>
                                <Link to={`/details/${item.id}`} className="btn bn-sm btn-info ">
                                    more..
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    render = () => {

        let { items, errMsg } = this.state;

        let dom;

        if (errMsg) {
            dom = <ErrMsgBox errMsg={errMsg} />
        } else if (items) {
            dom = this.createItemsTable(items);
        } else {
            dom = <InfoMsgBox info={'Please Wait Data Being Loaded..'} />
        }

        return (
            <div className="container-fluid p-4">
                <h3 className="border border-bottom-1">ItemsList</h3>
                {dom}
            </div>
        );
    }
}

export default ItemsList;