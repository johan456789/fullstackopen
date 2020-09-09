import React from 'react';


const Filter = ({filter, changeHandler}) => {
  return (
    <div>
      Filter: <input
        value={filter} onChange={changeHandler}
      />
    </div>
  )
}

export default Filter