import React from 'react';

let ErrMsgBox = (props) => {
    return (
        <div className="alert alert-danger">
            <p>
                <strong>Error: </strong>
                {props.errMsg}
            </p>
        </div>
    );
}

export default ErrMsgBox;