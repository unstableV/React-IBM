import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import itemService from '../services/ItemService';
import ErrMsgBox from './ErrMsgBox';

const DeleteItem = (props) => {

    let id = props.match.params.id;

    let [shouldLeave, setShouldLeave] = useState(false);
    let [err, setErr] = useState(null);

    let doDelete = () => {
        itemService.delete(
            id,
            (resp) => {
                setShouldLeave(true);
            },
            (err) => {
                console.log(err);
                setErr('Sorry Could Not Delete!');
            }
        );
    };

    let goHome = () => {
        setShouldLeave(true);
    };

    return (
        shouldLeave ? <Redirect to="/list" /> :
            (
                err ? <ErrMsgBox errMsg={err} /> :
                    (
                        <div className="card w-50 mx-auto mt-4">
                            <div className="card-header">
                                <h3>Delete Confirmation</h3>
                            </div>
                            <div className="card-body">
                                <p>
                                    Are you sure of deleting item#
                        <strong>{id}</strong> ?
                    </p>
                            </div>
                            <div className="card-footer text-right">
                                <button className="btn btn-danger mr-1" onClick={doDelete} >
                                    YES! Delete for sure!</button>
                                <button className="btn btn-info" onClick={goHome}>
                                    NO! Do not delete!</button>
                            </div>
                        </div>
                    )
            )
    );
}

export default DeleteItem;