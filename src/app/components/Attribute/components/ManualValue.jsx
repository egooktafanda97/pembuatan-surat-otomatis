import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import $ from "jquery";

import { manual_attribute_template } from "../template/dom_edito_manual_attribute";
import { makeid } from "../../../function/___func";
export default function ManualValue(props) {
  const { InitAttribute } = props;
  const redux = useSelector((state) => state);
  const dispatch = useDispatch();

  const { domEditor } = props;
  const [label, setLabel] = useState("");
  const [id, setId] = useState(makeid(5));
  const [ManuslSelect, setManuslSelect] = useState([]);
  const build = () => {
    const templates = manual_attribute_template({
      id: id,
      input: $("[name='type']").val(),
      msg: $("[name='message']").val(),
      label: label,
    });
    domEditor(templates);
    setId(makeid(5));
  };
  useEffect(() => {
    if (InitAttribute?.Attribute ?? false) {
      setManuslSelect(InitAttribute?.ManualAttributeType ?? []);
    }
  }, []);
  return (
    <div className='group-attr' style={{ marginTop: "30px" }}>
      <div
        className='from-group mb-1'
        style={{
          width: "100%",
        }}>
        <label htmlFor='' className='labels'>
          ID
        </label>
        <div className='text-left msg-inp'>
          {/* <i>id tidak boleh sama</i> */}
        </div>
        <input
          type='text'
          className='form-input-style h-30px shadow-sm'
          name='id'
          onChange={(event) => {
            setId(event.target.value);
          }}
          value={id}
          readOnly
          placeholder='gunakan huruf kecil & unik di setiap penanda'
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
          {/* <i>label kan menjadi label pada text input</i> */}
        </div>
        <input
          type='text'
          className='form-input-style h-30px shadow-sm'
          name='label'
          onChange={(event) => {
            setLabel(event.target.value);
          }}
          placeholder='lebel atribut'
        />
      </div>
      <div
        className='from-group mb-1'
        style={{
          width: "100%",
        }}>
        <label htmlFor='' className='labels'>
          Type
        </label>
        <div className='text-left msg-inp'>{/* <i>jenis input</i> */}</div>
        {/* <Select
          className='select-module'
          options={typeInput}
          onChange={(opt) => setValue(opt)}
        /> */}
        <select name='type' className='form-input-style h-30px shadow-sm'>
          {ManuslSelect.map((mp, i) => (
            <option value={mp.value}>{mp.label}</option>
          ))}
        </select>
      </div>

      <div
        className='from-group mb-1'
        style={{
          width: "100%",
        }}>
        <label htmlFor='' className='labels'>
          Keterangan Input
        </label>
        <div className='text-left msg-inp'>
          {/* <i>jika perlu tambahkan keterangan input di sini</i> */}
        </div>
        <textarea
          type='text'
          className='form-input-style shadow-sm'
          name='message'
          placeholder='keternagan pada inputan'></textarea>
      </div>
      {/* <div
				className="from-group mb-1"
				style={{
					width: "100%",
				}}
			>
				<label htmlFor="" className="labels">
					Simpan Ke Tabel
				</label>
				<select name="addToTable" className="form-input-style h-30px shadow-sm">
					<option value="true">Ya</option>
					<option value="true">Tidak</option>
				</select>
			</div> */}
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <button
          className='btn-ui bg-gray-600'
          style={{
            marginRight: "5px",
            fontWeight: "bold",
          }}
          onClick={build}>
          Reset
        </button>
        <button
          className='btn-ui btn-main-primary'
          style={{ color: "#fff" }}
          onClick={build}>
          apply
        </button>
      </div>
    </div>
  );
}
