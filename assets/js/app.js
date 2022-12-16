let role = localStorage.getItem('role');
let session = localStorage.getItem('session');
let token = localStorage.getItem('token');

const env = {
  apiUrl: 'https://newkhel.in',
  // apiUrl: 'http://localhost/game',
  // apiUrl: 'http://localhost/apps/js-game',
  baseUrl: 'https://newkhel.in/admin/main.html',
  // baseUrl: 'http://localhost/game/index.html',
  // baseUrl: 'http://localhost/apps/js-game/index.html',
  // adminBaseUrl: 'https://admin.newkhel.in/user.html',
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

// Withdrawal history
let tableData = document.getElementById('withdraw-history')
tableData.innerHTML = `spinner`

async function withdraw(args) {
  let params = {
    ...args
  }
  let url = createUrl(`${env.apiUrl}/withdrawal_fetch_admin.php`, params);
  let list = []
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
        tableData.innerHTML = list.map((item) => {
          return (
            `
            <tr>
              <td>${item.withdrawid}</td>
              <td>${item.userid}</td>
              <td>${item.withdrawreqtime}</td>
              <td>${item.remainingbalance}</td>
              <td>${item.withdrawamount}</td>
              <td>${item.mobile}</td>
              <td>${item.paymentmode}</td>
              <td>${item.withdrawstatus}</td>
              <td>${item.accountnumber}</td>
              <td>${item.accountname}</td>
              <td>${item.bankname}</td>
              <td>${item.ifsc}</td>
              <td>${item.accounttype}</td>
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
                      <a class="dropdown-item" onclick="updateWithdrawalStatusPaid(${item.withdrawid})" href="#">
                        <i class="fas fa-plus-circle"></i> paid
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" onclick="updateWithdrawalStatusCancelled(${item.withdrawid})" href="#">
                        <i class="fas fa-minus-circle"></i> cancel
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          `
          )
        })
      } else {
        tableData.innerHTML = "No data found!!"
      }
    }
  }).catch((err) => {
    tableData.innerHTML = "Something went wrong!"
  });
}
withdraw();

// Update withdrawal status to paid
async function updateWithdrawalStatusPaid(withdrawid) {
  await axios({
    method: 'put',
    url: `${env.apiUrl}/updatewithdrawstatus.php?withdrawid=${withdrawid}&withdrawstatus=paid`,
    headers: {
      authrization: "Bearer " + token
    }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });
}

// Update withdrawal status to cancelled
async function updateWithdrawalStatusCancelled(withdrawid) {
  await axios({
    method: 'put',
    url: `${env.apiUrl}/updatewithdrawstatus.php?withdrawid=${withdrawid}&withdrawstatus=cancelled`,
    headers: {
      authrization: "Bearer " + token
    }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });
}

// Add balance to user account


function createUrl(url, params) {
  const myUrlWithParams = new URL(url);
  Object.keys(params).forEach(key => myUrlWithParams.searchParams.append(key, params[key]))
  return myUrlWithParams.href;
}
async function addBalance(e) {
  e.preventDefault();
  let mobile = document.getElementById('mobile').value
  let balance = document.getElementById('balance').value
  await axios({
    method: 'put',
    url: ` ${env.apiUrl}/addbalance.php`,
    data: {
      mobile: mobile,
      balance: balance
    },
    headers: {
      authrization: "Bearer " + token
    }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });
}

// deduct balance to user account
async function deductBalance(e) {
  e.preventDefault();
  let mobile = document.getElementById('dmob').value
  let balance = document.getElementById('dbalance').value
  await axios({
    method: 'post',
    url: `${env.apiUrl}/deductbalance.php`,
    data: {
      mobile: mobile,
      balance: balance
    },
    headers: {
      authrization: "Bearer " + token
    }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });
}

// Filter withdrawal
let allWithdrawal = document.getElementById('withdraw-all');
let paidWithdrawal = document.getElementById('withdraw-paid');
let cancelledWithdrawal = document.getElementById('withdraw-cancelled');
let pendingWithdrawal = document.getElementById('withdraw-pending');

allWithdrawal.addEventListener('click', () => {
  tableData.innerHTML = `spinner`
  allWithdrawal.checked = true;
  paidWithdrawal.checked = false;
  cancelledWithdrawal.checked = false;
  pendingWithdrawal.checked = false;
  withdraw();
})

paidWithdrawal.addEventListener('click', () => {
  tableData.innerHTML = `spinner`
  allWithdrawal.checked = false;
  paidWithdrawal.checked = true;
  cancelledWithdrawal.checked = false;
  pendingWithdrawal.checked = false;
  withdraw({
    status: 'paid'
  });
})

cancelledWithdrawal.addEventListener('click', () => {
  tableData.innerHTML = `spinner`
  allWithdrawal.checked = false;
  paidWithdrawal.checked = false;
  cancelledWithdrawal.checked = true;
  pendingWithdrawal.checked = false;
  withdraw({
    status: 'cancelled'
  });
})

pendingWithdrawal.addEventListener('click', () => {
  tableData.innerHTML = `spinner`
  allWithdrawal.checked = false;
  paidWithdrawal.checked = false;
  cancelledWithdrawal.checked = false;
  pendingWithdrawal.checked = true;
  withdraw({
    status: 'pending'
  });
})

// Search withdrawal
let searchWithdrawal = document.getElementById('search-withdrawal');
let searchWithdrawalBtn = document.getElementById('search-withdrawal-btn');

searchWithdrawalBtn.addEventListener('click', () => {
  tableData.innerHTML = `spinner`
  withdraw({
    search: searchWithdrawal.value
  });
});