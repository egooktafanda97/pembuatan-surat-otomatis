import React, { useState, useEffect } from "react";
import Select from "react-select";

import AutoValue from "./AutoValue";
import ManualValue from "./ManualValue";
import Config from "../../../System/config/attribute.json";

export default function Attr(props) {
  return (
    <div>
      <ManualValue {...props} />
      {Config.map((resource, i) => (
        <AutoValue {...props} config={resource} />
      ))}
    </div>
  );
}
