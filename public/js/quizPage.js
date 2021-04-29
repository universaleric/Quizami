const quiztakerhandler = function (event) {
  event.preventDefault();

  const id = parseInt(
    document.location.pathname.split('/')[
      document.location.pathname.split('/').length - 1
    ]
  );

  document.location.replace(`/quiztaker/${id}`);
};

document
  .querySelector('#quiztaker')
  .addEventListener('click', quiztakerhandler);
