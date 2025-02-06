import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  PanGestureHandler,
  State,
  type PanGestureHandlerStateChangeEvent
} from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AnimatedCardFlipProps {
  englishWord: string;
  translatedWord?: string;
  example?: string;
  onSwipeLeft?: ({ nativeEvent }: { nativeEvent: any }) => void;
}

const AnimatedCardFlip = ({
  englishWord,
  translatedWord,
  example,
  onSwipeLeft
}: AnimatedCardFlipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipAnimation = useRef(new Animated.Value(0)).current;
  const xAnimation = useRef(new Animated.Value(0)).current;

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

  const handlePanStateChange = ({
    nativeEvent
  }: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -80) {
        setIsFlipped(false);
        Animated.spring(flipAnimation, {
          toValue: 0,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }).start();
        onSwipeLeft?.({ nativeEvent });
      }
      Animated.spring(xAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const frontAnimatedStyle = {
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
  };

  const backAnimatedStyle = {
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
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={Animated.event(
          [{ nativeEvent: { translationX: xAnimation } }],
          { useNativeDriver: true }
        )}
        onHandlerStateChange={handlePanStateChange}
      >
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
                style={[styles.card, styles.front, frontAnimatedStyle]}
              >
                <View style={styles.flagContainer}>
                  <Text style={styles.flagText}>🇬🇧</Text>
                </View>
                <Text className="font-PoppinsBold text-center text-5xl text-white">
                  {englishWord}
                </Text>
                <Text className="font-PoppinsMedium text-center text-lg text-white">
                  {example ? example : 'Loading...'}
                </Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="language-outline" size={24} color="white" />
                </View>
              </Animated.View>
              <Animated.View
                style={[styles.card, styles.back, backAnimatedStyle]}
              >
                <View style={styles.flagContainer}>
                  <Text style={styles.flagText}>🇵🇱</Text>
                </View>
                <Text className="font-PoppinsBold text-center text-5xl text-white">
                  {translatedWord ? translatedWord : 'Loading...'}
                </Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="swap-horizontal-outline"
                    size={24}
                    color="white"
                  />
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: width - 50,
    height: height / 2,
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
    fontSize: 30
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

export default AnimatedCardFlip;