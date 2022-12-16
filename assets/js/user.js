let role = localStorage.getItem('role');
let session = localStorage.getItem('session');
let token = localStorage.getItem('token');

const env = {
  apiUrl: 'https://newkhel.in',
  // apiUrl: 'http://localhost/game',
  // apiUrl: 'http://localhost/apps/js-game',
  baseUrl: 'https://newkhel.in/admin/user.html',
   // baseUrl: 'http://localhost/game/index.html',
  // baseUrl: 'http://localhost/apps/js-game/index.html',
  adminBaseUrl: 'https://newkhel.in/admin/user.html',
 // adminBaseUrl: 'http://localhost/game/user.html',
 // adminBaseUrl: 'http://localhost/apps/js-admin/user.html'
}

// function checkRole() {
//   if (role !== 'admin') {
//     window.location.href = env.baseUrl;
//   }

// }

// checkRole();

function createUrl(url, params) {
  const myUrlWithParams = new URL(url);
  Object.keys(params).forEach(key => myUrlWithParams.searchParams.append(key, params[key]))
  return myUrlWithParams.href;
}

// User list
let table = document.getElementById('users')
table.innerHTML = `spinner`

async function users(args) {
  let params = {
    ...args
  }
  // let url = createUrl(`${env.apiUrl}/getuserslist.php`, params);
  let url = env.apiUrl/getuserslist.php;
  let list = [];
  await axios({
    method: 'get',
    url: url,
    headers: {
      Authorization: "Bearer " + token
    }
  }).then((res) => {
    if (res.data.success == 1) {
      list = res.data.list;
      if (list.length > 0) {
        table.innerHTML = list.map((item) => {
          return (
            `
              <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.mobile}</td>
                <td>${item.balance}</td>
                <td>${item.role}</td>
                <td class="${item.active == '1' ? 'bg-warning text-white' : 'bg-light'}">${item.active == "1" ? "Deactive" : "Active"}</td>
                <td>${item.exposer}</td>
                <td>
                  <div class="dropdown">
                    <a
                      class="dropdown-toggle hidden-arrow"
                      type="button"
                      id="dropdownMenuicon"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v fa-lg text-dark"></i>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuicon">
                      <li>
                        <button class="dropdown-item ${item.active == "0" ? 'text-info' : 'text-danger'}" onclick="activeUser(${item.mobile})">
                          <i class="fas fa-${item.active == "0" ? 'check-circle' : 'ban'}"></i> ${item.active == "1" ? "Deactivate" : "Activate"}
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            `
          )
        })
      } else {
        table.innerHTML = "No data found!!"
      }
    }
  }).catch((err) => {
    table.innerHTML = "Something went wrong!"
  });
}

users();

// active user
async function activeUser(mobile) {
  await axios({
    method: 'put',
    url: `${env.apiUrl}/user_active_admin.php?mobile=${mobile}`,
    headers: {
      authrization: "Bearer " + token
    }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
      users();
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });
}
