import { useState } from 'react'
import './App.css'
import {
  useDeleteProductsMutation,
  useGetAllProductsQuery,
  useAddProductsMutation,
  useUpdateProductsMutation, 
} from './Store'
import { Button, Input } from 'antd'

function App() {
  const { data = [] } = useGetAllProductsQuery()
  const [deleteProducts] = useDeleteProductsMutation()
  const [addProducts] = useAddProductsMutation()
  const [updateProducts] = useUpdateProductsMutation() 
  const [addValue, setAddValue] = useState("")
  const [editId, setEditId] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (editId !== null) {
      updateProducts({ id: editId, data: { name: addValue } }) 
    } else {
      addProducts({ name: addValue }) 
    }
    setAddValue("")
    setEditId(null)
  }

  function handleEdit(item) {
    setEditId(item.id)
    setAddValue(item.name)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-[500px] mt-10  flex items-center gap-2"
      >
        <Input
          onChange={(e) => setAddValue(e.target.value)}
          value={addValue}
          size="large"
          allowClear
          type="text"
          placeholder={editId !== null ? "Update your product" : "Add your product"}
        />
        <Button
          size="large"
          className="!bg-green-600 font-bold"
          type="primary"
          htmlType="submit"
        >
          {editId !== null ? "Update" : "Add"}
        </Button>
      </form>

      <ul className="mt-10 w-[500px] mx-auto space-y-4">
        {data.map((item, index) => (
          <li
            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-400 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            key={index}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center">
                {index + 1}
              </span>
              <strong className="text-xl">{item.name}</strong>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => handleEdit(item)}
                htmlType="button"
                type="primary"
                className="bg-orange-500 hover:bg-yellow-600 transition-colors duration-300"
              >
                Update
              </Button>
              <Button
                onClick={() => deleteProducts(item.id)}
                htmlType="button"
                className="bg-red-500 transition-colors duration-300"
                type="primary"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
