import CustomError from '../classes/Error';
import fetch from 'node-fetch';

const BASE_URL = 'https://mate.academy/students-api/users';

export async function request(url, options) {
  try {
    const result = await fetch(url, options);
    const json = await result.json();

    return json;
  } catch (error) {
    if (error instanceof CustomError) {
      window.alert(`${error.name}:${error.message}`);
    } else {
      window.alert(error);
    }
  };
};

export default class RequestController {
  getAllUsers(action) {
    request(BASE_URL)
      .then(users => action(users))
      .catch(() => {
        throw new CustomError('can not get data from server');
      });
  }

  createUser(user, action) {
    request(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(user),
    })
      .then(this.getAllUsers(action))
      .catch(() => {
        throw new CustomError('can not create a user on the server');
      });
  }

  getOneUser(id, action) {
    request(`${BASE_URL}/${id}`)
      .then(users => action([users]))
      .catch(() => {
        throw new CustomError('can not get user from server');
      });
  }
};
