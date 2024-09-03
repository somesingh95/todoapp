import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from '../components/Form';
import LoadingIndicator from '../components/LoadingIndicator';
import CustomModal from '../components/CustomModal';
import { fetchData } from '../services/api';

const TodoScreen = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch tasks from local storage on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from storage:', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to storage:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  // Fetch data from a public API (e.g., JSONPlaceholder)
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        setApiData(data.slice(0, 5)); // Limiting to 5 items for display
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  // Task handling functions
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      
      {/* Task input and add button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>

      {/* Task list */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text>No tasks available.</Text>}
      />

      {/* API data section */}
      <Text style={styles.title}>Fetched Data</Text>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={apiData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.apiDataText}>{item.title}</Text>
          )}
          ListEmptyComponent={<Text>No data available.</Text>}
        />
      )}

      {/* Form with validation */}
      <Text style={styles.title}>Form with Validation</Text>
      <Form />

      {/* Custom modal */}
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      <CustomModal
        visible={modalVisible}
        title="Confirm Action"
        body="Are you sure you want to proceed?"
        onConfirm={() => {
          setModalVisible(false);
          console.log('Action confirmed');
        }}
        onCancel={() => setModalVisible(false)}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  apiDataText: {
    padding: 10,
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default TodoScreen;
