import React, { useEffect, useState, useRef } from "react";
import {
  useCKEditor,
  CKEditorEventAction,
  registerEditorEventHandler,
} from "ckeditor4-react";

export function useEditor(elemetId, onChange) {
  return {
    elemetId,
    dispatchEvent: (action) => {
      switch (action.type) {
        case CKEditorEventAction.focus:
          // console.log(`Will be called with initial value of ${someProp}.`);
          break;
        case CKEditorEventAction.change:
          onChange(action.payload.editor.getData());

          break;
        default:
          break;
      }
    },
    subscribeTo: ["focus", "change"],
    contenteditable: true,
    config: {
      extraPlugins: "fixed",
      extraPlugins: "sharedspace",
      removePlugins: "maximize,resize",
      resize_enabled: false,
      tabSpaces: 4,
      allowedContent: true,
      line_height: "1em;1.1em;1.2em;1.3em;1.4em;1.5em",
      sharedSpaces: {
        top: "top",
        bottom: "editors",
      },
      removeButtons: "PasteFromWord",
    },
  };
}

export function register(editor) {
  return {
    editor,
    evtName: "focus",
    handler: () => {
      console.log(
        `Will be called with current value of ${someProp} before regular event handlers.`
      );
    },
    priority: 0,
  };
}
