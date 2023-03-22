import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import WaterApiList from "./WaterApiList";
// import BarLoader from "@/Components/Common/BarLoader";
import { ThreeDots } from 'react-loader-spinner'

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "transparent",
        border: "none",
    },
};

const validationSchema = yup.object({
    // parentMenuName: yup.string().required("This is a required field !"),
    menuName: yup.string().required("This is a required field !"),
    // menuRoute: yup.string().required("This is a required field !"),
});

function EditMenuMasterModal(props) {

    const { api_updateMenu, api_listParentSetial, api_getChildrenNode, api_getMenuById } = WaterApiList();

    const [listParentMenu, setListParentMenu] = useState()
    const [listChildMenu, setListChildMenu] = useState()
    const [parentMenuId, setParentMenuId] = useState()
    const [fetchedEditData, setFetchedEditData] = useState()
    const [loader, setLoader] = useState(false)

    const toBeEdit = props.dataTobeEdited;
    // console.log("To to edit", toBeEdit)


    const header = ApiHeader()

    useEffect(() => {
        setLoader(true)
        axios.post(api_getMenuById, { "menuId": toBeEdit?.id }, header)
            .then((res) => {
                setLoader(false)
                console.log("Data to be in edit form", res)
                setFetchedEditData(res.data.data)
            })
            .catch((err) => {
                setLoader(false)
                console.log("Exception while getling data for edit", err)
            })
    }, [toBeEdit])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            parentMenuName: fetchedEditData?.parent_serial,
            childMenuName: "",
            menuName: fetchedEditData?.menu_string,
            menuRoute: fetchedEditData?.route,
            serialNo: fetchedEditData?.serialNo
        },
        onSubmit: (values) => {
            saveRecord(values);
        },
        validationSchema,
    });

    const handleParentMenuName = (e) => {
        formik.values.parentMenuName = e.target.value
        setParentMenuId(e.target.value)
    }


    // Modal.setAppElement('#yourAppElement');
    const [modalIsOpen, setIsOpen] = React.useState(false);


    const saveRecord = (data) => {
        console.log("Data to update", data);

        const payload = {
            id: toBeEdit?.id,
            menuName: data.menuName,
            route: data.menuRoute,
            parentSerial: data.childMenuName ? data.childMenuName : data.parentMenuName,
            serial: data.serialNo
            // topLevel: "",
            // subLevel: "",
            // serial: "",
            // icon: "",
            // description: "",
        };


        console.log("final payload ==", payload)

        // return

        axios.post(api_updateMenu, payload, header)
            .then((res) => (console.log("Menu saved successfully", res), closeModal()))
            .catch((err) => (console.log("Failed to save the menu", err), closeModal()));
    };


    useEffect(() => {
        axios.post(api_listParentSetial, {}, header)
            .then((res) => {
                setListParentMenu(res.data.data)
            })
            .catch((err) => console.log("Error while getting ", err))
    }, [])

    useEffect(() => {
        axios.post(api_getChildrenNode, { "id": parentMenuId }, header)
            .then((res) => {
                setListChildMenu(res.data.data)
            })
            .catch((err) => console.log("Error while getting chiild menu ", err))
    }, [parentMenuId])


    useEffect(() => {
        if (props.openEditPopUp > 0) setIsOpen(true);
    }, [props.openEditPopUp]);

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        props.refetchMasterMenuList();
    }

    return (
        <div className="">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="bg-sky-200 shadow-2xl border border-sky-200 p-5 m-5 rounded-md">
                    <div>
                        <div className="float-right">
                            <p onClick={closeModal} className="cursor-pointer rounded-full hover:bg-gray-200"                            >
                                <GrFormClose size={25} />
                            </p>
                        </div>
                        <p className="text-center text-lg font-semibold">Edit Menu - <span>{toBeEdit?.menu_string}</span></p>
                    </div>

                    <p className="border-b py-1 mb-3"></p>
                    {loader ?
                        <div className='flex justify-center'>
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="#1263e6"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />
                        </div>
                        :
                        <div>
                            <form onSubmit={formik.handleSubmit}>

                                <div>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                                        Menu Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        // value={fetchedEditData?.menu_string}
                                        // defaultValue={fetchedEditData?.menu_string}
                                        value={formik.values.menuName}
                                        type="text"
                                        name="menuName"
                                        // onChange={handleMenuName}
                                        onChange={formik.handleChange}
                                        className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    />
                                    <p className="text-red-500 text-xs">
                                        {formik.touched.menuName && formik.errors.menuName
                                            ? formik.errors.menuName
                                            : null}
                                    </p>
                                </div>

                                <div>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                                        Under Menu Name<span className="text-red-500">*</span>
                                    </label>
                                    {fetchedEditData &&
                                        <select
                                            defaultValue={fetchedEditData?.parent_serial}
                                            name="parentMenuName"
                                            onChange={formik.handleChange}
                                            className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                        >
                                            <option value="">Select</option>
                                            <option value="0">None</option>

                                            {
                                                listParentMenu?.map((item) => (
                                                    <option value={item.id}>{item.menu_string}</option>
                                                ))
                                            }

                                        </select>
                                    }
                                    <p className="text-red-500 text-xs"> {formik.touched.parentMenuName && formik.errors.parentMenuName ? formik.errors.parentMenuName : null}</p>
                                </div>

                                <div>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                                        Under Sub-Menu Name<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="childMenuName"
                                        onChange={formik.handleChange}
                                        className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    >
                                        <option value="">Select</option>

                                        {
                                            listChildMenu?.map((item) => (
                                                <option value={item.id}>{item.menu_string}</option>
                                            ))
                                        }

                                    </select>
                                    <p className="text-red-500 text-xs"> {formik.touched.childMenuName && formik.errors.childMenuName ? formik.errors.childMenuName : null}</p>
                                </div>


                                <div>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                                        Serial No.<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        // defaultValue={fetchedEditData?.serial}
                                        value={formik.values.serialNo}
                                        type="text"
                                        name="serialNo"
                                        onChange={formik.handleChange}
                                        className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    />
                                    <p className="text-red-500 text-xs">
                                        {formik.touched.serialNo && formik.errors.serialNo ? formik.errors.serialNo : null}
                                    </p>
                                </div>
                                <div>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold">
                                        Menu Route<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        // defaultValue={fetchedEditData?.route}
                                        value={formik.values.menuRoute}
                                        type="text"
                                        name="menuRoute"
                                        onChange={formik.handleChange}
                                        className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md"
                                    />
                                    <p className="text-red-500 text-xs">
                                        {formik.touched.menuRoute && formik.errors.menuRoute
                                            ? formik.errors.menuRoute
                                            : null}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="border border-indigo-900 hover:border-red-400 bg-indigo-600 hover:bg-indigo-800 text-white shadow-lg rounded-sm py-1 text-base font-normal px-3 m-3"
                                    >
                                        Update Menu
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default EditMenuMasterModal;

/*
Exported to -
MenuMasterIndex.js
*/
