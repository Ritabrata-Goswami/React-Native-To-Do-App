import React, { useState, useEffect } from "react"; 
import { 
  View, 
  Text, 
  FlatList,
  StyleSheet, 
  Pressable,
  Dimensions,
  Alert,
  SafeAreaView,
  ScrollView 
} from "react-native"; 
import axios from "axios";

const Display = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.43.238:3000/fetchData")
      .then((result) => {
        if(result.data.code == 200){
            setData(result.data.data);
        }else{
            Alert.alert("Error!","Can not get all the data.");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const deleteItem = (id) => {
    const sendId={
        id:id
    };

    Alert.alert("Are you sure?", `You want to delete id ${id} row?`, [
      { text: "Cancel" },
      { text: "Delete", onPress: () => {
          axios({
            method:"POST",
            url:"http://192.168.43.238:3000/deleteData",
            data:sendId,
            headers: {
                'Content-Type': 'application/json',  
            }
          }).then((result) => {
            console.log(result);
            Alert.alert("Success","Row successfully deleted!");
            setData(data.filter(item => item.id !== id));
            }).catch((error) => {
                Alert.alert("Error","Server Error!");
                console.error(error);
            });
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={Styles.row}>
      <Text style={Styles.cell}>{item.id}</Text>
      <Text style={Styles.cell}>{item.name}</Text>
      <Text style={Styles.cell}>{item.status}</Text>
      <Text style={Styles.cell}>{item.consider}</Text>
      <Text style={Styles.cell}>{item.slots}</Text>
      <Pressable style={Styles.deleteButton} onPress={() => deleteItem(item.id)}>
        <Text style={Styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={Styles.mainContainer}>
        <Text style={Styles.hdrTxt}>To Do Display</Text>
        {data.length > 0 ? (
        <View style={Styles.table}>
            <View style={Styles.headerRow}>
                <Text style={Styles.headerCell}>Id</Text>
                <Text style={Styles.headerCell}>Task Name</Text>
                <Text style={Styles.headerCell}>Payable</Text>
                <Text style={Styles.headerCell}>Consideration</Text>
                <Text style={Styles.headerCell}>Slots</Text>
                <Text style={Styles.headerCell}>Delete</Text>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ maxHeight: '100%' }}
                />
            </View>
        </View>
      ) : (
        <Text style={Styles.noDataText}>No Data Available</Text>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor: "#f5f5f5",
  },
  hdrTxt: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  table: {
    width: '100%',
    alignSelf: 'center',
    flex:1
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#005ce6",
  },
  headerCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
    fontSize: 16,
    textAlign: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#ff001b",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 15,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "#b30000",
    marginTop: 20,
  }
});



export default Display;