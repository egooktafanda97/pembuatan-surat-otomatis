import React, { useRef, useEffect, useState } from "react";
import "./style.scss";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../ComponentToPrint";
import $ from "jquery";

import { getPapperRequest } from "../../../System/Model/model_api";
import styled from "styled-components";
import {
  FaSpinner,
  FaArrowCircleLeft,
  FaPrint,
  FaCog,
  FaEdit,
} from "react-icons/fa";

import GenContent from "../ContentGenerate";
import Modal from "react-responsive-modal";
import axios from "axios";
import { postWizard } from "../../ListLetter/model";
// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// test
import { pendudukDummy, Perangkat } from "../../../System/data/dummy";

import domtoimage from "dom-to-image";
import swal from "sweetalert";

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
    if (Object.keys(props.globalData).length > 0) {
      setData(props.code);
      setConfigPrint(getRedux.papperSetting);
      setpenduduk(props?.dataPenduduk ?? {});
      setdataPerangkat(props?.dataPerangkat ?? []);
    }
  }, [props.globalData, props.dataPenduduk]);

  const hndelGetPenduduk = () => {
    onCloseModal();
  };
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
            console.log(res);
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
        }
      });
    }
  };

  return (
    <div id='printing'>
      <div className='top-menu-printing'>
        <button className='btn-back-printing' onClick={hndelBack}>
          <FaArrowCircleLeft size={16} />
        </button>
        <div style={{ display: "flex" }}>
          <button
            className='btn-printing'
            onClick={() => {
              dispatch({
                type: "SET_CODE",
                payload: {
                  code: `${$("#content").children()[0].innerHTML}`,
                },
              });
              props.editContent();
            }}>
            <FaEdit size={16} />
          </button>
          {!props.printObj && (
            <button
              className='btn-printing'
              style={{ marginLeft: "10px" }}
              onClick={hndelCetak}>
              <FaPrint size={16} />
            </button>
          )}
        </div>
      </div>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={componentRef}
          content={content}
          config={getRedux.papperSetting}
        />
      </div>
      <Modal closeOnOverlayClick={false} open={open} closeOnEsc={false} center>
        <div className='cards p-3' style={{ width: "400px" }}>
          <div
            className='from-group mb-1'
            style={{
              width: "100%",
            }}>
            <label htmlFor='' className='labels'>
              NIK
            </label>
            <div className='text-left msg-inp'>
              {/* <i>label kan menjadi label pada text input</i> */}
            </div>
            <input
              type='text'
              className='form-input-style h-30px shadow-sm'
              style={{ border: "1px solid #ccc" }}
              name='nik'
              placeholder='lebel atribut'
            />
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}>
            <button
              onClick={hndelGetPenduduk}
              className='btn-ui'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}>
              {loadingNext && (
                <FaSpinner
                  className='icon_pulse'
                  style={{ marginRight: "10px" }}
                />
              )}
              <span>Next</span>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        // closeOnOverlayClick={false}
        open={openConfigs}
        // onClose={onCloseModal}
        closeOnEsc={false}
        center>
        <div className='cards p-3' style={{ width: "400px" }}>
          <div
            className='from-group mb-1'
            style={{
              width: "100%",
            }}>
            <label htmlFor='' className='labels'>
              NIK
            </label>
            <div className='text-left msg-inp'>
              {/* <i>label kan menjadi label pada text input</i> */}
            </div>
            <input
              type='text'
              className='form-input-style h-30px shadow-sm'
              style={{ border: "1px solid #ccc" }}
              name='nik'
              placeholder='lebel atribut'
            />
          </div>
          <div
            style={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}>
            <button
              onClick={hndelGetPenduduk}
              className='btn-ui'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}>
              {loadingNext && (
                <FaSpinner
                  className='icon_pulse'
                  style={{ marginRight: "10px" }}
                />
              )}
              <span>Next</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* ================================================ */}
      <div className='mt-5 mb-5'>
        <div
          className='page'
          style={Setterpadding}
          data-size={configPrint != null && configPrint.paperSize}
          data-layout={configPrint != null && configPrint.paperOrientation}>
          <GenContent
            code={data ?? null}
            penduduk={penduduk}
            perangkat={dataPerangkat}
          />
        </div>
      </div>
      <div className='containerLoadingFull hide-load'>
        <div className='loaderWidget'></div>
        <h2 className='mt-3 loadText'>Loading</h2>
      </div>
    </div>
  );
}
