import React from 'react'
import PropTypes from 'prop-types'

import FullModal from './FullModal'
import withI18n from './withI18n'

import '../styles/components/Share.pcss'

const Share = ({_self, translate}) => (
  <FullModal className="Share" closeLink={_self}>
    <h2>{translate('share.shareResource')}</h2>
    <div className="shareContent">
      <span className="title">{translate('share.permalink')}</span>
      <div className="content">{_self}</div>
    </div>
    <div className="shareIcons">
      <a target="_blank" rel="noopener" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(_self)}`}>
        <i className="fa fa-twitter" />
      </a>
      <a target="_blank" rel="noopener" href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(_self)}`}>
        <i className="fa fa-facebook" />
      </a>
      <a target="_blank" rel="noopener" href={`https://reddit.com/submit?url=${encodeURIComponent(_self)}`}>
        <i className="fa fa-reddit-alien" />
      </a>
      <a target="_blank" href={`mailto:?subject=&body=${encodeURIComponent(_self)}`}>
        <i className="fa fa-envelope" />
      </a>
    </div>
  </FullModal>
)

Share.propTypes = {
  _self: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired
}

export default withI18n(Share)
