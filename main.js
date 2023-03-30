const deleteButtons = document.querySelectorAll('.delete-project');

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const projectItem = button.parentNode;
    projectItem.parentNode.removeChild(projectItem);
  });
});

const projectList = document.getElementById('project-list');
const addProjectForm = document.getElementById('add-project-form');
const projectNameInput = document.getElementById('project-name');

// Load projects from localStorage
let savedProjects = JSON.parse(localStorage.getItem('projects')) || [];

// Add saved projects to the list
savedProjects.forEach(projectName => {
  const projectItem = createProjectItem(projectName);
  projectList.appendChild(projectItem);
});

// Add event listener to the form
addProjectForm.addEventListener('submit', event => {
  event.preventDefault();
  const projectName = projectNameInput.value.trim();
  if (projectName) {
    const projectItem = createProjectItem(projectName);
    projectList.appendChild(projectItem);
    savedProjects.push(projectName);
    localStorage.setItem('projects', JSON.stringify(savedProjects));
    projectNameInput.value = '';
  }
});

// Add event listener to save projects when the page is about to be unloaded
window.addEventListener('beforeunload', () => {
  localStorage.setItem('projects', JSON.stringify(savedProjects));
});

// Create a new project item
function createProjectItem(projectName) {
    const projectLinkInput = document.getElementById('project-link');
  const proLink = projectLinkInput.value.trim();
  projectLinkInput.value = ''; // clear the project link input field



  const projectLink = document.createElement('a');
  projectLink.href = proLink;
  projectLink.target = '_blank'; // add target attribute to open link in new tab // add target attribute to open link in new tab

  projectLink.textContent = projectName;
  projectLink.style.textDecoration = 'none'; // remove underline
  projectLink.style.color = '#4caf50'; // set font color
  projectLink.style.fontSize = '20px'; // set font size
  projectLink.style.fontFamily = 'Alkatra, cursive'; // set font family

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-project');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    const projectItem = deleteButton.parentNode;
    projectItem.parentNode.removeChild(projectItem);
    const index = savedProjects.indexOf(projectName);
    if (index !== -1) {
      savedProjects.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(savedProjects));
    }
  });

  const projectItem = document.createElement('li');
  projectItem.appendChild(projectLink);
  projectItem.appendChild(deleteButton);

  return projectItem;
}



addProjectForm.addEventListener('submit', event => {
    event.preventDefault();
    const projectName = projectNameInput.value.trim();
    const projectLink = projectLink.value.trim();
    if (projectName) {
      const projectItem = createProjectItem(projectName, projectLink);
      projectList.appendChild(projectItem);
      savedProjects.push({ name: projectName, link: projectLink });
      localStorage.setItem('projects', JSON.stringify(savedProjects));
      projectNameInput.value = '';
      projectLink.value = '';
    }
  });