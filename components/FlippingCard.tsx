import { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface FlippingCard {
  word: string;
  translatedWord?: string;
}

const FlippingCard = ({ word, translatedWord }: FlippingCard) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [
      { rotateY: frontInterpolate },
      { perspective: 1000 }, 
    ],
  };

  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate },
      { perspective: 1000 }, 
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.cardWrapper}>
          {/* Przód karty */}
          <Animated.View
            style={[styles.cardContainer, styles.boxShadow, frontAnimatedStyle]}
          >
            <LinearGradient
              colors={['#22c55e', '#15803d']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.flagContainer}>
                <Text style={styles.flagText}>🇬🇧</Text>
              </View>
              <Text style={styles.text}>{translatedWord}</Text>
              <View style={styles.iconContainer}>
                <Ionicons name="language-outline" size={24} color="white" />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Tył karty */}
          <Animated.View
            style={[styles.cardContainer, styles.boxShadow, styles.back, backAnimatedStyle]}
          >
            <LinearGradient
              colors={['#22c55e', '#15803d']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.flagContainer}>
                <Text style={styles.flagText}>🇵🇱</Text>
              </View>
              <Text style={styles.text}>{word ? word : 'Loading...'}</Text>
              <View style={styles.iconContainer}>
                <Ionicons name="swap-horizontal-outline" size={20} color="white" />
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  cardWrapper: {
    width: width - 50,
    height: height / 5,
    position: 'relative',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    transform: [{ rotateY: '180deg' }],
  },
  flagContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 10,
  },
  flagText: {
    fontSize: 20,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 10,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
});

export default FlippingCard;