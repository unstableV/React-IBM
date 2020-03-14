import React from 'react';

let InfoMsgBox = (props) => {
    return (
        <div className="alert alert-info">
            <p>
                <strong>Info: </strong>
                {props.info}
            </p>
        </div>
    );
}

export default InfoMsgBox;