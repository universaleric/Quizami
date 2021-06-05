const newFormHandler = async (a) => {
    a.preventDefault();
    const b = document.querySelector('#project-name').value.trim(),
      c = document.querySelector('#project-funding').value.trim();
    if (
      (console.log(b, c),
      console.log(JSON.stringify({ quiz_name: b, question_length: c })),
      b && c)
    ) {
      const a = await fetch(`/api/quiz`, {
        method: 'POST',
        body: JSON.stringify({ quiz_name: b, question_length: c }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (a.ok) {
        const b = await a.json();
        document.location.replace(`/quizmaker/${b.id}`);
      } else alert('Failed to create project');
    }
  },
  delButtonHandler = async (a) => {
    if (a.target.hasAttribute('data-id')) {
      const b = a.target.getAttribute('data-id'),
        c = await fetch(`/api/quiz/${b}`, { method: 'DELETE' });
      c.ok
        ? document.location.replace('/profile')
        : alert('Failed to delete project');
    }
  };
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler),
  document
    .querySelector('.quiz-list')
    .addEventListener('click', delButtonHandler);
