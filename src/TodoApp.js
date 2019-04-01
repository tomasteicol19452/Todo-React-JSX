import React from "react";

import { ListaTodos } from "./ListaTodos";

/**
 * Representa o ponto de arranque da aplicação de tarefas.
 *
 * É responsável por definir a estrutura da aplicação, e a gestão
 * das tarefas que são manipuladas pelo utilizador.
 */
export class TodoApp extends React.Component {
  /**
   *
   * @param {object} props Valor inicial (ou por defeito) das propriedades
   * que vão inicializar o objeto. Podem, por exemplo, ser usadas para definir
   * variáveis no `this.state`.
   */
  constructor(props) {
    super(props);

    // `this.state` é obrigatóriamente um objeto.
    // Se não for definido, toma o valor de `null`.
    this.state = {
      /**
       * Representa as tarefas que o utilizador tem para fazer.
       */
      listaTarefas: [
        { texto: "Dar de comer ao gato", concluido: false },
        { texto: "Estudar TI2", concluido: true }
      ]
    };
  }

  // Define o que tem que ser colocado no ecrã.
  render() {
    console.log("Render TodoApp");

    /*
    <div>
      <input type="text" id="txtDescricaoTarefa" />
      <button type="button" onClick={(evt) => this.handleAddClick(evt)}>
        +
      </button>
      <ListaTodos tarefas={this.state.listaTarefas} />
    </div>
    */

    return React.createElement(
      "div",
      null,
      React.createElement("input", { type: "text", id: "txtDescricaoTarefa" }),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: evt => this.handleAddClick(evt)
        },
        "+"
      ),
      React.createElement(ListaTodos, {
        tarefas: this.state.listaTarefas,
        // A prop `onDeleteTodo` serve como "intermediário",
        // ou "canal de comunicação" entre a `ListaTodos` e o `TodoApp`.
        // Quando o utilizador clica no botão para apagar uma tarefa,
        // a função que está nesta `prop` é chamada com o índice `idx`.
        // (ver o `onClick` do botão de eliminar no `ListaTodos`).
        onDeleteTodo: idx => this.handleDeleteTodo(idx),
        onEditTodo: (idx, novoTexto) => this.handleEditTodo(idx, novoTexto),
        onToggleCompleteTodo: idx => this.handleToggleCompleteTodo(idx)
      }),
      <button type="button" onClick={() => this.handleDeleteCompleted()}>
        Apagar terminadas
      </button>
    );
  }

  handleDeleteCompleted() {
    this.setState({
      listaTarefas: this.state.listaTarefas.filter(tarefa => !tarefa.concluido)
    });
  }

  /**
   * Adiciona o texto da caixa de texto à lista de tarefas.
   *
   * @param {Event} evt
   */
  handleAddClick(evt) {
    console.log("Click");
    let textoTarefa = document.getElementById("txtDescricaoTarefa").value;

    // A criação de um array auxiliar é porque não se deve alterar
    // os valores presentes em `this.props` ou `this.state`.
    // A alteração destes valores, por limitações do JS, não seria
    // detectada pelo React, e o componente não se iria atualizar.
    // A modificação (adição da nova tarefa) é feita no array auxiliar.
    let copia = this.state.listaTarefas.slice();

    copia.push({ texto: textoTarefa, concluido: false });

    // Guardar o novo valor (isto é, a nova lista de tarefas)
    // e atualizar o componente.
    this.setState({
      listaTarefas: copia
    });
  }

  /**
   * Apaga uma tarefa da lista.
   *
   * @param {number} index Índice do array para apagar na
   * lista de tarefas.
   */
  handleDeleteTodo(index) {
    let aux = this.state.listaTarefas.slice();

    // Remover 1 elemento de `aux`, a partir do índice `index`
    // ou seja, estou a remover uma tarefa na posição determinada pelo
    // utilizador.
    aux.splice(index, 1);

    this.setState({
      listaTarefas: aux
    });
  }

  handleEditTodo(index, novoTexto) {
    let aux = this.state.listaTarefas.slice();

    aux[index] = {
      texto: novoTexto,
      concluido: aux[index].concluido
    };

    this.setState({ listaTarefas: aux });
  }

  handleToggleCompleteTodo(index) {
    let aux = [...this.state.listaTarefas];

    aux[index] = {
      texto: aux[index].texto,
      concluido: !aux[index].concluido
    };

    this.setState({ listaTarefas: aux });
  }
}
