const todoForm = document.querySelector('#todo-form')
const todoList = document.querySelector('.todos')
const addTask = document.getElementById('addtask')
const startDate = document.getElementById('startdate')
const endDate = document.getElementById('enddate')
const addPerson = document.getElementById('addperson')
const mainInput = document.querySelector('#todo-form input')
const currentDate = new Date().toJSON().slice(0,10)


let allTasks = JSON.parse(localStorage.getItem('oneTask')) || []

if(localStorage.getItem('allTasks')) {
  allTasks.map((newTask) => {
    createTask(newTask)
  })
}

todoForm.addEventListener('submit', (x) => {
  x.preventDefault()

  const inputValue = mainInput.value

  if (startDate.value > endDate.value) {
    alert ("La fecha de fin no puede ser menor a la fecha de inicio")
    return;
  }

  if (inputValue == '') {
    return
  }

  const newTask = {
    name: addTask.value,
    date1: startDate.value,
    date2: endDate.value,
    person: addPerson.value
  }

  allTasks.push(newTask)
  localStorage.setItem('allTasks', JSON.stringify(newTask))

  createTask(newTask)


})

function createTask(newTask) {
  const taskEl = document.createElement('li')

  taskEl.setAttribute('name', newTask.name)
  taskEl.setAttribute('date1', newTask.date1)
  taskEl.setAttribute('date2', newTask.date2)
  taskEl.setAttribute('person', newTask.person)

  const taskMarkup = `
  <div class="container text-center" id="main-content">

        <ul class="todos m-5">
          <li class="mb-4 p-2 text-center" id="oneTask">
            <div>
              <span>${newTask.name}, inicio: ${newTask.date1}, fin: ${newTask.date2}, responsable: ${newTask.person} </span>
            </div>
          </li>
        </ul>
      </div>
  `

  const completeB = document.createElement('button')
  completeB.className = 'btn btn-success'
  completeB.textContent = 'Resolver'
  
  let isMarked = false;

  completeB.addEventListener('click', function() {
    if (!isMarked) {
      taskEl.style.backgroundColor = 'mediumseagreen';
      isMarked = true;

      const unmarkB = document.createElement('button');
      unmarkB.className = 'btn btn-warning';
      unmarkB.textContent = 'Desmarcar';
      completeB.className = 'btn btn-success disabled'

      completeB.parentNode.insertBefore(unmarkB, completeB.nextSibling);

      unmarkB.addEventListener('click', function() {
        taskEl.style.backgroundColor= 'white';
        completeB.className = 'btn btn-success'
        isMarked = false;
        unmarkB.parentNode.removeChild(unmarkB);
      })
    }
  })

  const deleteB = document.createElement('button')
  deleteB.className = 'btn btn-danger'
  deleteB.textContent = 'Eliminar'
  deleteB.addEventListener('click', function() {
    if (confirm("¿Seguro de que desea eliminar esta tarea?") == true) {
      todoList.removeChild(taskEl);
      todoList.removeChild(completeB);
      todoList.removeChild(deleteB); 
    }
    else {
      return;
    }
    
  });

  taskEl.innerHTML = taskMarkup

  todoList.appendChild(taskEl)
  todoList.appendChild(completeB)
  todoList.appendChild(deleteB)

  if (endDate.value < currentDate) {
    taskEl.style.backgroundColor = 'firebrick'
    completeB.className = 'btn btn-success disabled'
  }

}


//form dissable submit if empty
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);

  }());


 
