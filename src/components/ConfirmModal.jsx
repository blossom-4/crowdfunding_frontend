import "./ConfirmModal.css";

function ConfirmModal({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel, isDangerous }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button 
                        className={`modal-button ${isDangerous ? "modal-danger" : "modal-primary"}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button 
                        className="modal-button modal-cancel"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
