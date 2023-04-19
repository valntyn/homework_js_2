function pushNotification(posTop, posRight, title, description, type) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="notification" style="top:${posTop}px; right:${posRight}px;">
      <h2 class="title">${title}</h2>
      <p>${description}</p>
    </div>
  `
  );

  const div = document.querySelector('div');

  div.classList.add(type);

  setTimeout(() => div.remove(), 2000);
}

export function notificationOk(description) {
  pushNotification(
    650,
    10,
    'Everything is ok!',
    'Successfully!! \n ' + description,
    'success'
  );
}

export function notificationWarning(description) {
  pushNotification(
    650,
    10,
    'Something happened',
    'Warning!! \n ' + description,
    'warning'
  );
}
