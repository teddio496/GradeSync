"use client";

import React, { FC } from "react";

interface ConfirmationDialogProps {
    open: boolean;
    message: string;
    onLocal: () => void;
    onCloud: () => void;
    onMerge: () => void;
}

const SaveConfirmationDialog: FC<ConfirmationDialogProps> = ({ open, message, onLocal, onCloud, onMerge }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-skin-back rounded-lg shadow-lg p-6 text-center max-w-sm w-full">
                <p className="text-lg font-semibold mb-4">{message}</p>
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={onLocal}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Local
                    </button>
                    <button
                        onClick={onCloud}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Cloud
                    </button>
                    <button
                        onClick={onMerge}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                        Merge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveConfirmationDialog;
