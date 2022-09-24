import React, { Component } from "react";
import HeaderComponent from "./src/Components/HeaderComponent";
import Icon from 'react-native-vector-icons/Entypo';
import ItemDatabase from "./src/DataBase/ItemDatabase";
import TaskListItem from "./src/Models/TaskListItem";
import TaskList from "./src/Components/TaskList";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      description: '',
      endDate: '',
      priority: '',
      list: []
    }

    this.ListTaskItem();
  }

  RegisterTask = (description, endDate, priority) => {
    const newTask = new TaskListItem(description, endDate, priority);
    const dataBase = new ItemDatabase();
    dataBase.Inserir(newTask);
    this.ListTaskItem();

  }

  ListTaskItem = () => {
    const dataBase = new ItemDatabase();
    dataBase.Listar().then(
      completeListTasks => {
        this.setState({ list: completeListTasks })
      }
    )
  }
  render() {
    let backGroundImage = require('../ToDoTasks/src/Images/lista-de-tarefas.jpg')
    return (
      <View style={{ width: '100%', height: '100%' }}>

        <View>
          <HeaderComponent />
        </View>
        
        <ScrollView>

          <ImageBackground source={require('../ToDoTasks/src/Images/lista-de-tarefas.jpg')} style={{ width: '100%', height: 810 }} imageStyle={{ opacity: 0.4 }}>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              <View style={style.tasksView}>
                <Text style={style.tasksTextTitle}>Adicione uma nova tarefa </Text>
                <TextInput style={style.inputTextTasks} placeholder="Descrição:" onChangeText={(typeValue) => { this.setState({ description: typeValue }) }}></TextInput>
                <TextInput style={style.inputTextTasks} placeholder="Data de término:" onChangeText={(typeValue) => { this.setState({ endDate: typeValue }) }}></TextInput>
                <TextInput style={style.inputTextTasks} placeholder="Prioridade:" onChangeText={(typeValue) => { this.setState({ priority: typeValue }) }}></TextInput>
                <View style={style.taskButtonView}>
                  <TouchableOpacity
                    onPress={() => this.RegisterTask(this.state.description, this.state.endDate, this.state.priority)}
                    style={style.taskButton}>
                    <Icon name="text-document" size={25} color='#fff' />
                    <Text style={style.taskButtonText}>Adicionar Tarefa</Text>
                  </TouchableOpacity>
                </View>
                {/*<TextInput style={style.inputTextTasks} placeholder="Status:"></TextInput>*/}
                <View style={{ width: '100%', alignItems: 'center', marginTop: 25 }}>
                  {
                    this.state.list.map(listTaskRegister => (
                      <TaskList
                        id={listTaskRegister.id}
                        item={listTaskRegister}
                        description={listTaskRegister.description}
                        endDate={listTaskRegister.endDate}
                        priority={listTaskRegister.priority}
                      />
                    ))
                  }
                </View>

              </View>

            </View>

          </ImageBackground>

        </ScrollView>

      </View>
    )
  }
}

const style = StyleSheet.create({
  tasksBody: {
    justifyContent: 'center'
  },

  tasksTextTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  },

  inputTextTasks: {
    width: '98%',
    height: 40,
    color: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
  },

  tasksView: {
    backgroundColor: '#4682B4',
    marginTop: 15,
    alignItems: 'center',
    height: 300,
    width: '95%',
    padding: 10,
    borderRadius: 18
  },

  taskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    width: 150,
    height: 50,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10
  },

  taskButtonView: {
    marginTop: 10,
    marginLeft: 170
  },

  taskButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default App;