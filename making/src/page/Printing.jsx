import React, { useState, useEffect } from 'react';

const Printing = (props) => {
  return (
    <div id='print' style={props.style}>
      <div
        style={{}}
        dangerouslySetInnerHTML={{
          __html: `${props?.content ?? '<></>'}`,
        }}></div>
    </div>
  );
};

export default Printing;
