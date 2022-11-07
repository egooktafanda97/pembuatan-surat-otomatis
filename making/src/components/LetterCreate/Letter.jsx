import React, { useRef, useEffect, useState } from "react";
import "./style.scss";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import $ from "jquery";

import { getPapperRequest } from "../../System/Model/model_api";
import styled from "styled-components";
import {
  FaSpinner,
  FaArrowCircleLeft,
  FaPrint,
  FaCog,
  FaEdit,
} from "react-icons/fa";

import GenContent from "./ContentGenerate";
import Modal from "react-responsive-modal";
import axios from "axios";
import { postWizard } from "../ListLetter/model";
// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// test
import { pendudukDummy, Perangkat } from "../../System/data/dummy";

import domtoimage from "dom-to-image";
import swal from "sweetalert";

// ///////////////////////////////////
import Logo from "../config/Logo";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import {
  getPendudukByDesa,
  getpapper,
  getSearchPenduduk,
  getDataPerangkat,
  getKopSurat,
  getPenduduk,
} from "../ListLetter/model";
import { CheckKopSurat, CheckNoSurat } from "./___func";
import Editor from "./Editor";
import PengaturanPrint from "./Pengaturan_print";

export default function Letter(props) {
  const [data, setData] = useState(null);
  const [penduduk, setpenduduk] = useState({});
  const [dataPerangkat, setdataPerangkat] = useState([]);
  const [configPrint, setConfigPrint] = useState(null);
  const componentRef = useRef();
  const Setterpadding = {
    paddingTop: configPrint != undefined && configPrint.paperMargin.top,
    paddingBottom: configPrint != undefined && configPrint.paperMargin.bottom,
    paddingLeft: configPrint != undefined && configPrint.paperMargin.left,
    paddingRight: configPrint != undefined && configPrint.paperMargin.right,
  };
  const [open, setOpen] = useState(false);
  const [openConfigs, setOpenConfigs] = useState(false);
  const [content, setContent] = useState(``);

  // new update
  const [masterPenduduk, setMasterPenduduk] = useState([]);
  const [optionDataPenduduk, setOptionDataPenduduk] = useState([]);
  const [pendudukSelector, setPendudukSelection] = useState({});

  const [statusKop, setStatusKop] = useState(false);
  const [kopSurat, setKopSurat] = useState([]);
  const [optKopSurat, setOptKopSurat] = useState([]);
  const [kopSelected, setKopSelected] = useState(``);
  const [checkStatusNoSurat, setCheckStatusNoSurat] = useState(false);
  const [noSurat, setNosurat] = useState(``);
  const [statusEdit, setStatusEdit] = useState(false);
  // ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (props.open) {
      setOpen(props.open);
    }
  }, [props.open]);
  const [loadingNext, setLoadingNext] = useState(false);

  const getRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    if (
      props.globalData != undefined &&
      Object?.keys(props?.globalData ?? {}).length > 0
    ) {
      setData(props.code);
      setConfigPrint(getRedux.papperSetting);
      setpenduduk(props?.dataPenduduk ?? {});
      setdataPerangkat(props?.dataPerangkat ?? []);
    }
  }, [props.globalData, props.dataPenduduk]);

  const hndelReplacePenduduk = (penduduk) => {
    setpenduduk(penduduk ?? {});
  };

  useEffect(() => {
    if (sessionStorage.getItem("_surat") != undefined) {
      const surat =
        JSON?.parse(sessionStorage.getItem("_surat") ?? "{}") ?? "{}";
      setData(surat?.code ?? "");
      setConfigPrint(JSON.parse(surat?.config_print ?? "{}"));
      hndelGetPenduduk();
      getDataPerangkatDesa();
      func__statusKop(surat?.code ?? "");
      func__checkStatusNoSurat(surat?.code ?? "");
    }
  }, []);
  // const hndelGetPenduduk = () => {
  //   onCloseModal();
  // };
  const hndelBack = () => {
    props.back();
  };

  const hndelCetak = () => {
    const contents = content;
    // console.log(getRedux);
    if ($("#frame-letter").find(".inp").length) {
      $("#frame-letter").find(".inp")[0].focus();
    } else {
      // alert warning
      swal({
        title: "Yakin!",
        text: "Setelah anda mencatak surat, surat akan otomatis tersimpan.",
        icon: "warning",
        button: "OK",
      }).then((komit) => {
        $(".containerLoadingFull")
          .addClass("show-load")
          .removeClass("hide-load");
        if (komit) {
          let mainContent =
            $("#frame-letter div")
              .find(`font[method='dev']`)
              .css("border", "none").prevObject[0]?.innerHTML ?? ``;

          mainContent =
            $(mainContent).find("input[type='checkbox']").hide().prevObject[0]
              ?.innerHTML ?? ``;

          setContent(mainContent);
          var SetValValue = [];
          getRedux.dataPrinting.nameManulInput.map((_, i) => {
            SetValValue.push({
              name: _,
              value: $(mainContent)
                .find("[name=" + _ + "]")
                .text(),
            });
          });
          const form_data = new FormData();
          form_data.append(
            "id_wizard",
            props?.globalData?.id_wizard_template ?? ""
          );
          form_data.append(
            "content",
            $("#frame-letter div")
              .find(`font[method='dev']`)
              .css("border", "none").prevObject[0]?.innerHTML ?? ``
          );
          form_data.append("code", data);
          form_data.append("nik", penduduk.nik);
          form_data.append("penduduk", JSON.stringify(penduduk));
          form_data.append("no_surat", getRedux?.NOSURAT ?? "");
          form_data.append("perangkat", JSON.stringify(dataPerangkat));
          form_data.append("config", JSON.stringify(configPrint));
          form_data.append("input", JSON.stringify(SetValValue));
          // console.log(">>", props);
          postWizard(form_data, (res) => {
            // console.log(res);
          });
          dispatch({
            type: "SET_VALUE_MANUAL_INPUT",
            payload: SetValValue,
          });
          const TimePrint = setInterval(() => {
            $(".containerLoadingFull")
              .addClass("hide-load")
              .removeClass("show-load");
            handlePrint();
            clearInterval(TimePrint);
          }, 1000);
        } else {
          $(".containerLoadingFull")
            .addClass("hide-load")
            .removeClass("show-load");
        }
      });
    }
  };

  const hndelGetPenduduk = (ev) => {
    getPenduduk((result) => {
      if (result?.status ?? 400 == 200) {
        setMasterPenduduk(result.data);
        const opt = [];
        result.data.map((_, i) => {
          opt.push({ value: _.nik, label: _.nama_lengkap });
        });

        setOptionDataPenduduk(opt);
      }
    });
  };
  const func__statusKop = (code) => {
    CheckKopSurat(`<div>${code}</div>`, (res, kop) => {
      setStatusKop(res);
      if (res) {
        getKopSurat((result) => {
          setKopSurat(result.data);

          const opt = [];
          result.data.map((_, i) => {
            opt.push({
              data: _?.code ?? "",
              value: _.id_kop_surat,
              label: _.judul_kop,
            });
          });

          setOptKopSurat(opt);
        });
      }
    });
  };

  const hndelPendudukChange = (thisOpt) => {
    getSearchPenduduk(thisOpt.value, (result) => {
      if (result?.status ?? 400 == 200) {
        setpenduduk(result.data[0]);
      }
    });
  };
  const getDataPerangkatDesa = () => {
    getDataPerangkat((result) => {
      setdataPerangkat(result?.response ?? []);
    });
  };

  const hndelChangeKop = (thisKop) => {
    setKopSelected(thisKop.data);
  };

  const func__checkStatusNoSurat = (code) => {
    CheckNoSurat(`<div>${code}</div>`, (res) => {
      setCheckStatusNoSurat(res);
    });
  };
  const hndelNoSurat = (thisNo) => {
    setNosurat(thisNo.target.value);
  };

  return (
    <div id='printing-root'>
      {statusEdit ? (
        <Editor
          code={data}
          callback={(code) => {
            setData(code);
          }}
          back={() => {
            setStatusEdit(false);
          }}
        />
      ) : (
        <>
          <div id='main-content'>
            <div className='top-bar'>
              <div className='top-menu-printing'>
                <button className='btn-back-printing' onClick={hndelBack}>
                  <FaArrowCircleLeft size={16} />
                </button>
                <div style={{ display: "flex" }}>
                  <button
                    className='btn-printing bg-success'
                    onClick={() => {
                      setStatusEdit(!statusEdit);
                    }}>
                    <FaEdit size={16} /> EDIT
                  </button>
                  {!props.printObj && (
                    <button
                      className='btn-printing bg-secondary'
                      style={{ marginLeft: "10px" }}
                      onClick={hndelCetak}>
                      <FaPrint size={16} /> PRINT
                    </button>
                  )}
                  <div
                    style={{
                      width: "380px",
                    }}></div>
                </div>
              </div>
            </div>
            <div
              className='page'
              style={Setterpadding}
              data-size={configPrint != null && configPrint.paperSize}
              data-layout={configPrint != null && configPrint.paperOrientation}>
              <GenContent
                code={data ?? null}
                penduduk={penduduk}
                perangkat={dataPerangkat}
                kop={kopSelected ?? ""}
                nosurat={noSurat ?? ""}
              />
            </div>
          </div>
          <div id='aside'>
            <div className='header-logo'>
              <Logo />
            </div>
            <div className='content-aside'>
              <Tabs>
                <TabList>
                  <Tab>PROPERTIS</Tab>
                  <Tab>PENGATURAN</Tab>
                </TabList>

                <TabPanel>
                  <div className='content-aside-card'>
                    <div className='form-group'>
                      <label htmlFor=''>Nama Request Surat</label>
                      <Select
                        options={optionDataPenduduk}
                        onChange={hndelPendudukChange}
                      />
                    </div>
                    {statusKop && (
                      <div className='form-group'>
                        <label htmlFor=''>Kop Surat</label>
                        <Select
                          options={optKopSurat}
                          onChange={hndelChangeKop}
                        />
                      </div>
                    )}
                    {checkStatusNoSurat && (
                      <div className='form-group'>
                        <label htmlFor=''>Nomor Surat</label>
                        <input
                          type='text'
                          className='input-text'
                          onKeyUp={hndelNoSurat}
                        />
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <PengaturanPrint defautConfig={configPrint} />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </>
      )}
      <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={componentRef}
          content={content}
          config={getRedux.papperSetting}
        />
      </div>
    </div>
  );
}
