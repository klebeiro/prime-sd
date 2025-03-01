import React from "react";

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-gray-500/1 transition-opacity bg-opacity-30 backdrop-blur-sm flex justify-center items-start pt-10">
            <div className="bg-white px-6 pt-8 pb-4 rounded-xl shadow-lg w-96">
                <p className="text-md font-medium text-gray-800">{message}</p>
                <div className="mt-10 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-400 transition"
                    >
                        Não
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-1 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
