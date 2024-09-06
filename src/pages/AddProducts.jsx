import { Input } from 'antd'
import React from 'react'

function AddProducts() {
  return (
    <div>
      <form>
        <Input placeholder='Add your  phone name'/>
        <Input placeholder='Add your  phone model'/>
        <Input placeholder='Add your  phone price'/>
      </form>
    </div>
  )
}

export default AddProducts
