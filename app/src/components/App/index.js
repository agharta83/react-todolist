/*
 * NPM import
 */
import React from 'react';

/*
 * Local import
 */
import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import Tasks from 'src/components/Tasks';

/*
 * Code
 */
class App extends React.Component {
  /*
   * State
   */
  state = {
    input: '',
    tasks: [
      {
        id: 5,
        label: 'farine',
        done: true,
        fav: false,
      },
      {
        id: 12,
        label: 'lait',
        done: false,
        fav: false,
      },
      {
        id: 4,
        label: 'sucre',
        done: false,
        fav: true,
      },
    ],
  }
  /*
   * Actions
   */
  changeInput = (value) => {
    // j'ajoute la valeur fournie à mon state
    this.setState({ input: value });
  }

  // Ajout d'une tâche au state
  addTask = () => {
    // Je créé un tableau avec toutes les ids
    const allIds = this.state.tasks.map(task => task.id);

    // Je calcule le prochain ID en prenant la plus haute et en ajoutant 1
    const newId = Math.max(...allIds) + 1;

    // Creer une tache et la remplir
    const task = {
      id: newId,
      label: this.state.input,
      done: false,
      fav: false,
    };


    // Ajouter la tache à la liste existante

    // NOPE : PAS BON : On modifie le state, c'est pas notre travail
    // const { tasks } = this.state;
    // tasks.push(task);


    // OK : on fait une copie : Nickel

    // const { tasks } = this.state;

    // const { tasks } = this.state;
    // ===
    // const tasks = this.state.tasks;
    /* option 1 : map */
    // const newTasks = tasks.map(item => item);

    /* option 2 : concat, là ça devient vraiment classe :D */
    // const newTasks = tasks.concat(task);
    // console.log(newTasks);
    // console.log(this.state.tasks);

    // WOUAHHHHH C'est trop bien, la classe de OUF guedin

    const tasks = [task, ...this.state.tasks];

    // Modifier le state
    // Je vide l'input avec this.state.input = ''
    this.setState({
      tasks,
      input: '',
    });
  }

  // Suppression
  deleteTask = id => () => {
    // Recup des taches et filtre
    const tasks = this.state.tasks.filter(task => task.id !== id);
    // Modif du state
    this.setState({ tasks });
  }

  // Check d'une tâche
  checkTask = id => () => {
    console.log('je coche une case');
    console.log(`ID : ${id}`);

    // Récupérer la liste des taches
    const tasks = this.state.tasks.map((task) => {
      // Cibler la tache dont l'id est reçu
      if (task.id === id) {
        // Inverser la valeur
        return {
          // id: task.id,
          // label: task.label,
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    // Modifier le state avec la Copie
    this.setState({ tasks });
  }

  // Mise en favori
  favoriteTask = id => () => {
    // Récupérer la liste des taches
    const tasks = this.state.tasks.map((task) => {
      // Cibler la tache dont l'id est reçu
      if (task.id === id) {
        // Inverser la valeur
        return {
          // id: task.id,
          // label: task.label,
          ...task,
          fav: !task.fav,
        };
      }
      return task;
    });

    // Modifier le state avec la Copie
    this.setState({ tasks });
  }

  /*
   * Rendu
   */
  render() {
    const { tasks, input } = this.state;

    // Taches en cours / non-effectuées
    const count = tasks.filter(task => !task.done).length;

    // Ordonner les tâches
    const orderedTasks = [
      // + En haut, les tâches non effectuées favories
      ...tasks.filter(task => !task.done && task.fav),

      // + Ensuite, les tâches non effectuées non favories
      ...tasks.filter(task => !task.done && !task.fav),

      // + Ensuite, les tâches effectuées
      ...tasks.filter(task => task.done),
    ];

    return (
      <div id="todo">
        <Form
          onAddTask={this.addTask}
          inputValue={input}
          onInputChange={this.changeInput}
        />
        <Counter count={count} />
        <Tasks
          tasks={orderedTasks}
          actions={{
            onCheckTask: this.checkTask,
            onDeleteTask: this.deleteTask,
            onFavoriteTask: this.favoriteTask,
          }}
        />
      </div>
    );
  }
}

/*
 * Export
 */
export default App;
