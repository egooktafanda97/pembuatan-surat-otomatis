import { PapperSet, LayoutSeting } from './action';
import { State } from './initialState';
function reducer(state = State, action) {
  switch (action.type) {
    case '__INIT_CONFIG__':
      localStorage.setItem('init', JSON.stringify(action.payload));
      return { ...state, __INIT_CONFIG__: action.payload };
      break;
    case 'PAPPER-SETTING':
      const configUpTodate =
        JSON.parse(localStorage.getItem('config')) != undefined
          ? {
              ...JSON.parse(localStorage.getItem('config')),
              ...state,
              papperSetting: PapperSet(action),
            }
          : {
              ...state,
              papperSetting: PapperSet(action),
            };

      localStorage.setItem('config', JSON.stringify(configUpTodate));
      return {
        ...state,
        __INIT_CONFIG__: { ...state?.__INIT_CONFIG__, ...LayoutSeting(action) },
      };
      break;
    case 'MODAL-ACTION':
      return { ...state, modalAttrAction: action.payload };
      break;
    case 'MODAL-ATTAC':
      return { ...state, MODALATTAC: action.payload };
      break;
    case 'ACTION-VALUE':
      localStorage.setItem(
        'config',
        JSON.stringify(
          JSON.parse(localStorage.getItem('config')) != undefined
            ? {
                ...JSON.parse(localStorage.getItem('config')),
                ...state,
                ACTIONVALUE: action.payload,
              }
            : {
                ...state,
                ACTIONVALUE: action.payload,
              }
        )
      );
      return { ...state, ACTIONVALUE: action.payload };
      break;
    case 'ATTACHMENT':
      localStorage.setItem(
        'config',
        JSON.stringify(
          JSON.parse(localStorage.getItem('config')) != undefined
            ? {
                ...JSON.parse(localStorage.getItem('config')),
                ...state,
                ATTACHMENT: action.payload,
              }
            : {
                ...state,
                ATTACHMENT: action.payload,
              }
        )
      );
      return { ...state, ATTACHMENT: action.payload };
      break;
    case 'REDUX_SETUP_EDIT_ACTION':
      return { ...state, ...action.payload };
    case 'PREVIEW':
      return { ...state, preview: action.payload };
      break;
    case 'SET_INPUT_NAME':
      return {
        ...state,
        dataPrinting: { ...state.dataPrinting, nameManulInput: action.payload },
      };
      break;
    case 'SET_VALUE_MANUAL_INPUT':
      return {
        ...state,
        dataPrinting: {
          ...state.dataPrinting,
          valueManualInput: action.payload,
        },
      };
      break;
    case 'SET_ATTRIBUTE_SAVE':
      return { ...state, ATTRIBUTE_SAVE: action.payload };
      break;
    default:
      localStorage.setItem('config', JSON.stringify(state));
      sessionStorage.setItem('phase', 'created');
      break;
  }
}

export default reducer;
