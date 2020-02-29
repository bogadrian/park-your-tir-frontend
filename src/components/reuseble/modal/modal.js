import React from 'react';
import ReactDOM from 'react-dom';

import { CSSTransition } from 'react-transition-group';

import Backdrop from '../backdrop/backdrop';
import './modal.scss';

const ModalOverlay = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          <h2> {props.children}</h2>
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          <div className="modal-footer">
            <div>{props.footer}</div>
            <div>
              {props.secondButton ? <div>{props.secondButton}</div> : null}
            </div>
          </div>
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
