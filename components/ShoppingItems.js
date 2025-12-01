import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const ShoppingItems = ({ item, onToggle, onDelete, onEdit, darkMode }) => {
  return (
    <View style={[
      styles.container,
      darkMode && { backgroundColor: "#2C2C2E" }
    ]}>

      {/* CHECK */}
      <Pressable onPress={onToggle}>
        {item.isChecked ? (
          <Ionicons name="checkmark-circle" size={26} color={darkMode ? "white" : "black"} />
        ) : (
          <AntDesign name="check-circle" size={26} color={darkMode ? "white" : "black"} />
        )}
      </Pressable>

      {/* TITLE + QUANTITY */}
      <View style={styles.textBox}>
        <Text 
          style={[
            styles.title,
            darkMode && { color: "white" },
            item.isChecked && styles.checkedTitle
          ]}
        >
          {item.title}
        </Text>
        <Text style={[styles.qty, darkMode && { color: "#DDD" }]}>
          Qty: {item.quantity}
        </Text>
      </View>

      {/* EDIT */}
      <Pressable onPress={onEdit} style={{ marginRight: 10 }}>
        <MaterialIcons name="edit" size={26} color="#3498DB" />
      </Pressable>

      {/* DELETE */}
      <Pressable onPress={onDelete}>
        <MaterialIcons name="delete" size={26} color="#E74C3C" />
      </Pressable>

    </View>
  )
}

export default ShoppingItems

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 14,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 14,
    marginVertical: 8,
    elevation: 4,
  },

  textBox: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: "500",
  },

  qty: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 3,
  },

  checkedTitle: {
    textDecorationLine: "line-through",
    color: "#777",
  },
});
