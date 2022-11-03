function Attribute(props) {
  const [attrPage, setAttrPage] = useState("penduduk");
  return (
    <div className='contai'>
      <div className='w-100 cont-link-attr-props'>
        <span
          onClick={() => {
            setAttrPage("penduduk");
          }}
          className={`link-attr-props ${
            attrPage == "penduduk" ? "active" : ""
          }`}>
          Penduduk
        </span>{" "}
        <span
          onClick={() => {
            setAttrPage("perangkat");
          }}
          className={`link-attr-props ${
            attrPage == "perangkat" ? "active" : ""
          }`}>
          Perangkat
        </span>{" "}
        <span
          onClick={() => {
            setAttrPage("orang_tua");
          }}
          className={`link-attr-props ${
            attrPage == "orang_tua" ? "active" : ""
          }`}>
          Orang Tua
        </span>
        <span
          onClick={() => {
            setAttrPage("input");
          }}
          className={`link-attr-props ${attrPage == "input" ? "active" : ""}`}>
          Input
        </span>
      </div>
      {attrPage == "penduduk" ? (
        <Penduduk {...props} />
      ) : attrPage == "perangkat" ? (
        <Perangkat {...props} />
      ) : <AttrInput {...props} /> ? (
        <OrangTua {...props} />
      ) : (
        ""
      )}
    </div>
  );
}

const Penduduk = (props) => {
  const [value, setValue] = useState([]);
  const [param, setParam] = useState("penduduk");
  const [label, setLabel] = useState("");
  return (
    <div className='group-attr'>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
        }}>
        <label htmlFor='' className='labels'>
          Pilih Atribute Penduduk
        </label>
        <div className='text-left msg-inp'>
          <i>data akan otomatis terisi dengan data yang di pilih</i>
        </div>
        <Select
          className='select-module'
          options={pendudukSelect}
          onChange={(opt) =>
            setValue({
              key: opt.label,
              param: param,
              label: opt.label,
              formlabel: label,
              color: "green",
              mode: "auto",
              type: "text",
            })
          }
        />
      </div>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <button
          className='btn-ui btn-main-primary'
          onClick={() => {
            props.addAttr(value);
          }}>
          apply
        </button>
      </div>
    </div>
  );
};

const OrangTua = (props) => {
  const [value, setValue] = useState([]);
  const [param, setParam] = useState("penduduk");
  const [label, setLabel] = useState("");
  return (
    <div className='group-attr'>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
        }}>
        <label htmlFor='' className='labels'>
          Pilih Atribute Orangtua
        </label>
        <div className='text-left msg-inp'>
          <i>data akan otomatis terisi dengan data yang di pilih</i>
        </div>
        <Select
          className='select-module'
          options={pendudukSelect}
          onChange={(opt) =>
            setValue({
              key: opt.label,
              param: param,
              label: opt.label,
              formlabel: label,
              color: "green",
              mode: "auto",
              type: "text",
            })
          }
        />
      </div>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <button
          className='btn-ui btn-main-primary'
          onClick={() => {
            props.addAttr(value);
          }}>
          apply
        </button>
      </div>
    </div>
  );
};

const Perangkat = (props) => {
  const [value, setValue] = useState([]);
  const [param, setParam] = useState("perangkat");
  const [label, setLabel] = useState("");
  return (
    <div className='group-attr'>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
        }}>
        <label htmlFor='' className='labels'>
          Pilih Atribute Perangkat
        </label>
        <div className='text-left msg-inp'>
          <i>data akan otomatis terisi dengan data yang di pilih</i>
        </div>
        <Select
          className='select-module'
          options={pendudukSelect}
          onChange={(opt) =>
            setValue({
              key: opt.label,
              param: param,
              label: opt.label,
              formlabel: label,
              color: "#094bb5",
              mode: "auto",
              type: "text",
            })
          }
        />
      </div>
      <div
        className='from-group mb-3'
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <button
          className='btn-ui btn-main-primary'
          onClick={() => {
            props.addAttr(value);
          }}>
          apply
        </button>
      </div>
    </div>
  );
};
