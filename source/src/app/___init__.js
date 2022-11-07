import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// internal import ====================
import { isEmpty } from "./function/___func";
import { style } from "./scss/style";
import Editor from "./Editor";
import Preview from "../LetterCreate/Letter";

// ===================================

export default function __Init__(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.InitLoad) {
      dispatch({ type: "__INIT_CONFIG__", payload: props.Instance });
    }
  }, [props.Instance, props.InitLoad]);

  return (
    <div className='App'>
      {!isEmpty(state?.__INIT_CONFIG__ ?? {}) && (
        <>
          <Editor />
          <div
            id='modal-full'
            className={`${state?.preview ?? "hide-preview"}`}>
            <div style={style.containers}>
              {(state?.preview ?? "hide-preview") != "hide-preview" && (
                <Preview />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
