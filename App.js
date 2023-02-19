import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import profileimg from "./assets/profile.png";
import homeimg from "./assets/photo.jpg";

import Home from "./assets/home.png";
import Notification from "./assets/bell.png";
import Search from "./assets/search.png";
import Settings from "./assets/settings.png";
import Logout from "./assets/logout.png";
import menu from "./assets/menu.png";
import close from "./assets/close.png";

export default function App() {
  const [currentTab, setCurrentTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" translucent backgroundColor="#5359D1" />
      <View style={styles.profileContainer}>
        <Image source={profileimg} style={styles.profileImg} />
        <Text style={styles.userNameText}>jena ezarik</Text>
        <TouchableOpacity>
          <Text style={styles.profileText}>View Profile</Text>
        </TouchableOpacity>
        <View style={{ flexGrow: 1 }}>
          {Buttons(currentTab, setCurrentTab, "Home", Home)}
          {Buttons(currentTab, setCurrentTab, "Search", Search)}
          {Buttons(currentTab, setCurrentTab, "Notification", Notification)}
          {Buttons(currentTab, setCurrentTab, "Settings", Settings)}
        </View>
        <View>{Buttons(currentTab, setCurrentTab, "Logout", Logout)}</View>
      </View>
      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: "#fff",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(offsetValue, {
                toValue: showMenu ? 1 : 228,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(closeButtonOffset, {
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
              setShowMenu(!showMenu);
            }}
          >
            <Image
              source={showMenu ? close : menu}
              style={{
                width: 20,
                height: 20,
                tintColor: "black",
                marginTop: 40,
              }}
            />
          </TouchableOpacity>
        </Animated.View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            paddingTop: 20,
          }}
        >
          {currentTab}{" "}
        </Text>
        <Image
          source={homeimg}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 15,
            marginTop: 20,
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const Buttons = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title == "Logout") {
        } else {
          setCurrentTab(title);
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == title ? "#fff" : "transparent",
          paddingLeft: 30,
          paddingRight: 50,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: currentTab == title ? "#535901" : "#fff",
          }}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: currentTab == title ? "#535901" : "#fff",
            paddingLeft: 15,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5359D1",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  profileContainer: {
    justifyContent: "flex-start",
    padding: 20,
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginTop: 8,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  profileText: {
    marginTop: 6,
    color: "#fff",
  },
  homeContainer: {},
  homeImage: {},
  homeText: {},
});
