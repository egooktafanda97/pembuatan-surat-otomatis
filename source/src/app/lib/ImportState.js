export function ImportState(props) {
  const { dispatch, storageDataUpdate } = props;
  const editData = JSON.parse(storageDataUpdate ?? '[]');
  const States = {
    papperSetting: JSON.parse(editData.config_print ?? '[]'),
    config: JSON.parse(editData.config ?? '[]'),
    dataPrinting: {
      nameManulInput: [],
      valueManualInput: {},
    },
    modalAttrAction: 'show-mod',
    MODALATTAC: 'show-mod',
    ACTIONVALUE: ``,
    ATTACHMENT: JSON.parse(editData.attachment ?? '[]'),
    preview: 'hide-preview',
    ATTRIBUTE_SAVE: JSON.parse(editData?.attribute_builder ?? '[]'),
  };

  dispatch({ type: 'REDUX_SETUP_EDIT_ACTION', payload: States });
  localStorage.setItem('config', JSON.stringify(States));
  if (
    sessionStorage.getItem('content_update') == false ||
    sessionStorage.getItem('content_update') == undefined
  ) {
    localStorage.setItem('_contens', editData.code);
  }

  sessionStorage.setItem('phase', 'edit');
  console.log('ok');
  return States;
}
