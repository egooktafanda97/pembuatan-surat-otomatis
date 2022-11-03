import React from "react";

export const manual_attribute_template = ({ id, input, msg, label }) =>
  `<font> </font
    ><font
      type="manual"
      idForm="${id}"
      input="${input}"
      formLabel="${label?.trim()}"
      msg="${msg}"
      name="${label?.replace(/[^A-Z0-9]/gi, "")}"
      style="background:magenta; color:#fff;border-radius:5px; padding-left:2px;padding-right:2px;"
      >${label}</font
    ><font> </font> &emsp;`;
