import {
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Text,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const SocialLinks = () => {
  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/company/xperimentvc/');
  };

  const handleTwitterPress = () => {
    Linking.openURL('https://twitter.com/XperimentVC');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://www.xperiment.co/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.followText}>Follow Us</Text>
      <View style={styles.links}>
        <TouchableOpacity
          onPress={handleLinkedInPress}
          style={styles.iconContainer}
        >
          <FontAwesome name='linkedin-square' size={32} color='white' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTwitterPress}
          style={styles.iconContainer}
        >
          <FontAwesome name='twitter-square' size={32} color='white' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleWebsitePress}
          style={styles.iconContainer}
        >
          <FontAwesome5 name='globe' size={32} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialLinks;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  followText: {
    fontSize: 14,
    color: 'white',
    marginTop: 40,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  iconContainer: {
    marginHorizontal: 15,
  },
});
