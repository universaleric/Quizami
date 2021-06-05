const quiztakerhandler = function (a) {
  a.preventDefault();
  const b = parseInt(
    document.location.pathname.split('/')[
      document.location.pathname.split('/').length - 1
    ]
  );
  document.location.replace(`/quiztaker/${b}`);
};
document
  .querySelector('#quiztaker')
  .addEventListener('click', quiztakerhandler);
const newCommentHandler = async (a) => {
    a.preventDefault(), console.log('comment button pushed');
    const b = document.querySelector('#comment-desc').value.trim(),
      c = parseInt(
        document.location.pathname.split('/')[
          document.location.pathname.split('/').length - 1
        ]
      );
    if (b && c) {
      const a = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ description: b, quiz_id: c }),
        headers: { 'Content-Type': 'application/json' },
      });
      a.ok
        ? document.location.replace(`/quiz/${c}`)
        : alert('Failed to create comment');
    }
  },
  delCommHandler = async (a) => {
    if (a.target.hasAttribute('data-id')) {
      const b = a.target.getAttribute('data-id'),
        c = parseInt(
          document.location.pathname.split('/')[
            document.location.pathname.split('/').length - 1
          ]
        ),
        d = await fetch(`/api/comments/${b}`, { method: 'DELETE' });
      d.ok
        ? document.location.replace(`/quiz/${c}`)
        : alert(
            'Failed to delete comment! \nRemember you can only delete comments you authored.'
          );
    }
  };
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler),
  document
    .querySelector('.comment-list')
    .addEventListener('click', delCommHandler);
