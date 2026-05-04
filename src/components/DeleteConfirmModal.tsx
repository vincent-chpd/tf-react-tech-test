import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Trash2 } from 'lucide-react';
import { DeleteConfirmModalProps } from '../types';

const DeleteConfirmModal = ({ isOpen, taskTitle, onConfirm, onCancel }: DeleteConfirmModalProps) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onCancel}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-gray-100 p-6 duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                Delete task
              </DialogTitle>
            </div>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete{' '}
              <span className="font-medium text-gray-900">"{taskTitle}"</span>?
              This action cannot be undone.
            </p>

            <div className="mt-5 flex gap-2 justify-end">
              <Button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none"
                onClick={onConfirm}
              >
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteConfirmModal;
