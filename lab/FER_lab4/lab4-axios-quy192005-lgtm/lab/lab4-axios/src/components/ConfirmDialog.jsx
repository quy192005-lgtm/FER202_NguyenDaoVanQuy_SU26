export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="app-modal confirm-dialog">
        <h2>{title || 'Xác nhận'}</h2>

        <p>{message || 'Bạn có chắc chắn muốn thực hiện hành động này?'}</p>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Hủy
          </button>

          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
