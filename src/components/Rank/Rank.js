import React from 'react';
import PropTypes from 'prop-types';

const Rank = ({name, entries}) => {
  return (
    <div>
      <div className="white f3">
        {`${name}, you current entry count is...`}
      </div>
      <div className="white f1">
        {entries}
      </div>
    </div>
  )
}

Rank.propTypes = {
  name: PropTypes.string,
  entries: PropTypes.string,
}

export default Rank;
