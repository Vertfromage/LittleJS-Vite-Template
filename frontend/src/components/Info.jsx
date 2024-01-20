import React from 'react'

function Info() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center">
    <p className="mb-4 text-gray-700">
      This is an information component. It contains a paragraph and three useful links. You can customize the content as needed.
    </p>
    
    <div className="flex flex-col items-center space-y-2">
      <a href="#link1" className="text-blue-500 hover:text-blue-700">Link 1</a>
      <a href="#link2" className="text-blue-500 hover:text-blue-700">Link 2</a>
      <a href="#link3" className="text-blue-500 hover:text-blue-700">Link 3</a>
    </div>
  </div>
  )
}

export default Info