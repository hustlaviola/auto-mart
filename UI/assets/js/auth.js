const spin = document.querySelector('.spin');
const errorMessage = document.querySelector('.error');

const authenticateUser = (userInfo, endpoint) => {
  const url = `https://automobilemart.herokuapp.com/api/v1/auth/${endpoint}`;
  spin.style.display = 'flex';
  errorMessage.textContent = '';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        spin.style.display = 'none';
        const { token } = data.data;
        const isAdmin = data.data.is_admin;
        localStorage.setItem('token', token);
        if (isAdmin) {
          window.location.href = window.location.href.includes('index')
            ? './login.html' : './admin.html';
        } else {
          window.location.href = window.location.href.includes('index')
            ? './login.html' : './home.html';
        }
      } else {
        spin.style.display = 'none';
        errorMessage.textContent = data.error;
      }
    })
    .catch(error => {
      throw error;
    });
};

document.querySelector('.auth-form').addEventListener('submit', event => {
  event.preventDefault();

  let endpoint = 'login';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userDetails = {
    email, password,
  };

  if (window.location.href.includes('index')) {
    endpoint = 'signup';

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    const address = document.getElementById('address').value;

    if (password !== confirmpassword) {
      errorMessage.textContent = 'password does not match';
      return;
    }
    Object.assign(userDetails, {
      firstname, lastname, address,
    });
  }

  authenticateUser(userDetails, endpoint);
});
