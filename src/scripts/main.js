import 'regenerator-runtime/runtime';
import User from './classes/User.js';
import RequestController from './utils/fetchClient.js';
import * as notification from './utils/notification.js';

const userList = document.querySelector('tbody');
const onAdd = document.querySelector('.form__button');
const chooseOne = document.querySelector('.form__select');
const refresh = document.querySelector('.form__refresh');
const request = new RequestController();

function createList(data) {
  data.map(user => {
    userList.insertAdjacentHTML(('afterBegin'), `
      <tr class="table-data">
        <td>${user.name}</td>
        <td>${user.phone}</td>
        <td>${user.email}</td>
      </tr>
    `);
  });
};

refresh.addEventListener('click', (e) => {
  e.preventDefault();

  clearTable();
  request.getAllUsers(createList);
});

onAdd.addEventListener('click', (e) => {
  e.preventDefault();

  const form = document.forms[0];
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const phone = form.elements.phone.value.trim() || null;
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  if (!name || !email) {
    notification.notificationWarning('name and an email should be filled');

    return;
  }

  if (!emailRegex.test(email)) {
    notification.notificationWarning('fill with a correct email address');

    return;
  }

  const createdUser = new User(name, email, phone);

  form.reset();
  request.createUser(createdUser, createList);
  request.getAllUsers(createList);
  notification.notificationOk('you have added the person to the list');
});

function createSelectList(data) {
  data.map(user => {
    chooseOne.insertAdjacentHTML(('beforeend'), `
      <option value=${user.id}>${user.name}</option>
    `);
  });
};

chooseOne.addEventListener('change', (e) => {
  clearTable();
  request.getOneUser(e.target.value, createList);
});

function clearTable() {
  const usersCollection = document.querySelectorAll('.table-data');

  usersCollection.forEach(user => user.remove());
};

request.getAllUsers(createList);
request.getAllUsers(createSelectList);
