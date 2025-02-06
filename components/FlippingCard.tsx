import { useEffect, useRef, useState } from 'react';
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
  const xAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const animation = {
    frontAnimatedStyle: {
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
          })
        },
        {
          perspective: 1000
        }
      ]
    },
    backAnimatedStyle: {
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '360deg']
          })
        },
        {
          perspective: 1000
        }
      ]
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.cardContainer,
          styles.boxShadow,
          {
            transform: [
              {
                translateX: xAnimation.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [-100, 0],
                  extrapolate: 'clamp'
                })
              }
            ]
          }
        ]}
      >
        <TouchableWithoutFeedback onPress={flipCard}>
          <View style={StyleSheet.absoluteFillObject}>
            <LinearGradient
              colors={['#22c55e', '#15803d']}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Animated.View
              style={[styles.card, styles.front, animation.frontAnimatedStyle]}
            >
              <View style={styles.flagContainer}>
                <Text style={styles.flagText}>🇬🇧</Text>
              </View>
              <Text className="font-PoppinsBold text-center text-3xl text-white">
                {translatedWord}
              </Text>
              <View style={styles.iconContainer}>
                <Ionicons name="language-outline" size={24} color="white" />
              </View>
            </Animated.View>
            <Animated.View
              style={[styles.card, styles.back, animation.backAnimatedStyle]}
            >
              <View style={styles.flagContainer}>
                <Text style={styles.flagText}>🇵🇱</Text>
              </View>
              <Text className="font-PoppinsBold text-center text-3xl text-white">
                {word ? word : 'Loading...'}
              </Text>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="swap-horizontal-outline"
                  size={20}
                  color="white"
                />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  cardContainer: {
    width: width - 50,
    height: height / 5,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: 20,
    overflow: 'hidden'
  },
  front: {
    backgroundColor: 'transparent'
  },
  back: {
    backgroundColor: 'transparent'
  },
  flagContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 10
  },
  flagText: {
    fontSize: 20
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 10
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10
  }
});

export default FlippingCard;
