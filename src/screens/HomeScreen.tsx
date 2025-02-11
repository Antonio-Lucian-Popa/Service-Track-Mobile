import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Alert, View, TouchableOpacity, ScrollView } from 'react-native';
import DocumentScannerComponent from '../components/DocumentScanner';
import { Text } from 'react-native';
import { Button, Checkbox, Divider, TextInput, List } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

const HomeScreen = () => {
  const [formData, setFormData] = useState({
    index: '',
    data: null as Date | null, // 🔹 Stocăm data selectată (null inițial)
    rev: {
      motor: false,
      combustibil: false,
      aer: false,
      polen: false,
      adBlue: false,
      uscator: false,
    },
    rev1: {
      cutieK: false,
      uleiCutie: false,
      punt: false,
    },
    rev2: {
      hidraulic: false,
      uleiHidraulic: false,
    },
    detaliiLucrariEfectuate: '',
  });

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // ✅ Funcție generală pentru actualizarea valorilor în formular
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Funcție pentru actualizarea checkbox-urilor
  const handleCheckboxChange = (section: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof formData] as object),
        [field]: !(prev[section as keyof typeof formData] as any)[field],
      },
    }));
  };

  // ✅ Funcție de submit
  const handleSubmit = () => {
    if (!formData.index) {
      Alert.alert('Eroare', 'Introduceți un index valid!');
      return;
    }

    Alert.alert('Succes', JSON.stringify(formData, null, 2));
  };

  // ✅ Verificăm dacă butonul trebuie să fie activ sau nu
  const isButtonDisabled = !formData.index || !formData.data;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.text}>Bine ai venit, Antonio!👋</Text>
        <Divider />

        {/* Câmp Index */}
        <TextInput
          label="Index"
          mode="outlined"
          value={formData.index}
          onChangeText={(text) => handleChange('index', text)}
          style={styles.input}
        />

        {/* 🔥 Date Picker - modificat pentru a fi clicabil */}
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <TextInput
            label="Data"
            mode="outlined"
            value={formData.data ? formData.data.toLocaleDateString() : ''}
            style={styles.input}
            editable={false} // 🔹 Evităm input manual
            pointerEvents="none" // 🔹 Previne interacțiunea accidentală
          />
        </TouchableOpacity>

        {/* Date Picker Modal */}
        <DatePickerModal
          locale="ro"
          mode="single"
          visible={datePickerVisible}
          onDismiss={() => setDatePickerVisible(false)}
          date={formData.data || undefined}
          onConfirm={(params) => {
            setDatePickerVisible(false);
            handleChange('data', params.date);
          }}
        />

        <Divider />

        {/* 🔥 Lista de revizii */}
        <List.Section title="Date Vehicul">
          <List.Accordion title="Revizie Motor">
            {Object.keys(formData.rev).map((key) => (
              <View style={styles.checkboxContainer} key={key}>
                <Checkbox
                  status={formData.rev[key as keyof typeof formData.rev] ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxChange('rev', key)}
                />
                <Text>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
              </View>
            ))}
          </List.Accordion>

          <List.Accordion title="Revizie Cutie & Punt">
            {Object.keys(formData.rev1).map((key) => (
              <View style={styles.checkboxContainer} key={key}>
                <Checkbox
                  status={formData.rev1[key as keyof typeof formData.rev1] ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxChange('rev1', key)}
                />
                <Text>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
              </View>
            ))}
          </List.Accordion>

          <List.Accordion title="Revizie Hidraulică">
            {Object.keys(formData.rev2).map((key) => (
              <View style={styles.checkboxContainer} key={key}>
                <Checkbox
                  status={formData.rev2[key as keyof typeof formData.rev2] ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxChange('rev2', key)}
                />
                <Text>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
              </View>
            ))}
          </List.Accordion>
        </List.Section>

        <Divider />

        {/* TextArea pentru detalii lucrări */}
        <TextInput
          label="Detalii lucrări efectuate"
          mode="outlined"
          value={formData.detaliiLucrariEfectuate}
          onChangeText={(text) => handleChange('detaliiLucrariEfectuate', text)}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <Divider />
        <DocumentScannerComponent />
        <Divider />

        {/* Buton de submit */}
        <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={isButtonDisabled}>
          Trimite
        </Button>
        <Divider />
      </ScrollView>
    </SafeAreaView>
  );
};

// ✅ Stiluri
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textArea: {
    margin: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    margin: 10,
  },
});

export default HomeScreen;
