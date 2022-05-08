import React from 'react'

function Pagination(props) {
  let pageNumber = props.pageNumber;
  let goAhead = props.goAhead;
  let goBehind = props.goBehind;
  return (
    <div className='w-full flex justify-center mb-8'>
      <button className='p-1 md:p-2 rounded-l-xl border md:border-2 border-indigo-500 md:border-r-0 text-indigo-500 hover:bg-indigo-500 hover:text-white' onClick={goBehind}>{"<<"}Back</button>
      <button className='py-1 md:py-2 px-2 md:px-4 border md:border-2 border-indigo-500 bg-indigo-500 text-white'>{pageNumber}</button>
      <button className='p-1 md:p-2 rounded-r-xl border md:border-2 border-indigo-500 md:border-l-0 text-indigo-500 hover:bg-indigo-500 hover:text-white' onClick={goAhead}>Next{">>"}</button>
    </div>
  )
}

export default Pagination