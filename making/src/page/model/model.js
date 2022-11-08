import {
  url_api,
  url_assets,
  url_base,
  url_api_server,
} from '../config/config';
import axios from 'axios';
import moment from 'moment';
import { penduduk, perangkat } from '../config/dummy';

const getpapper = async (cari, respose) => {
  const getSurat = await axios
    .get(`${url_api_server}wizard/getPapper/${cari}`)
    .catch((err) => {
      console.log(err);
    });
  respose(getSurat);
};
const getSearchPenduduk = (searching, respose) => {
  api_get(`${url_api_server}wizard/getPenduduk/${searching}`, respose);
};

const getPenduduk = (respose) => {
  api_get(`${url_api_server}wizard/getPenduduk`, respose);
};

const getPendudukByDesa = async (respose) => {
  respose(penduduk);
};
const getDataPerangkat = async (respose) => {
  const gets = await axios
    .get(`${url_api_server}perangkat/getPerangkatDesa`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('_token'),
      },
    })
    .catch((err) => {
      response(err.respose);
    });
  if (gets) {
    response(gets);
  }
};

const getKopSurat = (respose) => {
  api_get(`${url_api_server}kop/getKopByAuth`, respose);
};

const postWizard = (data, respose) => {
  api_post(`${url_api_server}surat/create`, data, respose);
};

async function api_post(url, data, response) {
  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('_token'),
      },
    });
    response(res.data);
    // console.log(sessionStorage.getItem("_token"));
  } catch (error) {
    console.log(error);
  }
}

const getDataDesa = async (respose) => {
  const gets = await axios
    .get(`${url_api_server}wizard/getDataDesa`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('_token'),
      },
    })
    .catch((err) => {
      response(err.respose);
    });
  if (gets) {
    response(gets);
  }
};

async function api_get(url, response) {
  const gets = await axios
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('_token'),
      },
    })
    .catch((err) => {
      response(err.respose);
    });
  if (gets.status != undefined) {
    response(gets);
  }
}

export {
  getPenduduk,
  getPendudukByDesa,
  getpapper,
  getSearchPenduduk,
  getDataPerangkat,
  getKopSurat,
  postWizard,
  getDataDesa,
};
