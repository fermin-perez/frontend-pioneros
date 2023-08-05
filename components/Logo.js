import { Image, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <Image source={require('../assets/images/logo.png')} style={styles.image} />
  );
};

export default Logo;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderColor: '#6184ff',
    borderWidth: 2,
    borderRadius: 100,
  },
});
