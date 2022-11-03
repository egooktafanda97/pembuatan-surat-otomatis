import React, { useState, useEffect } from "react";
import axios from "axios";
import AutoValue from "./components/AutoValue";
import ManualValue from "./components/ManualValue";

export default function BuilderAttribute(props) {
  const { InitAttribute, onSetpageItem, domEditor, close } = props;
  const [attribute, setAttribute] = useState([]);
  const [appendStaticHtml, setAppendStaticHtml] = useState([]);
  const AuttoLayout = (name) => {
    onSetpageItem(
      <AutoValue
        {...props}
        InitAttribute={InitAttribute?.Attribute}
        config={attribute.find((x) => x.name === name)}
      />
    );
  };
  const ManualLayout = () => {
    onSetpageItem(<ManualValue {...props} />);
  };

  const StaticHtmlLayout = (attribute) => {
    const StaticHtml = async () => {
      const get = await axios
        .get(attribute.urlHtml, {
          headers: {
            Accept: "application/text",
          },
        })
        .catch(() => {
          console.log("error");
        });
      if (get?.data) {
        domEditor(get?.data);
      }
    };
    StaticHtml();
  };

  useEffect(() => {
    setAttribute(InitAttribute?.Attribute ?? []);
    setAppendStaticHtml(InitAttribute?.AppendStaticHtml ?? []);
  }, []);

  return (
    <ul className='ul-dropdown'>
      {attribute.map((attr, index) => (
        <li
          className='li-dropdown title-option-menu'
          key={index}
          onClick={() => {
            AuttoLayout(attr.name, AutoValue);
          }}>
          <a className='button-dropdown'>{attr.title}</a>
        </li>
      ))}
      <li
        className='li-dropdown title-option-menu'
        onClick={() => {
          ManualLayout();
        }}>
        <a className='button-dropdown'>Inputan</a>
      </li>
      {appendStaticHtml?.map((attr, inx) => (
        <li
          key={inx}
          className='li-dropdown title-option-menu'
          onClick={() => {
            StaticHtmlLayout(attr);
          }}>
          <a className='button-dropdown'>{attr?.label}</a>
        </li>
      ))}
    </ul>
  );
}
