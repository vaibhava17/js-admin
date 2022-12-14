let table = document.getElementById('users')
table.innerHTML = `spinner`


async function users() {
  let list = []
  await axios({
    method: 'post',
    url: `${env.apiUrl}/user_fetch_admin.php`
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
               <td>${item.exposer}</td>
               
               <td>${item.ipaddress}</td>
               
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
        table.innerHTML = "No data found!!"
      }
    }
  }).catch((err) => {
    table.innerHTML = "Something went wrong!"
  });
}
users();
