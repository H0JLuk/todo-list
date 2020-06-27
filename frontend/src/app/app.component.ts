import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listCase: object[] = [];
  caseName: string = '';

  constructor() {
    fetch('api/todo')
      .then(res => res.json())
      .then((tasks) => this.listCase = tasks)
      .catch(e => console.log(e));
  }

  addCase(): void {
    const title = this.caseName.trim();
    if (!title) {
      return;
    }

    fetch('api/todo', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title})
    })
      .then(res => res.json())
      .then(({todo}) => {
        console.log(todo);
        this.listCase.push(todo);
        this.caseName = '';
      })
      .catch(e => console.log(e));
  }

  toggleTodo(id: number): void {
    const idx = this.listCase.findIndex(task => task['id'] === id);
    fetch(`api/todo/${id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({done: this.listCase[idx]['done']})
    })
      .then(res => res.json())
      .then(({todo}) => {
        this.listCase[idx]['done'] = todo.done;
        this.listCase[idx]['updatedAt'] = todo.updatedAt;
      })
      .catch(e => console.log(e));
  }

  deleteCase(id: number): void {
    fetch(`api/todo/${id}`, {
      method: 'delete'
    })
      .then(() => this.listCase = this.listCase.filter(task => task['id'] !== id))
      .catch(e => console.log(e));
  }
}
