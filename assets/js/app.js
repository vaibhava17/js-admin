const env = {
   apiUrl: 'https://newkhel.in',
  // apiUrl: 'http://localhost/apps/js-game',
  //  apiUrl: 'http://localhost/game',
}
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
  const inputValue = searchInput.value;
  alert(inputValue);
});

// let session = localStorage.getItem('session');

let tableData = document.getElementById('withdraw-history')

tableData.innerHTML = `spinner`

async function withdraw() {
  let list = []
  await axios({
    method: 'post',
    url: `${env.apiUrl}/withdrawal_fetch_admin.php`
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
               <td><div class="dropdown">
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
                     <i class="fas fa-plus-circle"></i> paid</a>
                   
                 </li>
                 <li>
                   <a class="dropdown-item" onclick="updateWithdrawalStatusCancelled(${item.withdrawid})" href="#">
                     <i class="fas fa-minus-circle"></i> cancel</a>
                   
                 </li>
                 
               </ul>
             </div></td>
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




async function updateWithdrawalStatusPaid(withdrawid)
{
 
  await axios({
    method: 'put',
    url: `${env.apiUrl}/updatewithdrawstatus.php?withdrawid=${withdrawid}&withdrawstatus=paid`,
    data: {
      // withdrawid: "withdrawid",
      // withdrawstatus: "paid"
    }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });

}

async function updateWithdrawalStatusCancelled(withdrawid)
{
 
  var cancelled = "cancelled";


  await axios({
    method: 'put',
    url: `${env.apiUrl}/updatewithdrawstatus.php?withdrawid=${withdrawid}&withdrawstatus=cancelled`,
    // data: {
    //   withdrawid: withdrawid,
    //   withdrawstatus: "cancelled"
    // }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });

}



async function updateWithdrawalStatusCancelled(withdrawid)
{
 



  await axios({
    method: 'put',
    url: `${env.apiUrl}/updatewithdrawstatus.php?withdrawid=${withdrawid}&withdrawstatus=cancelled`,
    // data: {
    //   withdrawid: withdrawid,
    //   withdrawstatus: "cancelled"
    // }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });

}

async function addBalance(e) {
  e.preventDefault();
	let mobile = document.getElementById('mobile').value
	let balance = document.getElementById('balance').value
  await axios({
    method: 'put',
    url: `${env.apiUrl}/addbalance.php`,
    data: {
      mobile: mobile,
      balance: balance
    }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });
}

async function deductBalance(e) {
  e.preventDefault();
	let mobile = document.getElementById('dmob').value
	let balance = document.getElementById('dbalance').value
  await axios({
    method: 'put',
    url: `${env.apiUrl}/deductbalance.php`,
    data: {
      mobile: mobile,
      balance: balance
    }
  }).then((res) => {
    if (res.data.success == 1) {
      alert(res.data.message);
    }
  }).catch((err) => {
    alert("Something went wrong!")
  });
}