let role = localStorage.getItem('role');
let session = localStorage.getItem('session');
let token = localStorage.getItem('token');
const env = {
  apiUrl: 'https://newkhel.in',
  //apiUrl: 'http://localhost/apps/js-game',
  //apiUrl: 'http://localhost/game',
 // baseUrl: 'http://localhost/apps/js-game/index.html',
 // baseUrl: 'http://localhost/admin/index.html',
 // adminBaseUrl: 'http://localhost/apps/js-admin/user.html'
  adminBaseUrl: 'https://newkhel.in/admin/user.html',
}

async function login(e) {
  e.preventDefault();
  let mobile = document.getElementById('mobile').value
  let password = document.getElementById('password').value
  await axios({
    method: 'post',
    url: `${env.apiUrl}/login.php`,
    data: {
      mobile: mobile,
      password: password
    },
  }).then((res) => {
    if (res.data.success == 1) {
      session = res.data.mobile;
      localStorage.setItem('session', res.data.mobile);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      if (res.data.role == "admin") {
        window.location.href = env.adminBaseUrl;
      } else {
        window.location.href = env.baseUrl;
      }
    } else {
      alert(res.data.message);
    }
  });
}
