import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useSelector, useDispatch } from 'react-redux';

// components ================================================
import BuilderAttribute from './Attribute/BuilderAttribute';
import Properti from './setting/Properti';
import Attachment from './Attachment/Attachment';

export default function BuildComponents(props) {
  const redux = useSelector((state) => state);
  const dispatch = useDispatch();
  const [InitAttribute, setInitAttribute] = useState([]);
  const [InitLayout, setInitLayout] = useState([]);
  const [InitLayoutStorage, setInitLayoutStorage] = useState([]);
  const [pageItem, setpageItem] = useState(() => {});

  useEffect(() => {
    if (redux?.__INIT_CONFIG__?.AttributeMenu ?? false) {
      setInitAttribute(redux?.__INIT_CONFIG__?.AttributeMenu);
    }
    if (redux?.__INIT_CONFIG__?.Layout ?? false) {
      setInitLayout(redux?.__INIT_CONFIG__?.Layout);
      if (!JSON.parse(localStorage.getItem('init')).Layout) return;
      setInitLayoutStorage(JSON.parse(localStorage.getItem('init')).Layout);
    }
  }, []);
  return (
    <div className='containers-bar'>
      <div className='top-bar-clases'>
        <Popup
          nested
          trigger={<button className='btn-ui'>Apped</button>}
          position='left top'>
          {(close) => (
            <BuilderAttribute
              {...props}
              InitAttribute={InitAttribute}
              onSetpageItem={(pages) => {
                setpageItem(pages);
              }}
              onClose={close}
            />
          )}
        </Popup>
        <button
          className='btn-ui'
          onClick={() => {
            setpageItem(
              <Properti {...props} InitLayout={InitLayout} modal={`show-mod`} />
            );
          }}>
          layout
        </button>
        <button
          className='btn-ui'
          onClick={() => {
            setpageItem(
              <Attachment
                showModel='show-mod'
                onClickClose={() => {
                  setpageItem(() => {});
                }}
              />
            );
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
        {/* <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: "MODAL-ACTION", payload: "show-mod" });
            setpageItem(<Action />);
          }}>
          action
        </button> */}
        {/* <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: "MODAL-ATTAC", payload: "show-mod" });
            setpageItem(<Attachment />);
          }}>
          attac
        </button>
        <button
          className='btn-ui'
          onClick={() => {
            dispatch({ type: "PREVIEW", payload: "show-preview" });
          }}>
          preview
        </button> */}
      </div>
      {pageItem}
    </div>
  );
}
