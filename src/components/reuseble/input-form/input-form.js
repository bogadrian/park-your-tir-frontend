import React, { useReducer, useEffect } from 'react';
import { validate } from '../../../utils/validators';

import './input-form.scss';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const FormInput = ({ label, ...otherProps }) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = otherProps;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: otherProps.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  };

  const cond1 = `${inputState.value.length > 0 ? 'shrink' : ''}`;
  const cond2 = `${
    !inputState.isValid && inputState.isTouched ? 'danger' : ''
  } `;
  const cond3 = 'form-input-label';
  const cond4 = 'form-input';
  const classesInput = [cond4, cond2].join(' ');

  const element =
    otherProps.element === 'input' ? (
      <input
        className={classesInput}
        id={otherProps.id}
        onChange={handleChange}
        onBlur={touchHandler}
        value={inputState.value}
        type={otherProps.id}
      />
    ) : (
      <textarea
        className={classesInput}
        id={otherProps.id}
        onChange={handleChange}
        onBlur={touchHandler}
        value={inputState.value}
        type={otherProps.id}
        rows={otherProps.rows || 3}
      />
    );

  const classes = [cond1, cond2, cond3].join(' ');

  return (
    <div className="group">
      {element}
      {!inputState.isValid ? (
        <p className={cond2}>{otherProps.texterror}</p>
      ) : null}

      {label ? <label className={classes}>{label}</label> : null}
    </div>
  );
};
export default FormInput;
