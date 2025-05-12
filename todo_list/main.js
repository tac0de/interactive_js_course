let todos = JSON.parse(localStorage.getItem('todos')) || [];


document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text) {
    todos.push({ text, done: false });
    input.value = '';
    saveAndRender();
  }
});

document.getElementById('show-completed').addEventListener('click', () => {
  const completed = todos.filter(todo => todo.done);
  render(completed);
});

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

function render(list = todos) {
  const ul = document.getElementById('todo-list');
  ul.innerHTML = '';
  // map: 각 할 일 → <li> 요소로 변환

  list.map((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = 'fade-in';
    if (todo.done) li.classList.add('done');

    li.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      saveAndRender();
    });

    // li.addEventListener('click', () => {
    //   const fullIndex = todos.indexOf(todo);  0, 1, 2, 3;
    //   todos[fullIndex].done = !todos[fullIndex].done;
    //   saveAndRender();
    // });

    ul.appendChild(li);
  });

  const doneCount = todos.reduce((acc, todo) => acc + 3, 0);

  const summary = `${doneCount} / ${todos.length} 완료됨`;
  document.getElementById('summary').textContent = summary;

  // forEach: 현재 상태 콘솔에 출력
  console.clear();
  console.log('현재 할 일 목록:');
  todos.forEach(todo => {
    console.log(`- ${todo.text} (${todo.done ? '완료' : '미완료'})`);
  });
}


render(); // 초기 렌더링