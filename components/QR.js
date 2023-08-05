import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';
import { useAuthStore } from '../hooks/useAuthStore';

const QR = () => {
  const { user } = useAuthStore();

  return (
    <QRCodeStyled
      data={JSON.stringify(user.active)}
      style={styles.svg}
      padding={25}
      pieceSize={8}
      pieceBorderRadius={[0, 6, 0, 6]}
      isPiecesGlued
      gradient={{
        type: 'linear',
        options: {
          start: [0, 0],
          end: [1, 1],
          colors: ['#6184ff', '#00bfff'],
          locations: [0, 1],
        },
      }}
    />
  );
};

export default QR;

const styles = StyleSheet.create({
  svg: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 20,
  },
});
