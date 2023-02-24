import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

// import SwiperFlatList from "react-native-swiper-flatlist";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
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

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
          if (i < item.ratingValue) {
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
        return (
          <View>
            {/* <SwiperFlatList
                style={styles.wrapper}
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={2}
                showPagination
                data={item.photos}
                renderItem={(item) => {
                  console.log(item);
                  return (
                    <View>
                      <ImageBackground
                        source={{ uri: item.url }}
                        style={styles.img}
                        resizeMode={"cover"}
                      />
                    </View>
                  );
                }}
              /> */}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              <Image
                source={{ uri: item.photos[0].url }}
                style={styles.img}
                resizeMode={"cover"}
              />
            </TouchableOpacity>

            <View style={{ position: "absolute" }}>
              <Text
                style={{
                  width: 60,
                  height: 30,
                  backgroundColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 240,
                  marginLeft: 10,
                  paddingTop: 2,
                  paddingLeft: 6,
                  color: "white",
                  fontSize: 18,
                }}
              >
                {item.price} €
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 10,
                marginBottom: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text>{item.title}</Text>

                <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                  <Text>{stars} </Text>
                  <Text style={{ color: "lightgrey", marginTop: 3 }}>
                    {item.reviews} reviews
                  </Text>
                </View>
              </View>
              <View>
                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.avatar}
                />
              </View>
            </View>

            <Text numberOfLines={3} style={{ width: 330, marginBottom: 20 }}>
              {item.description}
            </Text>
          </View>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 300,
    flex: 1,
    justifyContent: "flex-end",
  },
  avatar: { width: 50, height: 50, marginRight: 25, borderRadius: 50 },
  wrapper: {
    height: 300,
  },
});
