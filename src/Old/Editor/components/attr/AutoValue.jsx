import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function AutoValue(props) {
  const [load, setLoad] = useState(true);
  const [conf, setConf] = useState(props);
  const [template, setTemplate] = useState("");
  const [dataset, setDataset] = useState([]);
  const [value, setValue] = useState({});

  useEffect(() => {
    if (props.config != undefined) {
      setConf(props.config);
      setDataset(props.config.components);
      setLoad(false);
    }
  }, [props.config]);

  const build = () => {
    var dataConfig = conf;
    var template = ``;
    var addAttr = ``;
    for (var key in value) {
      if (key != "selected") {
        addAttr += ` ${key}="${value[key]}" `;
      }
    }
    template = `<font> ${
      dataConfig.name == "signature"
        ? `<font><img name="img-${dataConfig.name}" ${addAttr} type="img-${dataConfig.type}"  formLabel="img-signature"  src='https://hastaprakarsa.co.id/wp-content/uploads/2020/02/tanda-tangan-mujiono.png' style='width:100px; height:70px; display:inline-block;'>  <br/></font>`
        : ""
    }&emsp;</font><font name="${dataConfig.name}" type="${
      dataConfig.type
    }" ${addAttr} table="${dataConfig.parameter.table}" formLabel="${
      value.selected.label
    }" style='background:${
      dataConfig.parameter.color
    }; color:#fff;border-radius:5px; padding-left:2px;padding-right:2px;'>${
      value.selected.label
    }</font><font> </font> &emsp;`;
    props.addAttr(template);
    // setValue({});
  };

  const hndelOnchange = (ev) => {
    var Obj = { [ev.attr.attr]: ev.opt.value };
    if (ev.attr.primary) {
      Obj.selected = ev.opt;
    }
    setValue({ ...value, ...Obj });
  };
  return load ? (
    <span>loading...</span>
  ) : (
    <div className='group-attr' style={{ marginTop: "30px" }}>
      {dataset.map((itm, i) => (
        <div
          key={i}
          className='from-group mb-3'
          style={{
            width: "100%",
          }}>
          <label htmlFor='' className='labels'>
            {itm.title}
          </label>
          <Select
            className='form-input-style h-30px shadow-sm'
            options={itm.dataset}
            onChange={(opt) => {
              hndelOnchange({
                opt: opt,
                attr: itm,
              });
            }}
          />
        </div>
      ))}
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}>
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
