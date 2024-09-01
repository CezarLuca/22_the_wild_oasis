import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    function handleCloseModal() {
        setIsOpenModal(false);
    }

    return (
        <div>
            <Button onClick={() => setIsOpenModal(!isOpenModal)}>
                Add Cabin
            </Button>
            {/* {isOpenModal && <CreateCabinForm />} */}
            {isOpenModal && (
                <Modal onClose={handleCloseModal}>
                    <CreateCabinForm onCloseModal={handleCloseModal} />
                </Modal>
            )}
        </div>
    );
}

export default AddCabin;
