import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Folosim contextul de autentificare

  const handleLogin = async () => {
    if (loading) return; // ✅ Prevenim apeluri multiple
  
    if (!username.trim() || !password.trim()) {
      Alert.alert('Eroare', 'Introdu un username și o parolă!');
      return;
    }
  
    console.log('Trimitem request cu:', { username, password });
  
    setLoading(true);
    try {
      await login(username, password); // ✅ Trimitem doar username și password
    } catch (error) {
      Alert.alert('Eroare', 'Autentificare eșuată');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Bine ai venit</Text>
        <Text style={styles.subtitle}>Autentifică-te pentru a continua</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Parolă"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} disabled={loading} />
        </View>

        {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  loginBox: { width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, textAlign: 'center', color: 'gray', marginBottom: 20 },
  input: { height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  buttonContainer: { marginTop: 10 },
  loading: { marginTop: 10 },
});

export default LoginScreen;
