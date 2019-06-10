/* eslint-disable no-unused-vars */
const topModal = document.getElementById('top-modal');
const modal = document.getElementById('modal');
const modImage = document.getElementById('mod-image');
const make = document.getElementById('make');
const state = document.getElementById('state');
const status = document.getElementById('status');
const model = document.getElementById('model');
const bodyType = document.getElementById('body-type');
const price = document.getElementById('price');
const description = document.getElementById('description');
const modFlag = document.getElementById('mod-flag');
const modEdit = document.getElementById('mod-edit');
const flagBtn = document.querySelector('.flag-btn');
const delBtn = document.querySelector('.del-btn');
const modalForm = document.querySelector('.modal-form');

const resetModalContents = () => {
  if (modFlag) {
    if (!modFlag.classList.contains('hidden')) modFlag.classList.add('hidden');
  }
  if (!topModal.classList.contains('hidden')) topModal.classList.add('hidden');
  if (flagBtn) {
    if (!flagBtn.classList.contains('hidden')) flagBtn.classList.add('hidden');
  }
  if (delBtn) {
    if (!delBtn.classList.contains('hidden')) delBtn.classList.add('hidden');
  }
  if (modalForm) {
    if (!modalForm.classList.contains('hidden')) modalForm.classList.add('hidden');
  }
  if (modEdit) {
    if (!modEdit.classList.contains('hidden')) modEdit.classList.add('hidden');
  }
};

const reset = () => {
  resetModalContents();
  modImage.src = '';
  make.innerHTML = '';
  state.innerHTML = '';
  if (status) status.innerHTML = '';
  model.innerHTML = '';
  bodyType.innerHTML = '';
  price.innerHTML = '';
  description.innerHTML = '';
};

const preview = event => {
  reset();
  modal.style.display = 'flex';
  const { target } = event;
  topModal.classList.remove('hidden');
  const parentCont = target.parentNode.parentNode.id;
  modImage.src = document.querySelector(`#${parentCont} img`).src;
  make.innerHTML = document.querySelector(`#${parentCont} .make`).innerHTML;
  state.innerHTML = document.querySelector(`#${parentCont} .state`).innerHTML;
  model.innerHTML = document.querySelector(`#${parentCont} .model`).innerHTML;
  bodyType.innerHTML = document.querySelector(`#${parentCont} .body-type`).innerHTML;
  price.innerHTML = document.querySelector(`#${parentCont} .price`).innerHTML;
  description.innerHTML = document.querySelector(`#${parentCont} .describe`).innerHTML;
};

const view = event => {
  preview(event);
  flagBtn.classList.remove('hidden');
};

const review = event => {
  preview(event);
  delBtn.classList.remove('hidden');
};

const order = event => {
  reset();
  modal.style.display = 'flex';
  const { target } = event;
  topModal.classList.remove('hidden');

  const parentCont = target.parentNode.parentNode.id;
  modImage.src = document.querySelector(`#${parentCont} img`).src;
  make.innerHTML = document.querySelector(`#${parentCont} .make`).innerHTML;
  state.innerHTML = document.querySelector(`#${parentCont} .state`).innerHTML;
  model.innerHTML = document.querySelector(`#${parentCont} .model`).innerHTML;
  bodyType.innerHTML = document.querySelector(`#${parentCont} .body-type`).innerHTML;
  price.innerHTML = document.querySelector(`#${parentCont} .price`).innerHTML;
  modalForm.classList.remove('hidden');
};

const review2 = event => {
  reset();
  modal.style.display = 'flex';
  const { target } = event;
  topModal.classList.remove('hidden');
  const parentCont = target.parentNode.parentNode.id;
  modImage.src = document.querySelector(`#${parentCont} img`).src;
  make.innerHTML = document.querySelector(`#${parentCont} .make`).innerHTML;
  state.innerHTML = document.querySelector(`#${parentCont} .state`).innerHTML;
  model.innerHTML = document.querySelector(`#${parentCont} .model`).innerHTML;
  status.innerHTML = document.querySelector(`#${parentCont} .status`).innerHTML;
  bodyType.innerHTML = document.querySelector(`#${parentCont} .body-type`).innerHTML;
  price.innerHTML = document.querySelector(`#${parentCont} .price`).innerHTML;
  description.innerHTML = document.querySelector(`#${parentCont} .describe`).innerHTML;
  if (delBtn) delBtn.classList.remove('hidden');
};

const closeModal = document.getElementById('close-modal');

closeModal.onclick = () => {
  modal.style.display = 'none';
};

const flag = () => {
  topModal.classList.add('hidden');
  modFlag.classList.remove('hidden');
};

const edit = () => {
  reset();
  modal.style.display = 'flex';
  modEdit.classList.remove('hidden');
};

const openMyAds = () => {
  window.location.href = 'myAds.html';
};

const openOrders = () => {
  window.location.href = 'orders.html';
};
