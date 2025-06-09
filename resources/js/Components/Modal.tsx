import { useEffect } from 'react';

export default function Modal({
    show = false,
    title = 'Notice',
    message,
    closeable = true,
    onClose = () => {},
}: {
    show: boolean;
    title?: string;
    message: string;
    closeable?: boolean;
    onClose: () => void;
}) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && closeable) onClose();
        };

        if (show) {
            document.body.classList.add('modal-open');
            document.addEventListener('keydown', handleKey);
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', handleKey);
        };
    }, [show, closeable, onClose]);

    if (!show) return null;

    return (
        <div
            className="modal d-block"
            tabIndex={-1}
            role="dialog"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
