import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";


function Memory_post({ post }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {post.description}
      </Text>
      {post.image ? (<Image
        style={styles.img}
        source={{
          uri: post.image,
        }}
      />): null}
      
      <View style={styles.members_column}>
        <View style={styles.members_row}>
          <Image
            style={styles.img_members}
            source={{
              uri: post.creator.photo,
            }}
          />
          <Text style={styles.name}>{post.creator.username}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: 342,
  },
  text: {
    width: 342,
    fontSize: 16,
    marginBottom: 24,
  },
  members_row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 16,
  },

  img: {
    width: 342,
    height: 219,
    borderRadius: 16,
    marginBottom: 24,
  },

  img_members: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    marginTop: 12,
  },
});

export default Memory_post;
