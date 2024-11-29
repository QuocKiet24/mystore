/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";

const ConfirmDialog = ({ cancel, confirm, close }) => {
  return (
    <section className="modal">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Permanent Delete</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <p className="my-4">Are you sure?</p>
        <div className="w-fit ml-auto flex items-center gap-3">
          <button
            onClick={cancel}
            className="px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-1 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmDialog;
