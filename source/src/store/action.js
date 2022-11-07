export const PapperSet = (action) => {
  var width = `${action.payload.size.split(",")[0]}`;
  var height = `${action.payload.size.split(",")[1]}`;
  if (action.payload.orientation == "landscape") {
    width = `${action.payload.size.split(",")[1]}`;
    height = `${action.payload.size.split(",")[0]}`;
  }
  // console.log(">", action.payload.size);
  const Obj = {
    paperSize: action.payload.papper,
    paperOrientation: action.payload.orientation,
    paperMargin: {
      top: `${action.payload.marginTop}${action.payload.satuan}`,
      left: `${action.payload.marginLeft}${action.payload.satuan}`,
      right: `${action.payload.marginRight}${action.payload.satuan}`,
      bottom: `${action.payload.marginBottom}${action.payload.satuan}`,
    },
    width: width,
    height: height,
  };
  return Obj;
};

export const LayoutSeting = (action) => {
  return {
    Layout: {
      name: "printConfig",
      title: "Konfigurasi Print",
      props: [
        {
          type: "select",
          label: "papper",
          name: "papper",
          defaultValue: action.payload.size,
          select: [
            { label: "A4", value: "A4", width: "210", height: "297" },
            { label: "A5", value: "A5", width: "148.5", height: "210" },
          ],
        },
        {
          type: "text-group-select",
          label: "Margin Top",
          name: ["marginTop", "satuan"],
          defaultValue: `${action.payload.marginTop}`,
          selectedSatuan: `${action.payload.satuanTop}`,
          select: [
            { label: "Cm", value: "cm" },
            { label: "mm", value: "mm" },
            { label: "Inci", value: "inci" },
          ],
        },
        {
          type: "text-group-select",
          label: "Margin Right",
          name: ["marginRight", "satuan"],
          defaultValue: `${action.payload.marginRight}`,
          selectedSatuan: `${action.payload.satuanRight}`,
          select: [
            { label: "Cm", value: "cm" },
            { label: "mm", value: "mm" },
            { label: "Inci", value: "inci" },
          ],
        },
        {
          type: "text-group-select",
          label: "Margin Left",
          name: ["marginLeft", "satuan"],
          defaultValue: `${action.payload.marginLeft}`,
          selectedSatuan: `${action.payload.satuanLeft}`,
          select: [
            { label: "Cm", value: "cm" },
            { label: "mm", value: "mm" },
            { label: "Inci", value: "inci" },
          ],
        },
        {
          type: "text-group-select",
          label: "Margin Bottom",
          name: ["marginBottom", "satuan"],
          defaultValue: `${action.payload.marginBottom}`,
          selectedSatuan: `${action.payload.satuanBottom}`,
          select: [
            { label: "Cm", value: "cm" },
            { label: "mm", value: "mm" },
            { label: "Inci", value: "inci" },
          ],
        },
        {
          type: "select",
          label: "Orientation",
          name: "orientation",
          defaultValue: action.payload.orientation,
          select: [
            { label: "Portrait", value: "portrait" },
            { label: "Landscape", value: "landscape" },
          ],
        },
      ],
    },
  };
};
