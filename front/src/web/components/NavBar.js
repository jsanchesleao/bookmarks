import React from 'react'

export default ({logout}) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">Bookmarks</a>
      </div>
      {logout && (
      <ul className="nav navbar-nav navbar-right">
        <li className="active"><a href="/logout">Sign Out</a></li>
      </ul>
      )}
    </div>
  </nav>
)
