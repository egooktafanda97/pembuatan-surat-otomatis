import React, { useState, useEffect } from "react";
import Select from "react-select";
import swal from "@sweetalert/with-react";
import { FaFileAlt, FaTimes, FaCog, FaTrash } from "react-icons/fa";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
// ==========================================================

export default function Attachment(props) {
  const dispatch = useDispatch();
  const getRedux = useSelector((state) => state);
  const [modTrigger, setModTrigger] = useState("");
  useEffect(() => {
    setModTrigger(props.showModel);
  }, [props.showModel]);

  const addAttc = () => {
    const Att = getRedux.ATTACHMENT;
    dispatch({
      type: "ATTACHMENT",
      payload: [
        ...Att,
        {
          name: $("#name").val(),
          value: $("#label").val(),
          keterangan: $("#keterangan").val(),
          required: $("#required").val(),
          file_type: $("#file_type").val(),
        },
      ],
    });
  };
  return (
    <div>
      <div className={`modal-costumes ${modTrigger}`}>
        <div className='flex-center-between mb-3'>
          <h5>Attachment</h5>
          <span
            className='btn-closed'
            onClick={() => {
              setModTrigger("hide-mod");
              props.onClickClose();
            }}>
            <FaTimes />
          </span>
        </div>
        <hr />
        <div style={{ width: "100%" }}>
          <div className='cards'>
            <div className='' style={{ padding: "10px" }}>
              <div className='text-left mt-4'>
                <div
                  className='from-group mb-1'
                  style={{
                    width: "100%",
                  }}>
                  <label htmlFor='' className='labels'>
                    Name
                  </label>
                  <div className='text-left msg-inp'>
                    {/* <i>jenis input</i> */}
                  </div>
                  <input
                    type='text'
                    className='form-input-style h-30px shadow-sm'
                    id='name'
                    placeholder='lebel atribut'
                  />
                </div>
                <div
                  className='from-group mb-1'
                  style={{
                    width: "100%",
                  }}>
                  <label htmlFor='' className='labels'>
                    Label
                  </label>
                  <div className='text-left msg-inp'>
                    {/* <i>jenis input</i> */}
                  </div>
                  <input
                    type='text'
                    className='form-input-style h-30px shadow-sm'
                    id='label'
                    placeholder='lebel atribut'
                  />
                </div>
                <div
                  className='from-group mb-1'
                  style={{
                    width: "100%",
                  }}>
                  <label htmlFor='' className='labels'>
                    Keterangan
                  </label>
                  <div className='text-left msg-inp'>
                    {/* <i>jika perlu tambahkan keterangan input di sini</i> */}
                  </div>
                  <textarea
                    type='text'
                    className='form-input-style shadow-sm'
                    id='keterangan'
                    placeholder='keternagan lampiran'></textarea>
                </div>
                {/* select */}
                <div
                  className='from-group mb-1'
                  style={{
                    width: "100%",
                  }}>
                  <label htmlFor='' className='labels'>
                    Required
                  </label>
                  <div className='text-left msg-inp'>
                    {/* <i>jika perlu tambahkan keterangan input di sini</i> */}
                  </div>
                  <select className='form-input-style shadow-sm' id='required'>
                    <option value='1'>Ya</option>
                    <option value='0'>Tidak</option>
                  </select>
                </div>
                <div
                  className='from-group mb-1'
                  style={{
                    width: "100%",
                  }}>
                  <label htmlFor='' className='labels'>
                    Type File Input
                  </label>
                  <div className='text-left msg-inp'>
                    {/* <i>jika perlu tambahkan keterangan input di sini</i> */}
                  </div>
                  <select className='form-input-style shadow-sm' id='file_type'>
                    <option value='image'>Image jpg/png/*</option>
                    <option value='file'>File pdf/docx/*</option>
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                    marginBottom: "5px",
                  }}>
                  <button
                    className='btn-ui btn-main-primary'
                    style={{ color: "#fff" }}
                    onClick={addAttc}>
                    Add
                  </button>
                </div>
              </div>
              <hr />
              <div className='col-12 text-left mt-4'>
                <table
                  className='mytable'
                  border={1}
                  style={{ fontSize: ".6em" }}>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Label</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getRedux.ATTACHMENT.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{val.name}</td>
                          <td>{val.value}</td>
                          <td>
                            <button
                              className='btn-ui btn-main-danger'
                              onClick={() => {
                                const Att = getRedux.ATTACHMENT;
                                Att.splice(index, 1);
                                dispatch({
                                  type: "ATTACHMENT",
                                  payload: Att,
                                });
                              }}>
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
