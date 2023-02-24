import { View, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import axios from "axios";

export default function AroundMeScreen({ navigation }) {
  const [userCoord, setUserCoord] = useState("valeur par defaut");
  const [arrayOfMarkers, setArrayOfMarkers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          // console.log(location);

          //async
          setUserCoord({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          const response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );

          setArrayOfMarkers(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    <MapView
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: userCoord.latitude,
        longitude: userCoord.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation
      style={{ width: "100%", height: "100%" }}
    >
      {arrayOfMarkers.map((data) => {
        return (
          <Marker
            key={data._id}
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
            title={data.title}
            description={data.description}
            onPress={() => {
              navigation.navigate("Room", {
                roomId: data._id,
              });
            }}
          />
        );
      })}
    </MapView>
  );
}

// import { useNavigation } from "@react-navigation/core";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   Dimensions,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import * as Location from "expo-location";

// export default function AroundMeScreen() {
//   const navigation = useNavigation();
//   const [data, setData] = useState([]);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     const getPermission = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status === "granted") {
//           const location = await Location.getCurrentPositionAsync();
//           setLatitude(location.coords.latitude);
//           setLongitude(location.coords.longitude);
//           console.log(location);
//           const response = await axios.get(
//             `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
//           );
//           setData(response.data);

//           setLoading(false);
//         } else {
//           alert("Permission refusée");
//         }
//       } catch (error) {
//         console.log(error.response);
//       }
//     };
//     getPermission();
//   }, []);
//   return isLoading ? (
//     <ActivityIndicator />
//   ) : (
//     <View style={styles.mapsContainer}>
//       <MapView
//         style={styles.map}
//         showsUserLocation
//         initialRegion={{
//           latitude: latitude,
//           longitude: longitude,
//           latitudeDelta: 0.02,
//           longitudeDelta: 0.02,
//         }}
//         provider={PROVIDER_GOOGLE}
//       >
//         {data.map((marker) => {
//           return (
//             <Marker
//               key={marker.latitude}
//               coordinate={{
//                 latitude: marker.location[1],
//                 longitude: marker.location[0],
//               }}
//               title={marker.title}
//               description={marker.description}
//               onCalloutPress={() => {
//                 navigation.navigate("Room", { id: marker._id });
//               }}
//             />
//           );
//         })}
//       </MapView>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   mapsContainer: { height: "100%", width: "100%" },
// });
