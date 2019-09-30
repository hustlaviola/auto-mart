const spin = document.querySelector('.spin');
const errorMessage = document.querySelector('.error');

const postCar = carInfo => {
  console.log(carInfo);
  const url = 'https://automobilemart.herokuapp.com/api/v1/cars';
  spin.style.display = 'flex';
  errorMessage.textContent = '';
  const token = localStorage.getItem('token');
  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: carInfo,
  })
    .then(response => response.json())
    .then(data => {
      // const data = JSON.stringify(result);
      console.log(data);
      if (data.status === 'success') {
        spin.style.display = 'none';
        window.location.href = './myAds.html';
      } else {
        spin.style.display = 'none';
        errorMessage.textContent = data.error;
      }
    })
    .catch(error => {
      throw error;
    });
};

document.querySelector('.post-car-form').addEventListener('submit', event => {
  event.preventDefault();
  const manufacturer = document.getElementById('manufacturer').value;
  const model = document.getElementById('model').value;
  // eslint-disable-next-line camelcase
  const body_type = document.getElementById('body-type').value;
  const state = document.getElementById('state').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  // const image = document.getElementById('image').value;
  const image = document.querySelector('input[type="file"]').files[0];
  // console.log(file.files[0]);
  console.log(image);

  const formData = new FormData();
  formData.append('manufacturer', manufacturer);
  formData.append('model', model);
  formData.append('body_type', body_type);
  formData.append('state', state);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('image', (image));

  const obj = {
    manufacturer, model, body_type, state, price, description, image,
  };

  postCar(formData);
});
