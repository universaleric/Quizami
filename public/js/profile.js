const newFormHandler = async (event) => {
  event.preventDefault();

  const quiz_name = document.querySelector('#project-name').value.trim();
  const question_length = document
    .querySelector('#project-funding')
    .value.trim();
  // const description = document.querySelector('#project-desc').value.trim();

  console.log(quiz_name, question_length);
  console.log(JSON.stringify({ quiz_name, question_length }));

  if (quiz_name && question_length) {
    const response = await fetch(`/api/quiz`, {
      method: 'POST',
      body: JSON.stringify({ quiz_name, question_length }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const quiz = await response.json();
      document.location.replace(`/quizmaker/${quiz.id}`);
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
