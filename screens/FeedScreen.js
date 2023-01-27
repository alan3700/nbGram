import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, FlatList, StyleSheet, Button } from "react-native";

export default function FeedScreen() {
  const [serverImagesUrls, setServerImagesUrls] = useState([]);
  
  useEffect(() => {
    (async () => {
      const filesUrl = await axios.get(
        "https://wildstagram.nausicaa.wilders.dev/list"
      );
      console.log("filesurls", filesUrl.data);
      setServerImagesUrls(filesUrl.data);
    })();
  }, []);

  return serverImagesUrls.length > 0 ? (
    <FlatList
      numColumns={3}
      style={styles.flat}
      data={serverImagesUrls}
      keyExtractor={(serverImageURI) => serverImageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <>
            <Image
            onProgress={()=>console.log(itemData)}
              style={styles.image}
              source={{
                uri:
                  "https://wildstagram.nausicaa.wilders.dev/files/" +
                  itemData.item,
              }}
            />
          </>
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    margin:1,
    height: 120,
    width:120
  },
  flat:{
    flex:1,
    marginStart :10
  }
});
