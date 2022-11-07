import $ from 'jquery';
import moment from 'moment';
import { findObj } from '../function/fx';

export default builder = (code) => {
  const auto = (config, data) => {
    let source = code;
    const findQuery = $(source).find(
      `font[type='automatic_value'][name='${config.name}']`
    );
    if (findQuery.length > 0) {
      for (let i = 0; i < findQuery.length; i++) {
        const au = $($(findQuery[i])).attr('fildquery');
        if (!_.isEmptyObj(data) && !_.isEmptyObj(au)) {
          source = $(source)
            .find(
              `font[type='automatic_value'][name='${
                config.name
              }'][fildquery='${$($(findQuery[i])).attr(config.attr)}']`
            )
            .text(findVal(data, $($(findQuery[i])).attr(config.attr)))
            .css({
              'background-color': 'transparent',
              color: 'black',
            }).prevObject[0];
        }
      }
      return source != undefined && source != null
        ? source?.outerHTML ?? source
        : '';
    } else {
      return source;
    }
  };
};
