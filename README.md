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
