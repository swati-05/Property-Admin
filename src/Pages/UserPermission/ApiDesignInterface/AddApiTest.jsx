import React from 'react'

function AddApiTest() {
  return (
    <div>
          <Form>
                        <div className=''>
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <h1 className='w-full text-center text-xl text-slate-500 font-bold pb-4'>API NEW API<br /> </h1>
                                

                                <div class="w-1/2 md:w-1/2 px-3 mb-2 md:mb-2">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Category
                                    </label>



                                    <Field as="select"
                                        class="block  w-full text-sm  border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                                        id="grid-state"
                                        name="category"
                                        value={values.category}
                                    >

                                        <option value="">Select Categroy</option>
                                        <option value="TRADE">TRADE</option>
                                        <option value="PROPERTY">PROPERTY</option>
                                        <option value="WATER">WATER</option>
                                    </Field>
                                    {errors.category && touched.category ? (
                                        <div className='text-red-600 text-sm'>{errors.category}</div>
                                    ) : null}
                                </div>

                                <div class="w-1/2 md:w-1/2 px-3 mb-2 md:mb-2">
                                    <label for="exampleNumber0" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Revision No
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={values.revision_no}
                                        name="revision_no"
                                        type="number"
                                        class=" form-control block w-full px-3 py-1  text-sm  text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleNumber0"
                                        placeholder="e.g: 1,2 or 3 etc."
                                        min="0"
                                    />
                                    {errors.revision_no && touched.revision_no ? (
                                        <div className='text-red-600 text-sm'>{errors.revision_no}</div>
                                    ) : null}
                                </div>

                                <div class="w-full md:w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        Api URLs
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.api_url}
                                        class=" block w-full  text-sm text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="api_url"
                                        name="api_url"
                                        type="text"
                                        placeholder="https://example.com/data?key=API_KEY" />
                                    {errors.api_url && touched.api_url ? (
                                        <div className='text-red-600 text-sm'>{errors.api_url}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Preconditions
                                    </label>
                                    <input
                                        name='pre_conditions'
                                        value={values.pre_conditions}
                                        onChange={handleChange}
                                        class="block w-full  text-sm text-gray-700 border border-gray-200 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-password"
                                        type="text"
                                        placeholder="e.g: Authenticated Users Only" />
                                    {errors.pre_conditions && touched.pre_conditions ? (
                                        <div className='text-red-600 text-sm'>{errors.pre_conditions}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full md:w-2/2 px-3 mb-2 md:mb-2">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Expected Payload
                                    </label>
                                    <Field as="textarea"
                                        name='expected_payload'
                                        onChange={handleChange}
                                        value={values.expected_payload}
                                        rows="4"
                                        class=" block w-full text-sm  text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city"
                                        type="text"
                                        placeholder='{ from_date:"2022-06-01", to_date:"2022-07-01" }' />

                                    {errors.expected_payload && touched.expected_payload ? (
                                        <div className='text-red-600 text-sm'>{errors.expected_payload}</div>
                                    ) : null}
                                </div>
                                <div class="w-full md:w-3/3 px-3 mb-2 md:mb-2">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                        <br />
                                        Remarks
                                    </label>
                                    <Field
                                        as="textarea"
                                        onChange={handleChange}
                                        name="remarks"
                                        rows="4"
                                        class="appearance-none text-sm block w-full  text-gray-700 border  rounded  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-zip"
                                        value={values.remarks}
                                        placeholder="e.g : v1 is stable. v2 is expected soon" />

                                    {errors.remarks && touched.remarks ? (
                                        <div className='text-red-600 text-sm'>{errors.remarks}</div>
                                    ) : null}
                                </div>

                                <div class="w-1/2 md:w-1/2 px-3 mb-2 md:mb-2">
                                    <label for="exampleNumber0" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Created By
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={values.created_by}
                                        name="created_by"
                                        type="text"
                                        class=" form-control text-sm block w-full px-3 py-1  font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleNumber0"
                                        placeholder="e.g: Anshu Verma"
                                        min="0"
                                    />
                                    {errors.created_by && touched.created_by ? (
                                        <div className='text-red-600 text-sm'>{errors.created_by}</div>
                                    ) : null}
                                </div>

                                <div class="w-1/2 md:w-1/2 px-3 mb-2 md:mb-2">

                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                        Response Format
                                    </label>
                                    <Field as="select"
                                        name="response_format"
                                        class="block text-sm appearance-none w-full  border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-state"
                                        value={values.response_format}
                                    >

                                        <option value="">Response Format</option>
                                        <option value="JSON">JSON</option>
                                    </Field>
                                    {errors.response_format && touched.response_format ? (
                                        <div className='text-red-600 text-sm'>{errors.response_format}</div>
                                    ) : null}
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>

                                </div>
                                <div class="form-check inline-block ">
                                    <input
                                        name="status"
                                        onChange={handleChange}
                                        class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        type="checkbox"
                                        value="0"
                                        id="flexCheckDefault" />
                                    <label class="form-check-label inline-block text-sm text-gray-800" for="flexCheckDefault">
                                        Discontinue This Resource
                                    </label>
                                </div>
                                <div class=" block w-full m-2  text-center"
                                >
                                    <button type="submit"
                                        className='w-36 float-right font-bold text-sm 
                                        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                                         p-2 rounded' name='submit' disabled={isSubmitting}  >
                                        Submit
                                    </button>


                                </div>
                            </div>
                        </div>
                    </Form>
    </div>
  )
}

export default AddApiTest