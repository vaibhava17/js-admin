let withdrawBtn = document.getElementById('withdraw-btn');
let userBtn = document.getElementById('user-btn');
let addBtn = document.getElementById('add-btn');

const envMain = {
  // baseUrl: 'http://localhost/apps/js-game/index.html',
  // baseUrl: 'http://localhost/game/index.html',
  baseUrl: 'https://newkhel.in/admin/main.html',
  // withdrawUrl: 'http://localhost/apps/js-admin/withdraw.html',
  // withdrawUrl: 'http://localhost/admin/withdraw.html',
  withdrawUrl: 'http://admin.newkhel.in/withdraw.html',
  // userUrl: 'http://localhost/apps/js-admin/user.html',
  // userUrl: 'http://localhost/admin/user.html',
  userUrl: 'http://admin.newkhel.in/user.html',
  // addUrl: 'http://localhost/apps/js-admin/balance.html',
  // addUrl: 'http://localhost/admin/balance.html',
  addUrl: 'http://admin.newkhel.in/balance.html',
    // profileurl: 'http://localhost/apps/js-admin/balance.html',
 //  profileurl: 'http://localhost/js-admin',
  profileurl: 'http://admin.newkhel.in',
}

withdrawBtn.addEventListener('click', () => {
  console.log(envMain.withdrawUrl);
  window.location.href = envMain.withdrawUrl;
})

userBtn.addEventListener('click', () => {
  window.location.href = envMain.userUrl;
})

addBtn.addEventListener('click', () => {
  window.location.href = envMain.addUrl;
})

function checkRole() {
  if (role !== "admin") {
    window.location.href = envMain.baseUrl;
  }
}
checkRole();
function gotoprofile(e){
e.preventDefault()
let id=document.getElementById("userid").value
window.location.href =`${envMain.profileurl}/profile.html?id=${id}`;
}