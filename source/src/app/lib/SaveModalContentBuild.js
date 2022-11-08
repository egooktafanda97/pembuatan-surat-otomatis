import React, { useEffect, useState, useRef } from 'react';

export function InputType({ type, attr, onChange }) {
  switch (type) {
    case 'input':
      return <input {...attr} onChange={onChange} defaultValue={attr?.value} />;
      break;
    case 'text-area':
      return (
        <textarea {...attr} onChange={onChange}>
          {attr?.value}
        </textarea>
      );
      break;
    default:
      return <input onChange={onChange} readOnly />;
      break;
  }
}

export default function SaveModalContentBuild(props) {
  const { initData, CardConfig, style, result } = props;
  const [res, setResult] = useState([]);
  const [phase, setPhaase] = useState('');
  function exists(arr, args) {
    return arr.some(function (el) {
      return el.name === args.name;
    });
  }
  useEffect(() => {
    const storagePhase = sessionStorage.getItem('phase');
    if (storagePhase == 'edit') {
      const getAttrBuilder = localStorage.getItem('config');
      if (getAttrBuilder != undefined && getAttrBuilder.length > 0) {
        setResult(JSON.parse(getAttrBuilder ?? '[]')?.ATTRIBUTE_SAVE ?? []);
      }
    }
    setPhaase(storagePhase);
  }, []);
  const hndelValueResult = (e) => {
    const copyRes = [...res];
    const result = {
      name: e.target.name,
      value: e.target.value,
    };
    if (exists(copyRes, result)) {
      let newArr = copyRes.map((item, i) => {
        if (item.name == result.name) {
          return result;
        } else {
          return item;
        }
      });
      setResult(newArr);
    } else {
      setResult([...copyRes, result]);
    }
  };

  return (
    phase != '' && (
      <div className='cards' style={style ?? {}}>
        <strong>{CardConfig?.title}</strong>
        <hr />
        {initData != undefined &&
          initData?.map((inp, inx) => {
            const asInp = { ...inp };
            if (phase == 'edit') {
              asInp.attr.value =
                res.find((o) => o.name === asInp?.attr?.name)?.value ?? '';
            }
            return (
              <div
                key={inx}
                className='from-group mb-1'
                style={{
                  width: '100%',
                }}>
                <label htmlFor='' className='labels'>
                  {inp?.label}
                </label>
                {inp?.msg != undefined && (
                  <div className={`inp-msg text-left`}>
                    <i
                      className={`${inp?.msg?.class}`}
                      style={inp?.msg?.Style ?? {}}>
                      {inp?.msg.text}
                    </i>
                  </div>
                )}
                <InputType
                  attr={inp?.attr ?? {}}
                  type={inp?.type ?? 'input'}
                  onChange={hndelValueResult}
                />
              </div>
            );
          })}
        <hr />
        <div
          className='from-group mb-1 mt-3'
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <button
            className='btn-ui btn-main-primary color-whith'
            onClick={() => {
              result(res);
            }}>
            {initData?.buttonLabel ?? 'save'}
          </button>
        </div>
      </div>
    )
  );
}
