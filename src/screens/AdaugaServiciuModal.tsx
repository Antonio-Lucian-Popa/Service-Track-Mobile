/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import { ServiceUtilaj, useServiceUtilaj } from '../services/ServiceUtilaj';

import { StyleSheet, Alert, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import DocumentScannerComponent from '../components/DocumentScanner';
import { Text } from 'react-native';
import { Button, Checkbox, Divider, TextInput, List } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { Picker } from '@react-native-picker/picker';
import { Service } from '../components/ServiceTable';


// const AdaugaServiciuModal: React.FC<ModalProps> = () => {
//     const [formData, setFormData] = useState({
//         index: '',
//         data: null as Date | null, // 🔹 Stocăm data selectată (null inițial)
//         rev: {
//             motor: false,
//             combustibil: false,
//             aer: false,
//             polen: false,
//             adBlue: false,
//             uscator: false,
//         },
//         rev1: {
//             cutieK: false,
//             uleiCutieK: false,
//             punte: false,
//         },
//         rev2: {
//             hidraulic: false,
//             uleiHidraulic: false,
//         },
//         detaliiLucrariEfectuate: '',
//         service: '',
//     });

//     const [datePickerVisible, setDatePickerVisible] = useState(false);
//     const [services, setServices] = useState<ServiceUtilaj[]>([]);
//     const [selectedService] = useState<string>(formData.service);

//     const { findAllServicesOnUtilajId } = useServiceUtilaj();

//     useEffect(() => {
//         const fetchServices = async () => {
//             const servicesList = await findAllServicesOnUtilajId('3544');
//             if (servicesList && servicesList.length > 0) {
//                 setServices(servicesList);
//             }
//         };

//         fetchServices();
//     }, [findAllServicesOnUtilajId]);

//     useEffect(() => {
//         handleChange('service', selectedService);
//     }, [selectedService]);


//     // ✅ Funcție generală pentru actualizarea valorilor în formular
//     const handleChange = (field: string, value: any) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//     };

//     // ✅ Funcție pentru actualizarea checkbox-urilor
//     const handleCheckboxChange = (section: string, field: string) => {
//         setFormData((prev) => ({
//             ...prev,
//             [section]: {
//                 ...(prev[section as keyof typeof formData] as object),
//                 [field]: !(prev[section as keyof typeof formData] as any)[field],
//             },
//         }));
//     };

//     // ✅ Funcție de submit
//     const handleSubmit = () => {
//         if (!formData.index) {
//             Alert.alert('Eroare', 'Introduceți un index valid!');
//             return;
//         }

//         Alert.alert('Succes', JSON.stringify(formData, null, 2));
//     };

//     // ✅ Verificăm dacă butonul trebuie să fie activ sau nu
//     const isButtonDisabled = !formData.index || !formData.data;

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <Text style={styles.text}>Bine ai venit, Antonio!👋</Text>
//                 <Divider />

//                 {/* Câmp Index */}
//                 <TextInput
//                     label="Index"
//                     mode="outlined"
//                     value={formData.index}
//                     onChangeText={(text) => handleChange('index', text)}
//                     style={styles.input}
//                 />

//                 {/* 🔥 Date Picker - modificat pentru a fi clicabil */}
//                 <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
//                     <TextInput
//                         label="Data"
//                         mode="outlined"
//                         value={formData.data ? formData.data.toLocaleDateString() : ''}
//                         style={styles.input}
//                         editable={false} // 🔹 Evităm input manual
//                         pointerEvents="none" // 🔹 Previne interacțiunea accidentală
//                     />
//                 </TouchableOpacity>

//                 {/* Date Picker Modal */}
//                 <DatePickerModal
//                     locale="ro"
//                     mode="single"
//                     visible={datePickerVisible}
//                     onDismiss={() => setDatePickerVisible(false)}
//                     date={formData.data || undefined}
//                     onConfirm={(params) => {
//                         setDatePickerVisible(false);
//                         handleChange('data', params.date);
//                     }}
//                 />

//                 <Divider />

//                 {/* 🔥 Lista de revizii */}
//                 <List.Section title="Date Vehicul">
//                     <List.Accordion title="Revizie">
//                         {Object.keys(formData.rev).map((key) => (
//                             <View style={styles.checkboxContainer} key={key}>
//                                 <Checkbox
//                                     status={formData.rev[key as keyof typeof formData.rev] ? 'checked' : 'unchecked'}
//                                     onPress={() => handleCheckboxChange('rev', key)}
//                                 />
//                                 <Text>{key.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, char => char.toUpperCase())}</Text>
//                             </View>
//                         ))}
//                     </List.Accordion>

//                     <List.Accordion title="Revizie 1 +">
//                         {Object.keys(formData.rev1).map((key) => (
//                             <View style={styles.checkboxContainer} key={key}>
//                                 <Checkbox
//                                     status={formData.rev1[key as keyof typeof formData.rev1] ? 'checked' : 'unchecked'}
//                                     onPress={() => handleCheckboxChange('rev1', key)}
//                                 />
//                                 <Text>{key.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, char => char.toUpperCase())}</Text>
//                             </View>
//                         ))}
//                     </List.Accordion>

//                     <List.Accordion title="Revizie 2 +">
//                         {Object.keys(formData.rev2).map((key) => (
//                             <View style={styles.checkboxContainer} key={key}>
//                                 <Checkbox
//                                     status={formData.rev2[key as keyof typeof formData.rev2] ? 'checked' : 'unchecked'}
//                                     onPress={() => handleCheckboxChange('rev2', key)}
//                                 />
//                                 <Text>{key.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, char => char.toUpperCase())}</Text>
//                             </View>
//                         ))}
//                     </List.Accordion>
//                 </List.Section>

//                 <Divider />

//                 <View style={styles.pickerContainer}>
//                     <Text style={styles.labelText}>Service</Text>
//                     <Picker
//                         selectedValue={selectedService}
//                         onValueChange={(itemValue) => handleChange('service', itemValue)}
//                     >
//                         {services.map((service, index) => (
//                             <Picker.Item key={index} label={service.titlu} value={service} />
//                         ))}
//                     </Picker>
//                 </View>

//                 {/* TextArea pentru detalii lucrări */}
//                 <TextInput
//                     label="Detalii lucrări efectuate"
//                     mode="outlined"
//                     value={formData.detaliiLucrariEfectuate}
//                     onChangeText={(text) => handleChange('detaliiLucrariEfectuate', text)}
//                     multiline
//                     numberOfLines={4}
//                     style={styles.textArea}
//                 />

//                 <Divider />
//                 <DocumentScannerComponent />
//                 <Divider />

//                 {/* Buton de submit */}
//                 <Button mode="contained" onPress={handleSubmit} style={styles.button} disabled={isButtonDisabled}>
//                     Trimite
//                 </Button>
//                 <Divider />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// ✅ Stiluri
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f8f8f8',
//         padding: 10,
//     },
//     modalContainer: {
//         backgroundColor: 'white',
//         padding: 20,
//         marginHorizontal: 20,
//         borderRadius: 10,
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         padding: 10,
//     },
//     text: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 20,
//     },
//     labelText: {
//         fontSize: 16,
//     },
//     input: {
//         marginVertical: 5,
//     },
//     textArea: {
//         marginVertical: 10,
//         height: 100,
//         textAlignVertical: 'top',
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     button: {
//         marginTop: 10,
//     },
//     pickerContainer: {
//         marginVertical: 10,
//     },
// });

interface AdaugaServiciuModalProps {
    visible: boolean;
    onDismiss: () => void;
    rowData: Service | null;
}

const AdaugaServiciuModal: React.FC<AdaugaServiciuModalProps> = ({ visible, onDismiss, rowData }) => {

    console.log("Row data: ", rowData);

    const utilajId = rowData?.id;

    const date = new Date();

    const [formData, setFormData] = useState({
        index: '',
        data: date, // 🔹 Stocăm data selectată (null inițial)
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
            uleiCutieK: false,
            punte: false,
        },
        rev2: {
            hidraulic: false,
            uleiHidraulic: false,
        },
        detaliiLucrariEfectuate: '',
        service: '',
    });

    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [services, setServices] = useState<ServiceUtilaj[]>([]);
    const [selectedService] = useState<string>(formData.service);

    const { findAllServicesOnUtilajId } = useServiceUtilaj();

    useEffect(() => {
        if(rowData) {
            const fetchServices = async () => {
                const servicesList = await findAllServicesOnUtilajId(rowData?.id);
                if (servicesList && servicesList.length > 0) {
                    setServices(servicesList);
                }
            };

            fetchServices();
        }
    }, []);

    useEffect(() => {
        handleChange('service', selectedService);
    }, [selectedService]);

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

        if(!formData.service && !formData.detaliiLucrariEfectuate) {
            Alert.alert('Eroare', 'Trebuie sa scrieti macar detalile lucrarilor efectuate sau sa selectati un service!');
            return;
        }

        Alert.alert('Succes', JSON.stringify(formData, null, 2));
    };

    // ✅ Verificăm dacă butonul trebuie să fie activ sau nu
    const isButtonDisabled = !formData.index || !formData.data;

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
                {/* <View>
                    <Text style={styles.modalText}>Index: {rowData?.index}</Text>
                    <Text style={styles.modalText}>Service: {rowData?.service}</Text>
                </View> */}

                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Button onPress={onDismiss} style={styles.closeButton}>X</Button>
                        <Divider />

                        <Text style={styles.modalSubtitle}>Utilaj: {utilajId}</Text>

                        {/* Câmp Index */}
                        <TextInput
                            label="Index*"
                            mode="outlined"
                            value={formData.index}
                            onChangeText={(text) => handleChange('index', text)}
                            style={styles.input}
                        />

                        {/* 🔥 Date Picker - modificat pentru a fi clicabil */}
                        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                            <TextInput
                                label="Data*"
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
                            <List.Accordion title="Revizie">
                                {Object.keys(formData.rev).map((key) => (
                                    <View style={styles.checkboxContainer} key={key}>
                                        <Checkbox
                                            status={formData.rev[key as keyof typeof formData.rev] ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange('rev', key)}
                                        />
                                        <Text>{key.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, char => char.toUpperCase())}</Text>
                                    </View>
                                ))}
                            </List.Accordion>

                            <List.Accordion title="Revizie 1 +">
                                {Object.keys(formData.rev1).map((key) => (
                                    <View style={styles.checkboxContainer} key={key}>
                                        <Checkbox
                                            status={formData.rev1[key as keyof typeof formData.rev1] ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange('rev1', key)}
                                        />
                                        <Text>{key.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, char => char.toUpperCase())}</Text>
                                    </View>
                                ))}
                            </List.Accordion>

                            <List.Accordion title="Revizie 2 +">
                                {Object.keys(formData.rev2).map((key) => (
                                    <View style={styles.checkboxContainer} key={key}>
                                        <Checkbox
                                            status={formData.rev2[key as keyof typeof formData.rev2] ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange('rev2', key)}
                                        />
                                        <Text>{key.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, char => char.toUpperCase())}</Text>
                                    </View>
                                ))}
                            </List.Accordion>
                        </List.Section>

                        <Divider />

                        <View style={styles.pickerContainer}>
                            <Text style={styles.labelText}>Service</Text>

                            {services.length > 0 ? (
                                <Picker
                                    selectedValue={selectedService}
                                    onValueChange={(itemValue) => handleChange('service', itemValue)}
                                >
                                    {services.map((service, index) => (
                                        <Picker.Item key={index} label={service.titlu} value={service} />
                                    ))}
                                </Picker>
                            ) : (
                                <Text>Nu exista servicii disponibile</Text>
                            )}
                        </View>

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
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        //alignItems: 'center' as 'center',
        width: '100%',
    },
    closeButton: {
        alignSelf: 'flex-end' as 'flex-end',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
    },
    modalSubtitle: {
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 10,
    },
    container: {
       // flex: 1,
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
    labelText: {
        fontSize: 16,
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
       // marginTop: 10,
        margin: 10,
    },
    pickerContainer: {
        margin: 10,
    },
});

export default AdaugaServiciuModal;
