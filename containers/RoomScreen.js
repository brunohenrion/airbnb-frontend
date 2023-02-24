import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import Swiper from "react-native-swiper";
// import SwiperFlatList from "react-native-swiper-flatlist";

export default function RoomScreen() {
  const route = useRoute();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${route.params.id}`
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const generateStars = (ratingValue) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < data.ratingValue) {
        const newStar = (
          <Foundation key={i} name="star" size={24} color="#ffb100" />
        );
        stars.push(newStar);
      } else {
        const newStar = (
          <Foundation key={i} name="star" size={24} color="grey" />
        );
        stars.push(newStar);
      }
    }
    return stars;
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <View style={{ height: 400 }}>
        <Swiper
          style={styles.wrapper}
          dotColor="salmon"
          activeDotColor="red"
          autoplay
          autoplayDelay={1}
        >
          {data.photos.map((slide, index) => {
            return (
              <View key={index} style={{ height: 700 }}>
                <Image
                  source={{ uri: slide.url }}
                  style={{ height: "50%", width: "100%" }}
                />

                <Text style={styles.prices}>{data.price} €</Text>
              </View>
            );
          })}
        </Swiper>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.bottomPart}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <View style={styles.reviews}>
            <Text>{generateStars(data.ratingValue)}</Text>
            <Text>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.avatar}
        />
      </View>

      <Text numberOfLines={3} style={styles.description}>
        {data.description}
      </Text>
      <View style={styles.mapsContainer}>
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: data.location[1],
            longitude: data.location[0],
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
            title={data.title}
            description={data.description}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  avatar: { width: 80, borderRadius: 50, height: 80, marginLeft: 10 },
  prices: {
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    width: 90,
    bottom: 70,
    padding: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    marginTop: 10,
  },
  reviews: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  title: { fontSize: 22 },
  bottomPart: { width: "75%" },
  description: { fontSize: 19, padding: 5 },
  mapsContainer: { marginTop: 10, height: 300 },
  map: {
    width: "100%",
    height: "100%",
  },
});
