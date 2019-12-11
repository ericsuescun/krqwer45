import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      errorStatus: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.newTask === '') {
      this.setState({ errorStatus: 'error' });
      console.log('error');
    } else {
      const l = this.state.tasks.length;
      const lastId = this.state.tasks[l - 1].id;
      let oldTasks = this.state.tasks;
      let newTask = {id: lastId + 1, name: this.state.newTask, done: false};
      console.log(newTask);
      this.setState({ tasks: [...oldTasks, newTask], newTask: '', errorStatus: '' });
    }
  }

  handleChange(e) {
    this.setState({ newTask: e.target.value})
  }

  handleClick(index,e) {
    console.log(index);
    let flipTask = this.state.tasks;
    flipTask.map((task, n) => {
      if(index === n) {
        task.done = !task.done;
        console.log(task);
      }
    });
    this.setState({tasks: flipTask});
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li className={task.done === true ? 'done' : ''} key={task.id} onClick={this.handleClick.bind(this, index)}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" id="new-task" placeholder="Ingresa una tarea y oprime Enter" value={this.state.newTask} onChange={this.handleChange.bind(this)} className={this.state.errorStatus}/>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
