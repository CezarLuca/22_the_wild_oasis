import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpenModal(!isOpenModal)}>
                Add Cabin
            </Button>
            {/* {isOpenModal && <CreateCabinForm />} */}
            {isOpenModal && (
                <Modal>
                    <CreateCabinForm />
                </Modal>
            )}
        </div>
    );
}

export default AddCabin;
