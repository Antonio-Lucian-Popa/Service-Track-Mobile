import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, PaperProvider } from 'react-native-paper';

import AdaugaServiciuModal from './AdaugaServiciuModal';
import ServiceTable, { Service } from '../components/ServiceTable';



const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Service | null>(null);

  const showModal = (rowData: Service) => {
    setSelectedRowData(rowData);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={styles.containerView}>
      <Text style={styles.text}>Bine ai venit, Antonio!👋</Text>
      <Divider />
      <Text style={styles.textFlota}>Flota Utilaje</Text>
        <ServiceTable onRowPress={showModal} />
        <AdaugaServiciuModal visible={visible} onDismiss={hideModal} rowData={selectedRowData} />
      </View>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  containerView: {
    flex: 1,
   // justifyContent: 'center',
   // alignItems: 'center',
  },
  text: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
    marginBottom: 20,
    marginTop: 30,
  },
  textFlota: {
    width: '100%',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
    marginBottom: 10,
    marginTop: 20,
  }
});


export default HomeScreen;
