import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import AutoValue from './components/attr/AutoValue';
import ManualValue from './components/attr/ManualValue';
import Properti from './components/setting/Properti';
import Action from './components/action/Action';
import Attachment from './components/Attachment/Attachment';
import { useSelector, useDispatch } from 'react-redux';
import { Kop, NoSurat } from '../../System/config/constant_attr';
import Attr from '../../System/config/attribute.json';

export default function BarMenu(props) {
  const dispatch = useDispatch();
  const [pageItem, setpageItem] = useState(() => {});
  const hndelPageAttr = (name) => {
    setpageItem(
      <AutoValue {...props} config={Attr.find((x) => x.name === name)} />
    );
  };
  return (
    <div className='containers-bar'>
      <div className='top-bar-clases'>
        {/* <button className='btn-ui'>attr</button> */}
        <Popup
          trigger={<button className='btn-ui'>attr</button>}
          position='left top'>
          <ul className='ul-dropdown'>
            {Attr.map((attr, index) => (
              <li
                className='li-dropdown title-option-menu'
                key={index}
                onClick={() => {
                  hndelPageAttr(attr.name);
                }}>
                <a className='button-dropdown'>{attr.title}</a>
              </li>
            ))}
            <li
              className='li-dropdown title-option-menu'
              onClick={() => {
                setpageItem(<ManualValue {...props} />);
              }}>
              <a className='button-dropdown'>Inputan</a>
            </li>
            <li
              className='li-dropdown title-option-menu'
              onClick={() => {
                props.addAttr(NoSurat());
              }}>
              <a className='button-dropdown'>Nomor Surat</a>
            </li>
            <li
              className='li-dropdown title-option-menu'
              onClick={() => {
                props.addAttr(Kop());
              }}>
              <a className='button-dropdown'>Komponen Kop</a>
            </li>
          </ul>
        </Popup>
        <button
          className='btn-ui'
          onClick={() => {
            setpageItem(<Properti modal={`show-mod`} />);
          }}>
          prop
        </button>
        <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: 'MODAL-ACTION', payload: 'show-mod' });
            setpageItem(<Action />);
          }}>
          action
        </button>
        <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: 'MODAL-ATTAC', payload: 'show-mod' });
            setpageItem(<Attachment />);
          }}>
          attac
        </button>
        <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: 'PREVIEW', payload: 'show-preview' });
          }}>
          preview
        </button>
      </div>
      {pageItem}
      {/* <ManualValue {...props} />
      {Config.map((resource, i) => (
        <AutoValue {...props} config={resource} />
      ))} */}
      {/* {props.children} */}
    </div>
  );
}
