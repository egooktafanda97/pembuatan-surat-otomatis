import React, { useState, useEffect } from "react";
import Select from "react-select";
import swal from "@sweetalert/with-react";
import { FaFileAlt, FaTimes, FaCog } from "react-icons/fa";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ===========================================================
import Config from "../../../System/config/properti.json";

export default function Properti(props) {
  const [elemet, setElemet] = useState(<ConfigForm />);

  // const PapperConf = () => {
  //   swal({
  //     buttons: {
  //       cancel: false,
  //     },
  //     content: <ConfigForm />,
  //   });
  // };

  const ModalOpen = (el) => {
    $(".modal-costumes").addClass("show-mod").removeClass("hide-mod");
    setElemet(el);
  };

  return (
    <div className='pb-px-10 pt-px-5' style={{ marginTop: "30px" }}>
      <div className='flex flex-col'>
        <div
          className={`item-menu-props`}
          onClick={() => {
            ModalOpen(<ConfigForm />);
          }}>
          <FaFileAlt className='icons-item text-lg' />
          <h3>Setting Papper</h3>
        </div>
      </div>
      <div className='flex flex-col mt-2'>
        <div
          className={`item-menu-props`}
          onClick={() => {
            ModalOpen(<ConfigureLetter />);
          }}>
          <FaCog className='icons-item text-lg' />
          <h3>Properti</h3>
        </div>
      </div>
      <div className={`modal-costumes hide-mod`}>{elemet}</div>
    </div>
  );
}

const ConfigureLetter = () => {
  return (
    <div style={{ height: "auto" }}>
      <div className='flex-center-between items-center mb-3'>
        <h5>Papper Setting</h5>
        <span
          className='btn-closed'
          onClick={() => {
            $(".modal-costumes").addClass("hide-mod").removeClass("show-mod");
          }}>
          <FaTimes />
        </span>
      </div>
      <hr />
      {/* taiwind css checkbox */}
      <div className='cards'>
        <div className='row'>
          <div className='col-12 text-left mt-4'>
            <div className='form-check'>
              <label className='form-check-label'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  // defaultValue='checked'
                  defaultChecked
                />
                Jenis Surat Masyarakat ?
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfigForm = () => {
  // redux =====================================================
  const dispatch = useDispatch();
  const getRedux = useSelector((state) => state);
  // ===========================================================
  const [btnLoading, setBtnLoading] = useState(false);

  const [confPapper, setConfPapper] = useState(`A4`);
  const [size, setSize] = useState(`210,297`);
  const [showCostum, setShowCostum] = useState(false);
  useEffect(() => {
    $("[name='marginTop']").val(
      getRedux?.papperSetting?.paperMargin?.top.replace(/\D/g, "") ?? "2"
    );
    $("[name='marginBottom']").val(
      getRedux?.papperSetting?.paperMargin?.bottom.replace(/\D/g, "") ?? "2"
    );
    $("[name='marginLeft']").val(
      getRedux?.papperSetting?.paperMargin?.left.replace(/\D/g, "") ?? "2"
    );
    $("[name='marginRight']").val(
      getRedux?.papperSetting?.paperMargin?.right.replace(/\D/g, "") ?? "2"
    );
    $("[name='orientation']").val(
      getRedux?.papperSetting?.paperOrientation ?? "P"
    );
    $("[name='papper']").val(getRedux?.papperSetting?.paperSize ?? "A4");
  }, [$]);

  const hndelConfigSubmit = (ev) => {
    ev.preventDefault();
    setBtnLoading(true);
    const form_data = new FormData(ev.target);
    const Objk = {};
    for (var pair of form_data.entries()) {
      Objk[pair[0]] = pair[1];
    }
    Objk.size = size;
    dispatch({
      type: "PAPPER-SETTING",
      payload: Objk,
    });
    const LoadTime = setTimeout(() => {
      setBtnLoading(false);
      toast.success("Konfigurasi disimpan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      clearTimeout(LoadTime);
    }, 1000);
  };
  return (
    <div style={{ height: "auto" }}>
      <div className='flex-center-between items-center mb-3'>
        <h5>Papper Setting</h5>
        <span
          className='btn-closed'
          onClick={() => {
            $(".modal-costumes").addClass("hide-mod").removeClass("show-mod");
          }}>
          <FaTimes />
        </span>
      </div>
      <hr />
      <div style={{ width: "98%" }}>
        <form onSubmit={hndelConfigSubmit}>
          {Config.map((mm, i) => (
            <div className='cards' key={i}>
              <div className='row'>
                {mm.props.map((types, index) => (
                  <div
                    key={index}
                    className={`${
                      index == 0 || index == mm.props.length - 1
                        ? "col-10 margin-top-5"
                        : "col-10"
                    }`}>
                    {types.type == "select" && (
                      <>
                        <select
                          name={types.name}
                          onChange={(e) => {
                            if (types.name == "papper") {
                              var Objks = types.select.filter((obj) => {
                                return obj.value === e.target.value;
                              });
                              setSize(`${Objks[0].width},${Objks[0].height}`);
                              setConfPapper(e.target.value);
                              if (e.target.value == "costum") {
                                setShowCostum(true);
                              }
                            }
                          }}
                          className='form-control form-control-sm'>
                          {types.select.map((mp, i) => (
                            <option key={i} value={mp.value}>
                              {mp.label}
                            </option>
                          ))}
                        </select>
                        {types.name == "papper" && (
                          <input
                            placeholder='masukkan lebar kertas satuan milimeter'
                            type={showCostum == true ? "text" : "hidden"}
                            className='form-control form-control-sm'
                            // name={types.name}
                            onKeyUp={(e) => {
                              setSize(
                                `${
                                  e.target.value?.split(",")[0] ??
                                  e.target.value
                                },${e.target.value?.split(",")[1] ?? 0}`
                              );
                              setConfPapper(e.target.value);
                            }}
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                          />
                        )}
                      </>
                    )}
                    {types.type == "text-group-select" && (
                      <TextSelectGroup {...types} />
                    )}
                  </div>
                ))}

                <div
                  className='col-12 mt-3'
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                    width: "90%",
                    flexDirection: "column",
                  }}>
                  <hr />
                  <button
                    type='submit'
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                    className='btn-ui action-btn prymary-button'>
                    {btnLoading ? (
                      <>
                        <div className='loading_mode_standart'></div>
                        <div style={{ marginLeft: "5px", marginRight: "5px" }}>
                          Loading
                        </div>
                      </>
                    ) : (
                      <div>Simpan</div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

const SelectBox = (props) => {
  const [value, setValue] = useState(null);
  return (
    <div className='w-100'>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
        }}>
        <label htmlFor='' className='labels'>
          {props.label}
        </label>
        <Select
          className='select-module'
          options={props.select}
          onChange={(opt) => setValue(opt)}
        />
      </div>
    </div>
  );
};

const TextSelectGroup = (props) => {
  const hndelConf = (ev) => {
    $(`[name='${props.name[1]}']`).val(ev.target.value);
  };
  return (
    <div className='w-100' style={{ marginTop: "15px" }}>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
        }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <label htmlFor='' className='labels'>
            {props.label}
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <input
            type='text'
            className='form-control form-control-sm ml-2'
            name={props.name[0]}
            onChange={(event) => {
              console.log("");
            }}
            defaultValue={props.defaultValue}
            placeholder='lebel atribut'
          />
          <select
            style={{ width: "100px" }}
            onChange={hndelConf}
            className='form-control form-control-sm ml-2'
            name={props.name[1]}>
            {props.select.map((mp, i) => (
              <option value={mp.value}>{mp.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
