import React from 'react'

const Login = () => {



  return <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
          <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className="h-full w-full bg-indigo-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-green-100">Login
            <span className='text-red-800'> Message</span>
            </h1>

            <form>
              <div>
                <label className='label p-2'>
                  <span className='text-base label-text'>Username</span>
                </label>
                <input type="text" placeholder="Type here" className="input" />
              </div>
              <div>

              <label className='label'>
                  <span className='text-base label-text'>Password</span>
                </label>
                <input type="password" placeholder="Enter Password" className="input" />


              </div>
              <a href="#" className='text-sm hover:underline hover:text-red-700 mt-2 inline-block'>
                {"Don't"} have an account? Register"

              </a>
              <div>
                <button className="btn">LOGIN </button>
              </div>

            </form>
           </div>
          </div>
}

export default Login
