import React, { forwardRef, useRef, useEffect } from "react";
export const ComponentToPrint = forwardRef((props, ref) => {
  useEffect(() => {
    // console.log(">>", props);
  }, [props]);
  $(".action-button").click(function () {
    // console.log($(this).attr("action"));
  });
  return (
    <div ref={ref}>
      <style>
        {` @media print{
            @page {
              size: ${props.paperSize} ${props.orientasi};
              margin: 0 !important;
              padding: 0 !important;
            }
            body {
              margin-top: ${props.margin.top};
              margin-bottom: ${props.margin.bottom};
              margin-left: ${props.margin.left};
              margin-right: ${props.margin.right};       
            }
          }`}
      </style>
      <div
        dangerouslySetInnerHTML={{
          __html: `${props?.content ?? "<></>"}`,
        }}></div>
    </div>
  );
});
