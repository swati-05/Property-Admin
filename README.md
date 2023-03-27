### Changes in admin modules for single login redirect

> Step 1 - App.js (Adjust these codes)
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
