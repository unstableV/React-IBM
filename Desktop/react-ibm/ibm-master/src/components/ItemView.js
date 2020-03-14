import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import itemService from '../services/ItemService';
import InfoMsgBox from './InfoMsgBox';
import ErrMsgBox from './ErrMsgBox';

const ItemView = (props) => {

    let [item, setItem] = useState(null);
    let [errMsg, setErrMsg] = useState(null);
    
    let id = props.match.params.id;

    useEffect(() => {
        itemService.findById(id,
            (resp) => {
                setItem(resp.data);
            },
            (err) => {
                console.log(err);
                setErrMsg('Sorry! Unable to read from server!')
            }
        );
    },[id]);

    let dom;
    
    if (!errMsg && !item) {
        dom = <InfoMsgBox info={'Please wait while loading..'} />
    } else if (errMsg) {
        dom = <ErrMsgBox errMsg={errMsg} />
    } else {
        dom = (
            <table className="table table-borderless w-50 mx-auto mt-4">
                <tr>
                    <th>Item#</th>
                    <td>{item.id}</td>
                </tr>
                <tr>
                    <th>Title</th>
                    <td>{item.title}</td>
                </tr>
                <tr>
                    <th>Cost</th>
                    <td>{item.cost}</td>
                </tr>
                <tr>
                    <td colspan="2" className="text-right">
                        <Link to={`/edit/${item.id}`} className="btn btn-sm btn-primary mr-1">
                            EDIT
                        </Link>
                        <Link to={`/delete/${item.id}`} className="btn btn-sm btn-danger mr-1">
                            DELETE
                        </Link>
                    </td>
                </tr>
            </table>
        );
    }

    return dom;
}

export default ItemView;