import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);

  useEffect(() => {
    saveTodo(todo);
  }, [todo]);

  const saveTodo = async (todo) => {
    try {
      const stringifyTodo = JSON.stringify(todo);
      await AsyncStorage.setItem("todo", stringifyTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodo = async () => {
    try {
      const todo = await AsyncStorage.getItem("todo");
      if (todo != null) {
        setTodo(JSON.parse(todo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = (todoId) => {
    const newTodoItem = todo.map((item) => {
      if (item.id === todoId) {
        return { ...item, completed: true };
      }
      return item;
    });

    setTodo(newTodoItem);
  };

  const clearTask = (todoId) => {
    Alert.alert("Confirm", "Want To Clear Your Task?", [
      {
        text: "Yes",
        onPress: () => {
          const newTodoItem = todo.filter((item) => item.id != todoId);
          setTodo(newTodoItem);
        },
      },

      {
        text: "No",
      },
    ]);
  };

  const clearTasks = () => {
    Alert.alert("Confirm", "Want To Clear All Tasks?", [
      {
        text: "Yes",
        onPress: () => setTodo([]),
      },
      {
        text: "No",
      },
    ]);
  };

  const addTask = () => {
    if (textInput == "") {
      alert("Please Add Task");
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodo([...todo, newTodo]);
      setTextInput("");
    }
  };

  const ListItem = ({ todo }) => {
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          flexDirection: "row",
          elevation: 12,
          borderRadius: 7,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: todo.completed ? "skyblue" : "blue",
              textDecorationLine: todo.completed ? "underline" : "none",
            }}
          >
            {todo.task}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => completeTask(todo.id)}
              style={{
                backgroundColor: "blue",
                borderRadius: 25,
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark-done" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => clearTask(todo.id)}
              style={{
                backgroundColor: "blue",
                borderRadius: 25,
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}>
      <StatusBar style="light" backgroundColor="#710000" />

      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "green",
          borderRadius: 30,
          margin: 10,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "blue",
          }}
        >
          Your Tasks
        </Text>
        <TouchableOpacity
          onPress={clearTasks}
          style={{
            backgroundColor: "blue",
            borderRadius: 25,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={todo}
          renderItem={({ item }) => <ListItem todo={item} />}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "green",
          borderRadius: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Enter Your Task"
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
            style={{
              width: "85%",
              height: 50,
              borderRadius: 20,
              padding: 10,
            }}
          />
          <TouchableOpacity
            onPress={addTask}
            style={{
              backgroundColor: "blue",
              borderRadius: 25,
              width: 45,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
