import React from "react";
import { View, Text, Button } from "react-native";

function MyRecipe({ navigation }) {
  return (
    <View>
      <Text>This is MyRecipe screen !</Text>
      <Button title="๋ก๊ทธ์์" onPress={() => navigation.replace("Auth")} />
    </View>
  );
}

export default MyRecipe;
