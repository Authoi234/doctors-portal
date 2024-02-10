import React from 'react';

const ConfirmationModal = ({title, message, closeModal, successAction, modalData, successButtonName}) => {
    return (
        <div>
            <input type="checkbox" className='modal-toggle' id='confirmation-modal' />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => successAction(modalData)} className="btn btn-outline btn-error" htmlFor='confirmation-modal'>{successButtonName}</label>
                        <label htmlFor='confirmation-modal' className="btn btn-outline glass btn-neutral skeleton bg-slate-500 text-white" onClick={closeModal}>Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;