import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, TextInput, Button, FlatList} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const SQLConnection = () => {

  // const [record, setRecord] = useState();
  const [records, setRecords] = useState([]);

  const [transDate, setTransDate] = useState();
  const [cost, setCost] = useState();
  const [transType, setTransType] = useState();
  const [destination, setDestination] = useState();

  const [rid, setRid] = useState();

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS TestDB (id INTEGER PRIMARY KEY AUTOINCREMENT, transDate DATE, cost INTEGER(5), transType VARCHAR(15), destination VARCHAR(60))`,
        [],
        (sqlTxn, res) => {
          console.log('table created successfully');
        },
        error => {
          console.log('error on creating table ' + error.message);
        },
      );
    });
  };

  const addRecord = () => {
    if (!transDate && !cost && !transType && !destination) {
      alert('Enter Record');
      return false;
    }

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO records (transDate, cost, transType, destination) VALUES (?, ?, ?, ?)`,
        [transDate, cost, transType, destination],
        (sqlTxn, res) => {
          // console.log(`${record} records added successfully`);
          console.log(`${transDate, cost, transType, destination} records added successfully`);
          getRecords();
          //setRecord('');
        },
        error => {
          console.log('error on adding records ' + error.message);
        },
      );
    });
  };

  const removeRecord = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `DELETE FROM records WHERE id = (?)`,
        [rid],
        () => {
          console.log(`records deleted successfully`);
          getRecords();
        },
        error => {
          console.log('error on remove records ' + error.message);
        },
      );
    });
  };

  const getRecords = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM records ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log(`records retrieved successfully`);
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                transDate: item.transDate,
                cost: item.cost,
                transType: item.transType,
                destination: item.destination,
              });
            }

            setRecords(results);
            // console.log(`${JSON.stringify(recordsArray)} records retrieved successfully`);
          }
        },
        error => {
          console.log('error on getting records ' + error.message);
        },
      );
    });
  };

//   const renderRecord = ({item}) => {
//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           paddingVertical: 12,
//           paddingHorizontal: 10,
//           borderBottomWidth: 1,
//           borderColor: '#ddd',
//         }}>
//         <Text>{item.id}</Text>
//         <Text>{item.transDate}</Text>
//         <Text>{item.cost}</Text>
//         <Text>{item.transType}</Text>
//         <Text>{item.destination}</Text>
//       </View>
//     );
//   };

  useEffect(async () => {
    await createTables();
    await getRecords();
  }, []);

  const Item = ({ id, transDate, cost, transType, destination }) => (
    <View style={{flexDirection:'row'}} >
        <Text> {id} </Text>
        <Text> {transDate} </Text>
        <Text> {cost} </Text>
        <Text> {transType} </Text>
        <Text> {destination} </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item id={item.id} 
          transDate={item.transDate}
          cost={item.cost}
          transType={item.transType}
          destination={item.destination}
    />
  )

  return (

    <View>
      <StatusBar backgroundColor="#222" />

      <TextInput
        placeholder="Enter transDate"
        value={transDate}
        onChangeText={setTransDate}
        style={{marginHorizontal: 8}}
      />

      <TextInput
        placeholder="Enter cost"
        value={cost}
        onChangeText={setCost}
        style={{marginHorizontal: 8}}
      />

      <TextInput
        placeholder="Enter transType"
        value={transType}
        onChangeText={setTransType}
        style={{marginHorizontal: 8}}
      />

      <TextInput
        placeholder="Enter destination"
        value={destination}
        onChangeText={setDestination}
        style={{marginHorizontal: 8}}
      />
      <View style={{flexDirection:'row'}}>
        <Button title="Submit" onPress={addRecord} />
        <Button title="Remove" onPress={removeRecord} />
        <TextInput
          placeholder="Enter the Id to remove"
          value={rid}
          onChangeText={setRid}
        />
      </View>
      <FlatList data={records} renderItem={renderItem} key={item => item.id} ></FlatList>
    </View>
  );
};

export default SQLConnection;
