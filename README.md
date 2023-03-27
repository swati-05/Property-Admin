### Changes in admin modules for single login redirect

> Step 1 - App.js (Adjust these codes)
Add state variable to track menulist fetching
```
 const [menuFetchStatus, setmenuFetchStatus] = useState(false);

```

To manage auto login and auto logout (make sure to add BrowserRouter to your index.js or main.jsx page)
```
 const navigate = useNavigate()
  let token = window.localStorage.getItem('token')
  console.log("token save from login ", token);
  if (token != null) {
    console.log('===token defined............')

    props.LOGIN();
  }
  if (token == null) {
    navigate('/login/fresh')
  }

```

Create a file Named NavigatePage and give index route just above login route
```
 <Route index element={<NavigatePage />} />

```

```
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavigatePage() {
    const navigate = useNavigate()
    navigate('/home')
}

export default NavigatePage
```


Adjust your login route
```
  <Route path='/login/:tokenPassed' element={<Login menuFetchStatus={menuFetchStatus} setmenuFetchStatus={setmenuFetchStatus} />} />

```

> Step 2 - Login.js (Adjust these codes)
Add these codes just above your login jsx (we dont need jsk view)
```
  // 3 CHANGE FOR SINGLE AUTH
      const { tokenPassed } = useParams()
    const fetchMenuList = () => {
        props?.setmenuFetchStatus(true)
        let requestBody = {
            roleId: 6
        }

        console.log('api header to login...',ApiHeader())
        axios.post(api_getFreeMenuList, requestBody, ApiHeader())
            .then(function (response) {
                console.log('fetched menu list.....', response)
                // return
                if (response.data.status == true) {
                    window.localStorage.setItem('menuList', JSON.stringify(response?.data?.data))
                    // window.localStorage.setItem('userName', JSON.stringify(response?.data?.data?.userDetails?.userName))
                    // window.localStorage.setItem('roles', JSON.stringify(response?.data?.data?.userDetails?.role))

                    setmenuList(response?.data?.data)
                    // setuserName(response?.data?.data?.userDetails?.userName)
                    // setroles(response?.data?.data?.userDetails?.role)

                } else {
                    console.log('false...')
                    setLoaderStatus(false)
                    // seterrorMsg(response.data.message)
                    notify(response.data.message, 'error') //toast message if wrong credentails
                }
                props?.setmenuFetchStatus(false)
            })
            .catch(function (error) {
                setLoaderStatus(false)
                seterroState(true)
                console.log('--2--login error...', error)
                props?.setmenuFetchStatus(false)
                notify('Something went wrongg!! ', 'error') //catching the error
            })


    }

    // 2 CHANGE FOR SINGLE AUTH
    const setAuthState = () => {
        if (tokenPassed == 'fresh') {
            // PRODUCTION CASE WHEN ALL MODULES ARE HOSTED AT SINGLE PORT
            // navigate(`/admin-login`)

            // DEVELOPMENT CASE ONLY FOR DEVELOPMENT
            window.location.href = "http://127.0.0.1:5173/admin-login"
            return
        }

        console.log('token not defined......')
        window.localStorage.setItem('token', tokenPassed)
        fetchMenuList()
        navigate(`/state-dashboard`)
    }

    // 1 CHANGE FOR SINGLE AUTH
    useEffect(() => {

        console.log('routes... parama via naviate.', tokenPassed)
        setAuthState()
    }, [])

    return

```


> Step 3 - Header.js (Adjust these codes)
Add module selectbox to the view
```
   <form className="hidden sm:inline-block md:inline-block mx-5 ml-20">
              <div className="flex flex-wrap items-stretch w-full relative">
                <select onChange={(e) => setmodule(e.target.value)} className="font-semibold flex-shrink flex-grow max-w-full leading-5 relative text-sm py-2 px-4 ltr:rounded-l rtl:rounded-r text-gray-800 bg-gray-100 overflow-x-auto focus:outline-none border border-gray-100 focus:border-gray-200 focus:ring-0 darks:text-gray-400 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600 cursor-pointer" placeholder="Search…" aria-label="Search" >
                  <option value="property">Property</option>
                  <option value="water">Water</option>
                  <option value="trade">Trade</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="dashboard">Dashboard</option>
                </select>
                <div className="flex -mr-px">
                  <button onClick={() => navigateModule()} className="flex items-center py-2 px-4 ltr:-ml-1 rtl:-mr-1 ltr:rounded-r rtl:rounded-l leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0" type="button">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg> */}
                    <TiArrowRightThick className='text-white inline' />
                  </button>
                </div>
              </div>
            </form>

```

Adjust the logout function
```
  const logOutUser = () => {
    closeModal()
    window.localStorage.removeItem('menuList')
    window.localStorage.removeItem('userName')
    window.localStorage.removeItem('roles')
    window.localStorage.removeItem('token')
    props.LOGOUT()
   // PRODUCTION CASE WHEN ALL MODULES ARE HOSTED AT SINGLE PORT
    // navigate(`/admin-login`)

    // DEVELOPMENT CASE ONLY FOR DEVELOPMENT
    window.location.href = "http://127.0.0.1:5173/admin-login"
  }

```

create navigateModule function and add these codes
```

  const [module, setmodule] = useState('property')

  const navigateModule = () => {
    // PRODUCTION CASE WHEN ALL MODULES ARE HOSTED AT SINGLE PORT
    // navigate(`/${module}`)

    // DEVELOPMENT CASE ONLY FOR DEVELOPMENT
    let token = window.localStorage.getItem('token')
    if (module == 'property') {
      window.location.href = `http://localhost:3000/property/login/${token}`
    }
    if (module == 'dashboard') {
      window.location.href = `http://localhost:5174/dashboard/login/${token}`
    }
  }

```
