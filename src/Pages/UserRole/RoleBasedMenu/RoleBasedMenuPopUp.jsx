import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import Switch from "@mui/material/Switch";
import UserPermissionDataTable from "../Common/UserPermissionDataTable";
import axios from "axios";
import { useQuery } from "react-query";
import ApiHeader from "@/Components/ApiList/ApiHeader";
import BackendUrl from "@/Components/ApiList/BackendUrl";
import ListTable from "@/Components/Common/ListTable/ListTable";

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

function RoleBasedMenuPopUp(props) {
  const [data, setData] = useState();
  const [refetchState, setRefetchState] = useState(0);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const header = ApiHeader()

  useEffect(() => {
    if (props.openPopUpState > 0) setIsOpen(true);
    refetch();
  }, [props.openPopUpState]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const isPermission = (menuId, permission) => {
    console.log(
      "isPermission - Menu Id : ",
      menuId,
      "Role Id : ",
      props.roleId,
      "Status : ",
      permission
    );
    // update record

    const payload = {
      roleId: props.roleId,
      menuId: menuId,
      status: permission,
    };
    axios
      .post(
        BackendUrl + "/api/menu-roles/update-menu-by-role",
        payload,
        header
      )
      .then(
        (res) => console.log("Role Permission Updated Successfully", res),
        refetch()
      )
      .catch((err) => console.log("ERROR : Role Permission ", err), refetch());
  };

  const columns = [
    {
      Header: "Sl.",
      Cell: ({ row }) => <div className="px-1">{row.index + 1}</div>,
    },
    {
      Header: "Menu Name",
      accessor: "menu_string",
    },
    {
      Header: "Test",
      accessor: "menu_id",
    },

    {
      Header: "Permission",
      accessor: "permission_status",
      Cell: (props) => (
        <div className="">
          <Switch
            checked={props.value}
            onChange={(e) =>
              isPermission(props.cell.row.values.menu_id, e.target.checked)
            }
            value={props.cell.row.values.menu_id}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      ),
    },
  ];

  const fakeData = [
    { id: 0, menu_string: "frstMenu", permission_status: 0 },
    { id: 1, menu_string: "Secound", permission_status: 1 },
  ];

  // const { isLoading, data, isError, error } = useQuery    ("menu-roles/get-menu-by-roles-BYid--", () => {
  //     try {
  //         return axios.post(`http://192.168.0.16:8000/api/menu-roles/get-menu-by-roles`, {"roleId": props?.roleId}, header);
  //     } catch (err) {
  //         console.log("ERROR in :  Menu role given to", err)
  //     }
  // });
  // if (!isLoading) { }

  const refetch = () => {
    setRefetchState(refetchState + 1);
  };

  useEffect(() => {
    if (props?.roleId > 0) {
      axios
        .post(
          BackendUrl + `/api/menu-roles/get-menu-by-roles`,
          { roleId: props?.roleId },
          header
        )
        .then(
          (res) => (
            console.log("Fetched roles of Id", props?.roleId, res), setData(res)
          )
        )
        .catch((err) => console.log("Fetched roles of Id", props?.roleId, err));
    }
  }, [refetchState]);

  console.log("Menu role given to", props?.roleId, data);

  return (
    <div className="">
      {/* <button className='border bg-yellow-300' onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-white shadow-2xl border border-sky-200 p-5 m-5 rounded-md">
          <p className="flex flex-row-reverse">
            {" "}
            <span
              onClick={closeModal}
              className="cursor-pointer rounded-full hover:bg-gray-400"
            >
              {" "}
              <GrFormClose size={25} />{" "}
            </span>{" "}
          </p>
          <p className="text-center text-xl">
            Menu Permission For :{" "}
            <span className="font-semibold">{props.roleName}</span>
          </p>
          <p className="border-b py-1 mb-3"></p>
          <div className="text-center"></div>
          <div>
            <div>
              {data?.data?.data ? (
                <ListTable
                  searchText="Menu"
                  columns={columns}
                  data={data?.data?.data}
                />
              ) : (
                "No Data Found"
              )}
              {/* {fakeData ? <UserPermissionDataTable searchText="Menu" columns={columns} data={fakeData} /> : "No Data Found"} */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ReactDOM.render(<App />, appElement);

export default RoleBasedMenuPopUp;

/*
Exported to -
RoleBasedMenuINdex.js
*/
