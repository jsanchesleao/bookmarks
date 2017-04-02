import React from 'react'

export default ({displayActions, smallUrl, title, onAddBookmark, bookmarks, onEdit, onRemove}) => (
  <div className="row">
    <div className="col-md-8 col-md-offset-2 col-xs-12">
      <h1>{title}</h1>
      <div className="list-group">
        {displayActions && (
          <button className="list-group-item active" onClick={onAddBookmark}>
            Add Bookmark
          </button>
        )}
        {(bookmarks.length === 0) && (
          <p>No bookmarks registered yet</p>
        )}
        {bookmarks.map(b => (
          <div className="list-group-item" key={b.name}>
            <div className="row">
              <div className="col-md-2 col-xs-12">
                {smallUrl
                  ? (<p>{b.name}</p>)
                  : (<h4>{b.name}</h4>)}
              </div>
              <div className="col-md-6 col-xs-12">
              {smallUrl
                ? (<p><a href={b.url} target="_blank">{b.url}</a></p>)
                : (<h4><a href={b.url} target="_blank">{b.url}</a></h4>)}

              </div>
              {displayActions && (
                <div className="col-md-2 hidden-xs">
                  <button className="btn btn-primary btn-block" onClick={onEdit(b)}>Edit</button>
                </div>
              )}
              {displayActions && (
                <div className="col-md-2 hidden-xs">
                  <button className="btn btn-danger btn-block" onClick={onRemove(b)}>Remove</button>
                </div>
              )}
            </div>
            {displayActions && (
              <div className="row visible-xs-block">
                <div className="col-xs-6">
                  <button className="btn btn-primary btn-block" onClick={onEdit(b)}>Edit</button>
                </div>
                <div className="col-xs-6">
                  <button className="btn btn-danger btn-block" onClick={onRemove(b)}>Remove</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)
