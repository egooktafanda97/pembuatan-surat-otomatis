import React, { forwardRef, useRef, useEffect } from 'react';
import './style/stylePrint.scss';
export const ComponentToPrint = forwardRef((props, ref) => {
  useEffect(() => {
    // console.log(">>", props);
  }, [props]);
  $('.action-button').click(function () {
    // console.log($(this).attr("action"));
  });
  return (
    <div ref={ref}>
      <style>
        {` @media print{
            @page {
              size: ${props.paperSize} ${props.orientasi} !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            body {
              overflow-wrap: break-word !important;
              margin-top: ${props.margin.top} !important;
              margin-bottom: ${props.margin.bottom} !important;
              margin-left: ${props.margin.left} !important;
              margin-right: ${props.margin.right} !important; 
              border:2px solid 000;      
            }
          }`}
      </style>
      <div
        style={{}}
        dangerouslySetInnerHTML={{
          __html: `${props?.content ?? '<></>'}`,
        }}></div>
    </div>
  );
});
