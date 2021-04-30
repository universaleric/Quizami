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




const newCommentHandler = async (event) => {
  event.preventDefault();
  
  console.log("comment button pushed");
  const description = document.querySelector("#comment-desc").value.trim();
  const quiz_id = parseInt(document.location.pathname.split('/')[document.location.pathname.split('/').length-1])
  
  if (description && quiz_id) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ description, quiz_id}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace(`/quiz/${quiz_id}`);
    } else {
      alert("Failed to create comment");
    }
  }
};
  
const delCommHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const cid = event.target.getAttribute("data-id");
    const quiz_id = parseInt(document.location.pathname.split('/')[document.location.pathname.split('/').length-1])
  
    const response = await fetch(`/api/comments/${cid}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.replace(`/quiz/${quiz_id}`);
    } else {
      alert("Failed to delete comment! \nRemember you can only delete comments you authored.");
    }
  }
};

document
.querySelector(".new-comment-form")
.addEventListener("submit", newCommentHandler);
    
document
.querySelector(".comment-list")
.addEventListener("click", delCommHandler);  
  
  
  
// const updateFormHandler = async (event) => {
//   event.preventDefault();
  
//   let updateForm = document.querySelector('.updateform')
//   let updater = document.querySelector('.updater')
//   const name = document.querySelector('#update-name').value.trim();
//   const question_length = document.querySelector('#update-desc').value.trim();
//   const id = parseInt(document.location.pathname.split('/')[document.location.pathname.split('/').length-1])
  
  
//   if (name && description) {
//     const response = await fetch(`/api/quiz/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ name, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
  
//     if (response.ok) {
//       document.location.replace('/quiz');
//     } else {
//       alert('Failed to update project');
//     }
//   }
//   updateForm.classList.add('display-none')
//   updater.classList.remove('display-none')
// };
  
// const renderUpdateForm = async (event) => {
//   event.preventDefault();
//   let updateForm = document.querySelector('.updateform')
//   let updater = document.querySelector('.updater')
//   updateForm.classList.remove('display-none')
//   updater.classList.add('display-none')
  
// }
  
    
// document
// .querySelector(".update-project-form")
// .addEventListener("submit", updateFormHandler);

// document
// .querySelector(".updater")
// .addEventListener("click", renderUpdateForm);
  