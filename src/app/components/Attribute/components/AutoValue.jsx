import React, { useState, useEffect } from "react";
import Select from "react-select";
import { attribute_template } from "../template/dom_editor_autometic_attribute";

export default function AutoValue(props) {
  const { config, domEditor } = props;
  const [load, setLoad] = useState(true);
  const [conf, setConf] = useState(props);
  const [template, setTemplate] = useState("");
  const [dataset, setDataset] = useState([]);
  const [value, setValue] = useState({});

  useEffect(() => {
    if (config != undefined) {
      setConf(config);
      setDataset(config.components);
      setLoad(false);
    }
  }, [config]);

  const build = () => {
    var dataConfig = conf;
    var addAttr = ``;
    for (var key in value) {
      if (key != "selected") {
        addAttr += ` ${key}="${value[key]}" `;
      }
    }
    const template = attribute_template({
      dataConfig: dataConfig,
      addAttr: addAttr,
      value: value,
    });
    domEditor(template);
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
            Pilih {itm.title}
          </label>
          <Select
            className='mb-3'
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
          marginTop: "10px",
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
