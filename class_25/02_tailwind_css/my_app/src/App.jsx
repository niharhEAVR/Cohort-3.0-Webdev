import { useState } from 'react'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex justify-between'>
        <div className='bg-blue-300'>hello world!</div>
        <div className='text-blue-900 font-bold'>hi!</div>
        <div className='bg-blue-300'>hello there!</div>
      </div>

      <div className='grid grid-cols-12'>
          <div className="bg-purple-300 col-span-4">child-1</div>
          <div className="bg-red-300 col-span-6">child-2</div>
          <div className="bg-green-300 col-span-2">child-3</div>
      </div>

      <div className='md:bg-orange-300 sm:bg-yellow-300 bg-blue-300'>hi</div>

      <div className='sm:grid grid-cols-12'>
        <div className="bg-green-300 col-span-2 text-4xl rounded-2xl text-center">hi</div>
        <div className="bg-purple-300 col-span-4 rounded-2xl text-center  hover:capitalize">hello</div>
        <div className="bg-red-300 col-span-6 rounded-2xl hover:text-center">hello there</div>
      </div>
    </>
  )
}

export default App


// Read and find out more css properties from tailwind official page https://tailwindcss.com/docs

// and install a extension of tailwind-css-intellisense for better suggestions when writing taiwind css