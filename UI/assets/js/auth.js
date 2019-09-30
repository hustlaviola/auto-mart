/* eslint-disable camelcase */
const spin = document.querySelector('.spin');
const errorMessage = document.querySelector('.error');

const isIndex = window.location.href.includes('index') || window.location.pathname === '/';

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
        localStorage.setItem('token', token);
        window.location.href = isIndex
          ? './login.html' : './home.html';
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

  let endpoint = 'signin';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userDetails = {
    email, password,
  };

  if (isIndex) {
    endpoint = 'signup';

    const first_name = document.getElementById('firstname').value;
    const last_name = document.getElementById('lastname').value;
    const confirm_password = document.getElementById('confirmpassword').value;
    const address = document.getElementById('address').value;

    if (password !== confirm_password) {
      errorMessage.textContent = 'password does not match';
      return;
    }
    Object.assign(userDetails, {
      first_name, last_name, address,
    });
  }

  authenticateUser(userDetails, endpoint);
});
