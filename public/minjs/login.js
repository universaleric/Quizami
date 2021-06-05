const loginFormHandler = async (a) => {
    a.preventDefault();
    const b = document.querySelector('#email-login').value.trim(),
      c = document.querySelector('#password-login').value.trim();
    if (b && c) {
      const a = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: b, password: c }),
        headers: { 'Content-Type': 'application/json' },
      });
      a.ok ? document.location.replace('/profile') : alert(a.statusText);
    }
  },
  signupFormHandler = async (a) => {
    a.preventDefault();
    const b = document.querySelector('#first-name-signup').value.trim(),
      c = document.querySelector('#last-name-signup').value.trim(),
      d = document.querySelector('#email-signup').value.trim(),
      e = document.querySelector('#username-signup').value.trim(),
      f = document.querySelector('#password-signup').value.trim();
    if (b && c && e && d && f) {
      const a = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          first_name: b,
          last_name: c,
          email: d,
          username: e,
          password: f,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      a.ok ? document.location.replace('/profile') : alert(a.statusText);
    }
  };
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler),
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
