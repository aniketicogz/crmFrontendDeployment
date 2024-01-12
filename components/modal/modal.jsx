import "./modal.scss";

export const DeleteModal = ({ isOpen, closeModal, data, onClick }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal fade ${isOpen && "show"}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Delete Partner</h4>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-danger">
              <h5>
                <i className="fa fa-info-circle"></i> Delete Partner {data.partnerName}
              </h5>
              <p>Are you sure you want to delete {data.partnerName}?</p>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-white" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => onClick(data)}>
              Delete Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
