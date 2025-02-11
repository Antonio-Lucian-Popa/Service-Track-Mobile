/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import DocumentScanner from 'react-native-document-scanner-plugin';
// import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
// import RNFS from 'react-native-fs';

const DocumentScannerScreen = () => {
  const [scannedImages, setScannedImages] = useState<string[]>([]);
  // const [pdfPath, setPdfPath] = useState<string | null>(null);

  // 🔹 Funcție pentru scanarea documentelor
  const handleScanDocument = async () => {
    const { scannedImages: newScannedImages } = await DocumentScanner.scanDocument();
    if (newScannedImages && newScannedImages.length > 0) {
      setScannedImages(newScannedImages);
      Alert.alert('Succes', 'Scanare completă!');
    } else {
      Alert.alert('Eroare', 'Nicio imagine scanată.');
    }
  };

  // 🔹 Funcție pentru eliminarea unei imagini scanate
  const handleRemoveImage = (index: number) => {
    setScannedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 🔹 Funcție pentru crearea PDF-ului
  // const generatePDF = async () => {
  //   if (scannedImages.length === 0) {
  //     Alert.alert('Eroare', 'Nu există imagini scanate!');
  //     return;
  //   }

  //   try {
  //     const newPdfPath = `${RNFS.DocumentDirectoryPath}/document-scanned.pdf`;

  //     // 🔹 Creăm o pagină PDF pentru fiecare imagine scanată
  //     const pages = scannedImages.map((image) =>
  //       PDFPage.create()
  //         .setMediaBox(612, 792) // Dimensiunea paginii (A4)
  //         .drawImage(image, {
  //           x: 5,
  //           y: 5,
  //           width: 600,
  //           height: 780,
  //         })
  //     );

  //     // 🔹 Creăm documentul PDF
  //     const pdfDoc = PDFDocument.create(newPdfPath).addPages(pages);
  //     await pdfDoc.write();

  //     setPdfPath(newPdfPath);
  //     Alert.alert('Succes', 'PDF generat!', [{ text: `Salvat la: ${newPdfPath}` }]);
  //   } catch (error) {
  //     console.error('Eroare la generarea PDF-ului:', error);
  //     Alert.alert('Eroare', 'Nu s-a putut genera PDF-ul.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button mode="contained" onPress={handleScanDocument} style={styles.button}>
          Scanare Document
        </Button>
      </View>

      {/* 🔹 Lista imaginilor scanate */}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {scannedImages.map((imageUri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: imageUri }} style={styles.scannedImage} />
            <IconButton
              icon="delete"
              size={24}
              onPress={() => handleRemoveImage(index)}
              style={styles.removeButton}
              iconColor="red"
            />
          </View>
        ))}
      </ScrollView>

      {/* <Button mode="contained" onPress={generatePDF} style={styles.button} disabled={scannedImages.length === 0}>
          Generează PDF
        </Button> */}


      {/* {pdfPath && <Button mode="contained" onPress={() => Alert.alert('Locație PDF', pdfPath)}>Vezi Locație PDF</Button>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribuie spațial butoanele
    width: '90%', // Ocupă aproape tot ecranul
    marginTop: 10,
  },
  button: {
    flex: 1, // Face butoanele să se întindă egal
    marginHorizontal: 5, // Adaugă spațiu între ele
  },
  imageContainer: {
    marginTop: 20,
    flexDirection: 'row', // 🔥 Poze pe același rând
    flexWrap: 'wrap', // 🔥 Permite trecerea pe rând nou dacă ecranul e mic
    justifyContent: 'center', // 🔹 Centrează pozele
    paddingBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
  },
  scannedImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default DocumentScannerScreen;
