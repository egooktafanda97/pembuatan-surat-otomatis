import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// internal import =====================
import reducer from './store/index';
import Init from './app/___init__';
// =====================================

const store = createStore(reducer);

const Routers = () => {
  const [instance, setInstance] = useState({});
  const [load, setLoad] = useState(false);
  useEffect(() => {
    getMoviesFromApi();
  }, []);

  async function getMoviesFromApi() {
    try {
      if (window?.dataSet?.initJsonUrl == undefined)
        throw new Error('window.dataSet.initJsonUrl undefined');
      let response = await fetch(window?.dataSet?.initJsonUrl ?? '');
      let responseJson = await response.json();
      if (responseJson) {
        setLoad(true);
        setInstance(responseJson);
      }
    } catch (error) {
      throw new Error('Error occured: ', error);
    }
  }

  return (
    <Provider store={store}>
      <React.StrictMode>
        <Init InitLoad={load} Instance={instance} />
      </React.StrictMode>
    </Provider>
  );
};

ReactDOM.render(<Routers />, document.getElementById('root'));
reportWebVitals();
