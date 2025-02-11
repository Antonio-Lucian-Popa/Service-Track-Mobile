import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { List, Avatar, Divider, Button } from 'react-native-paper';

// Simulăm datele utilizatorului
const user = {
  username: 'antoniolucian',
  marca: '12345',
};

const appVersion = '1.0.0'; // Versiunea aplicației

const SettingsScreen: React.FC = () => {

  const handleLogout = () => {
    Alert.alert(
      'Deconectare',
      'Ești sigur că vrei să te deconectezi?',
      [
        { text: 'Anulează', style: 'cancel' },
        { text: 'Logout', onPress: () => console.log('User logged out') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Profilul utilizatorului */}
      <View style={styles.profileContainer}>
        <Avatar.Text size={60} label={user.username.charAt(0).toUpperCase()} />
        <List.Item
          title={user.username}
          description={`Marca: ${user.marca}`}
          titleStyle={styles.username}
          descriptionStyle={styles.marca}
          left={() => null}
        />
      </View>

      <Divider />

      {/* Setări */}
      <List.Section style={styles.listContainer}>
        <List.Item
          title="Versiunea aplicației"
          description={appVersion}
          left={() => <List.Icon icon="information-outline" />}
        />
      </List.Section>

      <Divider />

      {/* Buton de Logout */}
      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          buttonColor="#d9534f"
          textColor="#ffffff"
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  marca: {
    fontSize: 14,
    color: 'gray',
  },
  logoutContainer: {
    margin: 20,
    marginTop: 'auto',
  },
  listContainer: {
    paddingLeft: 10,
  }
});

export default SettingsScreen;
