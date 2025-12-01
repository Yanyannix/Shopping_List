import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, FlatList, ActivityIndicator, Modal, KeyboardAvoidingView, Platform, Keyboard, } from "react-native";
import ShoppingItems from "./components/ShoppingItems";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
// FIREBASE
import { db } from "./firebase/index";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function App() {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editId, setEditId] = useState(null);

  const shoppingRef = collection(db, "shopping");

  const addShoppingItem = async () => {
    if (!title.trim()) return;

    await addDoc(shoppingRef, {
      title,
      quantity: quantity ? Number(quantity) : 1,
      isChecked: false,
    });

    // clear and dismiss keyboard
    setTitle("");
    setQuantity("");
    Keyboard.dismiss();
    getShoppingList();
  };

  const getShoppingList = async () => {
    const querySnapshot = await getDocs(shoppingRef);

    const items = [];
    querySnapshot.forEach((docItem) => {
      items.push({
        id: docItem.id,
        ...docItem.data(),
      });
    });

    setShoppingList(items);
  };

  const toggleItem = async (item) => {
    await updateDoc(doc(db, "shopping", item.id), {
      isChecked: !item.isChecked,
    });

    getShoppingList();
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "shopping", id));
    getShoppingList();
  };

  const deleteAll = async () => {
    shoppingList.forEach(async (item) => {
      await deleteDoc(doc(db, "shopping", item.id));
    });
    getShoppingList();
  };

  // OPEN EDIT MODAL
  const openEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditQuantity(String(item.quantity ?? 1));
    setEditModal(true);
  };

  // UPDATE ITEM
  const saveEdit = async () => {
    await updateDoc(doc(db, "shopping", editId), {
      title: editTitle,
      quantity: Number(editQuantity),
    });
    setEditModal(false);
    getShoppingList();
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  // keyboardVerticalOffset: tune this value if your header height differs
  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <SafeAreaView
        style={[styles.container, darkMode && { backgroundColor: "#1C1C1E" }]}
      >
        {/* HEADER */}
        <View style={styles.headerBox}>
          <Text style={[styles.headerTitle, darkMode && { color: "white" }]}>
            Shopping List
          </Text>

          <View style={styles.headerRight}>
            <Pressable
              onPress={() => setDarkMode(!darkMode)}
              style={{ marginRight: 45 }}
            >
              {darkMode ? (
                <Ionicons name="sunny" size={30} color="white" />
              ) : (
                <Ionicons name="moon" size={30} color="black" />
              )}
            </Pressable>

            <Text style={[styles.itemCount, darkMode && { color: "white" }]}>
              {shoppingList.length}
            </Text>

            <Pressable onPress={deleteAll} style={{ padding: 8 }}>
              <MaterialIcons
                name="delete"
                size={30}
                color={darkMode ? "white" : "black"}
              />
            </Pressable>
          </View>
        </View>

        {/* LIST */}
        <View style={styles.listContainer}>
          {shoppingList.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={shoppingList}
              renderItem={({ item }) => (
                <ShoppingItems
                  item={item}
                  darkMode={darkMode}
                  onToggle={() => toggleItem(item)}
                  onDelete={() => deleteItem(item.id)}
                  onEdit={() => openEdit(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled" 
              // give extra bottom padding so list doesn't hide behind input when keyboard open
              contentContainerStyle={{ paddingBottom: 180 }}
            />
          ) : (
            <ActivityIndicator size="large" style={{ marginTop: 40 }} />
          )}
        </View>

        {/* INPUT BAR — moves up with keyboard */}
        <View
          style={[styles.inputContainer, darkMode && { backgroundColor: "#2C2C2E" }]}
        >
          <TextInput
            placeholder="Item..."
            placeholderTextColor={darkMode ? "#CCC" : "#999"}
            style={[styles.input, darkMode && { color: "white" }]}
            value={title}
            onChangeText={setTitle}
            returnKeyType="done"
            onSubmitEditing={addShoppingItem}
          />

          <TextInput
            placeholder="Qty"
            keyboardType="numeric"
            placeholderTextColor={darkMode ? "#CCC" : "#999"}
            style={[styles.qtyInput, darkMode && { color: "white" }]}
            value={quantity}
            onChangeText={setQuantity}
            returnKeyType="done"
            onSubmitEditing={addShoppingItem}
          />

          <Pressable onPress={addShoppingItem} style={styles.addButton}>
            <MaterialIcons name="add" size={28} color="white" />
          </Pressable>
        </View>

        {/* EDIT MODAL */}
        <Modal transparent visible={editModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Edit Item</Text>

              <TextInput
                style={styles.modalInput}
                value={editTitle}
                onChangeText={setEditTitle}
              />

              <TextInput
                style={styles.modalInput}
                value={editQuantity}
                keyboardType="numeric"
                onChangeText={setEditQuantity}
              />

              <View style={styles.modalButtons}>
                <Pressable
                  onPress={() => setEditModal(false)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>

                <Pressable onPress={saveEdit} style={styles.saveBtn}>
                  <Text style={styles.saveText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F7" },

  headerBox: {
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: { fontSize: 28, fontWeight: "700" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  itemCount: { fontSize: 28, fontWeight: "600", marginRight: 12 },

  listContainer: { flex: 1, paddingTop: 10 },

  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 14,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },

  input: { flex: 1, fontSize: 17, paddingLeft: 10 },
  qtyInput: { width: 60, fontSize: 17, marginLeft: 10, textAlign: "center" },

  addButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 12,
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
  },

  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 10 },

  modalInput: {
    backgroundColor: "#F1F1F1",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    fontSize: 17,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  cancelBtn: {
    padding: 10,
    backgroundColor: "#CCC",
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },

  saveBtn: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },

  cancelText: { fontSize: 16 },
  saveText: { fontSize: 16, color: "white" },
});
