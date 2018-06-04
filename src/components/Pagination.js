import React from 'react'

export default props => (
  <ul className="pagination justify-content-center">
    <li className={props.previous ? "page-item" : "disabled page-item"} onClick={props.getPrevious}>
      <span className="page-link">&laquo; Previous</span>
    </li>
    <li className="page-item disabled">
      <span className="page-link">{props.from} to {props.to} of {props.count}</span>
    </li>
    <li className={props.next ? "page-item" : "disabled page-item"} onClick={props.getNext}>
      <span className="page-link">Next &raquo;</span>
    </li>
  </ul>
)
