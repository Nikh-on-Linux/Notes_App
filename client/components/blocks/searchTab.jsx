import React from 'react'
import InputC from '../ui/inputCustom'
import { SearchIcon } from 'lucide-react'

function SearchTab() {
  return (
    <div className='w-fit h-fit mx-auto' >
      <InputC startContent={
        <SearchIcon size={22} className='text-background' />
      } placeholder={"Search"} clearable={true} ></InputC>
    </div>
  )
}

export default SearchTab