import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  FlatList
} from "react-native";
import React, {useEffect, useState}from "react";
import filter from "lodash.filter";
import { Feather, Entypo } from "@expo/vector-icons";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {useIsFocused} from "@react-navigation/native";
import {REACT_APP_API_URL} from "@env";
const API_URL = REACT_APP_API_URL;


function Friends_page(props) {
  const { navigation } = props
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [url, setUrl] = useState('/api/users/'); 
  const [friends, setFriends] = useState([])


  const handleSearch = (query) => {
    setsearchQuery(query);
    const filteredData = filter(fullData, (user) => {
      return contains(user, query);
    });
    setData(filteredData);
  };

  const HandleSubmitAccess = async(new_url) => {
    console.log(new_url)
    const response = await fetch(`${API_URL}${new_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${auth_token}`,
      },
    });
    fetchUsersData(url);
    const json = await response.json();
    console.log(json);
  }

  const HandleRemoveRequest = async(user_id) => {
    const response = await fetch(`${API_URL}/api/users/${user_id}/friend/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${auth_token}`,
      },
    });
    fetchUsersData(url);
    const json = await response.json();
    console.log(json);
  }

  const HandleDeleteFriend = async(user_id) => {
    const response = await fetch(`${API_URL}/api/friends/${user_id}/delete_friend/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${auth_token}`,
      },
    });
    fetchUsersData(url);
    const json = await response.json();
    console.log(json);
  }


  const contains = ({username, email}, query) => {
    console.log(username)
    if (username.includes(query) || email.includes(query)) {
      return true;
    }
    return false;
  }

  const HandleUrl = (url) => {
    setUrl(url)
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    fetchUsersData(url);
  }, [url, isFocused]);

  const fetchUsersData = async(url) => {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      });
      const json = await response.json();
      console.log(json)
      setData(json);
      setFullData(json);
    }
    catch (error) {
      console.log(error);
      }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_row}>
          <IconButton
            style={styles.icon_header}
            onPress={() => navigation.navigate("Profile")}
            icon={(props) => (
              <Icon name="arrow-left" {...props} color="#06648E" />
            )}
          />
          <Text style={styles.title}>Пользователи</Text>
        </View>
      </View>

      <SafeAreaView>
        <Feather
          name="search"
          size={20}
          color="#ccc"
          style={{
            marginLeft: 30,
            marginBottom: -35,
            marginTop: 16,
            zIndex: 1,
          }}
        />
        <TextInput
          placeholder="Поиск"
          clearButtonMode="always"
          style={styles.search}
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery} onChangeText={(query) => handleSearch(query)}
        />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <View  style={styles.row}>
          <Pressable style={url == '/api/friends/' ? styles.o_active_btn : styles.o_btn} onPress={() => HandleUrl('/api/friends/')}>
          <Text style={styles.txt_o_btn}>Друзья</Text>
        </Pressable>
        <Pressable style={url == '/api/users/' ? styles.o_active_btn : styles.o_btn} onPress={() => HandleUrl('/api/users/')}>
          <Text style={styles.txt_o_btn}>Все пользователи</Text>
        </Pressable>
        <Pressable style={url == '/api/friendship-requests/' ? styles.o_active_btn : styles.o_btn} onPress={() => HandleUrl('/api/friendship-requests/')}>
          <Text style={styles.txt_o_btn}>Заявки в друзья</Text>
        </Pressable>
        </View>
        
        {/* <View style={styles.zaiavki}>
          <Text style={styles.zaiavki_title}>Заявки в друзья</Text>
          <View style={styles.zaiavki_count}>
            <Text style={styles.count}>10</Text>
          </View>
        </View> */}

        <View style={styles.line}></View>
        <FlatList 
          data={data}
          кey={(item) => item}
          renderItem={({item}) => (
          <View style={styles.person}>
            <View style={styles.person_row}>
              <Image
                style={styles.photo}
                source={item.photo ? { uri: item.photo } : require('../../logo/ProfileImg.png')}
              />
              <Text style={styles.name}>{item.username ? item.username : item.from_user}</Text>
            </View>
            <View style={styles.person_row}>
            {item.from_user ? (
              <>
                <Pressable style={styles.request_btn} onPress={() => HandleSubmitAccess(`/api/friendship-requests/${item.id}/accept/`)}>
                  <Text style={styles.txt_o_btn}>Принять</Text>
                </Pressable>
                <Pressable style={styles.request_btn} onPress={() => HandleSubmitAccess(`/api/friendship-requests/${item.id}/reject/`)}>
                  <Text style={styles.txt_o_btn}>Отклонить</Text>
                </Pressable>
              </>
            ) : (
              item.is_friend === "Заявка отправлена" ? (
                <Pressable style={styles.request_btn} onPress={() => HandleRemoveRequest(item.id)}>
                  <Text style={styles.txt_o_btn}>Отменить заявку</Text>
                </Pressable>
              ) : item.is_friend === "Вы друзья" ? (
                  <IconButton
                  onPress={() => HandleDeleteFriend(item.id)}
                  style={styles.icon_person}
                  icon={(props) => (
                    <Icon name="close-circle" {...props} color="#06648E" size={24} />
                  )}
                />
              ) :  item.is_friend == "Вам отправлена заявка" ? (<Text style={styles.name}> Вам пришла заявка</Text>) : (
                  <IconButton
                  onPress={() => HandleSubmitAccess(`/api/users/${item.id}/friend/`)}
                  style={styles.icon_person}
                  icon={(props) => (
                    <Icon name="plus-circle-outline" {...props} color="#06648E" size={24} />
                  )}
                />
              )
            )}
          </View>
          </View>)}
        />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: 844,
    backgroundColor: "#F5F5F5",
  },

  row:{
    display: "flex",
    flexDirection:"row",
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginVertical: 12,
  },
  new_row:{
    flexDirection:"row",
    marginVertical: 12,
  },

  o_btn:{
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#06648E",
    borderRadius: 15,
  },
  request_btn:{
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#06648E",
    borderRadius: 15,
    margin: 1,
  },
  o_active_btn:{
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#808080",
    borderRadius: 15,
  },

  txt_o_btn:{
    color: "#fefefe"
  },

  txt_active_btn:{
    color: "#808080"
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#A3A6AA",
  },
  zaiavki_title: {
    size: 16,
    fontWeight: "400",
    color: "#333333",
  },
  zaiavki_count: {
    backgroundColor: "#06648E",
    borderRadius: 30,
    paddingHorizontal: "2%",
  },
  count: {
    color: "#fff",
    size: 18,
    alignSelf: "center",
    verticalAlign: "middle",
  },
  photo: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 50
  },
  person: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 24,
    width: 342,
    verticalAlign: "middle",
    marginTop: 22,
  },

  zaiavki: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    marginLeft: 24,
    marginVertical: 20,
  },

  person_row: {
    display: "flex",
    flexDirection: "row",
  },
  search: {
    width: 354,
    height: 42,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 16,
    marginTop: 8,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingLeft: 35,
  },

  icon: {
    width: 24,
    height: 24,
    backgroundColor: "#000",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between",
    marginLeft: 14,
    verticalAlign: "middle",
    width: 390,
    marginBottom: 0,
  },

  header_row: {
    display: "flex",
    flexDirection: "row",
  },

  icon_header: {
    width: 40,
    height: 40,
    marginRight: 111,
    marginTop: -5,
  },

  icon_person: {
    width: 40,
    height: 40,
    marginRight: -10,
  },
  name: {
    fontSize: 16,
    fontWeight: "400",
    color: "#06648E",
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#06648E",
  },
});

export default Friends_page;
