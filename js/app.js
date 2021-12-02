/* global Vue */

const STORAGE_KEY = 'todos-vuejs-2.0'
const todoStorage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#todoapp',
  data: {
    todos: todoStorage.fetch(),
    newTodo: '',
    editedTodo: null
  },
  methods: {
    addTodo: function () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({ id: this.todos.length + 1, content: value })
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      const index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    },
    editTodo: function (todo) {
      this.editedTodo = todo
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      const content = todo.content.trim()
      if (content) {
        todo.content = content
      } else {
        this.removeTodo(todo)
      }
    }

  },
  watch: {
    todos: {
      deep: true,
      handler: todoStorage.save
    }
  }
})

app.$mount('#app')
