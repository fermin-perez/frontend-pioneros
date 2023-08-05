import { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuthStore } from '../hooks/useAuthStore';
import Logo from '../components/Logo';
import SocialLinks from '../components/SocialLinks';
import Loader from '../components/Loader';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const { status, startLogin, errorMessage } = useAuthStore();

  const handleSignIn = () => {
    if (validateFields()) {
      startLogin({ email, password });
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Alert.alert('Error', errorMessage);
    }
  }, [errorMessage]);

  const validateFields = () => {
    let valid = true;

    if (email.trim() === '') {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError(null);
    }

    if (password === '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  };

  if (status === 'checking') {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.header}>Login Here</Text>
      <TextInput
        style={[styles.input, emailError && styles.inputError]}
        placeholder='Email'
        placeholderTextColor='#999'
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType='email-address'
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        placeholder='Password'
        placeholderTextColor='#999'
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.createAccount}>
          Don't have an account? Create one
        </Text>
      </TouchableOpacity>
      <SocialLinks />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#6184ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 20,
    width: 200,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  input: {
    width: 300,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#6184ff',
    borderRadius: 5,
    color: 'white',
    backgroundColor: '#333',
    padding: 10,
  },
  createAccount: { color: '#6184ff', fontSize: 16 },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    margin: 5,
  },
});
