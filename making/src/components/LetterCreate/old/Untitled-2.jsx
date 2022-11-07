<div id='printing-root'>
  <div id='printing'>
    <div className='top-menu-printing'>
      <button className='btn-back-printing' onClick={hndelBack}>
        <FaArrowCircleLeft size={16} />
      </button>
      <div style={{ display: "flex" }}>
        <button
          className='btn-printing'
          onClick={() => {
            dispatch({
              type: "SET_CODE",
              payload: {
                code: `${$("#content").children()[0].innerHTML}`,
              },
            });
            props.editContent();
          }}>
          <FaEdit size={16} />
        </button>
        {!props.printObj && (
          <button
            className='btn-printing'
            style={{ marginLeft: "10px" }}
            onClick={hndelCetak}>
            <FaPrint size={16} />
          </button>
        )}
      </div>
    </div>
    <div style={{ display: "none" }}>
      <ComponentToPrint
        ref={componentRef}
        content={content}
        config={getRedux.papperSetting}
      />
    </div>

    {/* ================================================ */}
    <div className='mt-5 mb-5 pages-printing-preview'>
      <div
        className='page'
        style={Setterpadding}
        data-size={configPrint != null && configPrint.paperSize}
        data-layout={configPrint != null && configPrint.paperOrientation}>
        <GenContent
          code={data ?? null}
          penduduk={penduduk}
          perangkat={dataPerangkat}
        />
      </div>
    </div>
    <div className='containerLoadingFull hide-load'>
      <div className='loaderWidget'></div>
      <h2 className='mt-3 loadText'>Loading</h2>
    </div>
  </div>
  <div id='right-model'></div>
</div>;
