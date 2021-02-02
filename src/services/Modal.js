import React from "react";
import ReactDom from "react-dom";
import { Button, Space } from "antd";
const MODAL_STYLES = {
  position: "fixed",
  minWidth: 800,
  maxWidth: 800,
  minHeight: 500,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  borderRadius: "0.25rem",
  boxShadow:
    "0 0.0625rem 0.1875rem rgba(0,0,0,0.12), 0 0.0625rem 0.125rem rgba(0,0,0,0.24)",
  animation: "anim-open",
  animationDuration: ".6s",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
const FOOTER = {
  position:'absolute',
  width:'90%',
    bottom:'0px',
    textAlign:'right',
    padding: '15px',
    marginRight:'30px'
}
const BUTTON_STYLE = {
  margin: '0 0.75rem',
  padding: '0.625rem 1.25rem',
  border: 'none',
  borderRadius: '0.25rem',
  boxShadow: '0 0.0625rem 0.1875rem rgba(0,0,0,0.12), 0 0.0625rem 0.125rem rgba(0,0,0,0.24)',
  transition: 'all 0.25s cubic-bezier(.25,.8,.25,1)',
  fontSize: '0.875rem',
  fontWeight: '300'
}
export default function Modal({ open, children, onClose, onConfirm }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        
        {children}
        <div style={FOOTER}>
        <button style={BUTTON_STYLE} onClick={onClose}>Close</button> <button style={BUTTON_STYLE} onClick={onConfirm}>Confirm</button>
        </div>
      </div>
      
    </>,
    document.getElementById("portal")
  );
}