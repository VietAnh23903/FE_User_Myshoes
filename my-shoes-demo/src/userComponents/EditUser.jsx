//import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';


const Edit= () => {


  //const navi = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Thông tin tài khoản</h2>


            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Họ và tên
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Beautiful Apartment In Miami'
                required
       
        
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Số điện thoại
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
             
                required
           
              />
            </div>

 

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Email:
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
             
                required
           
              />
            </div>


            <div className='mb-4'>
              <label
                htmlFor='company'
                className='block text-gray-700 font-bold mb-2'
              >
                Mật khẩu
              </label>
              <input
                type='text'
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3'
             
   
        
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='company_description'
                className='block text-gray-700 font-bold mb-2'
              >
                Nhập lại mật khẩu
              </label>
              <input
                type='text'
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3'
             
   
        
              />
            </div>


            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
               Sửa thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Edit;
