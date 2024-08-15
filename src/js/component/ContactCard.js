import React, { useContext, useState} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";

export const ContactCard = ({ contact}) =>{
    const {name, email, address, phone} = contact;
    const {actions} = useContext(Context);
    // const [showModal, setShowModal] = useState(false);

    const handleDelete = ()=>{
        actions.deleteContacts(contact.id);
    }
    return (
        <li className="list-group-item">
			<div className="row w-100 align-items-center">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img
						// src={exampleImage}//cahnge later 
						alt="user profile icon"
						width="110"
						className="rounded-circle mx-auto d-block img-fluid"
					/>
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
					<div className="float-end">
						<Link to={`/editContact/${contact.id}`}>
							<button className="btn">
								<i className="fas fa-pencil-alt mr-3"></i>
							</button>
						</Link>
						<button className="btn" id="deleteButton" onClick={handleDelete}>
							<i className="fas fa-trash-alt"></i>
						</button>
						{/* {showModal && <Modal closeModal={closeModal} confirmDelete={confirmDelete} />} */}
					</div>			
					
					<div className="text-start">
						<label className="name lead fw-bold">{name}</label>
						<br />
						<i className="fas fa-map-marker-alt text-muted me-3"></i>
						<span className="text-muted">{address}</span>
						<br />
						<span
							className="fa fa-phone fa-fw text-muted me-2"
							data-toggle="tooltip"
							title=""
							data-original-title=""></span>
						<span className="text-muted small">{phone}</span>
						<br />
						<span
							className="fa fa-envelope fa-fw text-muted me-2"
							data-toggle="tooltip"
							data-original-title=""
							title="">
						</span>
						<span className="text-muted small text-truncate">
							{email}
						</span>
					</div>
				</div>
			</div>					
		</li>
    );
};

// ConfirmationModal.js
const ConfirmationModal = ({ isOpen, closeModal, confirmAction }) => {
    if (!isOpen) return null;

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Action</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this contact?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={confirmAction}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
