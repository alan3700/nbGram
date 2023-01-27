import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, FlatList, StyleSheet, Button, View, Text,Pressable } from "react-native";

export default function NbaTeam() {
  const [Team, setTeam] = useState([]);
  useEffect(() => {
    (async () => {
      const filesUrl = await axios.get(
        "https://www.balldontlie.io/api/v1/teams"
      );
      setTeam(filesUrl.data);
    })();
  }, []);
  return (
    <>
    <Text style={styles.text}>
        Toutes les équipes NBA
    </Text>
    <FlatList
      data={Team.data}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <>
            <View style={styles.card} >
                <Text>
                    {itemData.item.full_name}
                </Text>
                <Pressable onPress={(e)=>{
                    e.preventDefault();
                    console.log(itemData.item.id-1)
                }}>
                    <Text>+</Text>
                </Pressable>
            </View>
          </>
        );
      }}
    />
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: 500,
  },
  card:{
    padding:20,
    margin:20,
    flexDirection:'row',
    justifyContent:'space-between',
    borderWidth: 1,
  },
  text:{
    textAlign:'center'
  }
});
