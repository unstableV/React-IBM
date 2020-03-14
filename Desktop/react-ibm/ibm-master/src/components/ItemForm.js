import React, { Component } from 'react';
import itemService from '../services/ItemService';
import ErrMsgBox from './ErrMsgBox';
import { Redirect } from 'react-router-dom';

class ItemForm extends Component {

    constructor() {
        super();
        this.state = {
            item: { id: 0, title: '', cost: 0 },
            err: null,
            isEditing: false,
            shouldLeave: false
        }
    }

    componentDidMount = () => {

        let id = this.props.match.params.id;

        if (id) {
            this.setState({ isEditing: true });

            itemService.findById(
                id,
                (resp) => {
                    this.setState({ item: resp.data })
                },
                (err) => {
                    console.log(err);
                    this.setState({ err: 'Unable to fetech data for editing..!' })
                }
            );
        }
    }

    formControlChanged = (event) => {
        let itemTemp = this.state.item;
        itemTemp[event.target.name] = event.target.value;
        this.setState({ item: itemTemp });
    }

    handleSubmit = (event) => {
        if (this.state.isEditing) {
            itemService.update(
                this.state.item,
                (resp) => {
                    this.setState({ shouldLeave: true });
                },
                (err) => {
                    console.log(err);
                    this.setState({ err: 'Unable to save changes!' })
                }
            );
        } else {
            itemService.add(
                this.state.item,
                (resp) => {
                    this.setState({ shouldLeave: true });
                },
                (err) => {
                    console.log(err);
                    this.setState({ err: 'Unable to save changes!' })
                }
            );
        }
        event.preventDefault();
    }

    render() {

        let { item, err, shouldLeave } = this.state;

        let dom;

        if (err) {
            dom = <ErrMsgBox errMsg={err} />
        } else if (shouldLeave) {
            dom = <Redirect to="/list" />
        } else {
            dom = (
                <form className="form mt-4 w-50 mx-auto" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Item ID</label>
                        <input type="text" className="form-control"
                            value={item.id}
                            name="id" onChange={this.formControlChanged} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control"
                            value={item.title}
                            name="title" onChange={this.formControlChanged} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Cost</label>
                        <input type="decimal" className="form-control"
                            value={item.cost}
                            name="cost" onChange={this.formControlChanged} />
                    </div>

                    <div className="text-right">
                        <button className="btn btn-lg btn-primary">SAVE</button>
                    </div>

                </form>
            );
        }

        return dom;
    }
}
export default ItemForm;