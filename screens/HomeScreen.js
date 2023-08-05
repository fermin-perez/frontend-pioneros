import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../hooks/useAuthStore';
import Logo from '../components/Logo';
import SocialLinks from '../components/SocialLinks';
import QR from '../components/QR';

const HomeScreen = ({ navigation }) => {
  const { status, user, startLogout } = useAuthStore();

  const handleScanner = () => {
    navigation.navigate('Scanner');
  };

  const handleLogout = () => {
    startLogout();
  };

  if (status === 'checking') {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.header}>Hello {user.name} 👋</Text>

      {user.role.role == 'ADMIN_ROLE' ? (
        <TouchableOpacity onPress={handleScanner} style={styles.button}>
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      ) : (
        <QR />
      )}

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <SocialLinks />
    </View>
  );
};

export default HomeScreen;

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
});
