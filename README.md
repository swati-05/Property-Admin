### Changes in admin modules for single login redirect

> Step 1 - App.js (Adjust these codes)
Add state variable to track menulist fetching
```
 const [menuFetchStatus, setmenuFetchStatus] = useState(false);

```

To manage auto login and auto logout 
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
