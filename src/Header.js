import React from "react";
import { View, Text } from "@react-slate/core";

export default class Header extends React.Component {
  render() {
    return (
      <View style={{ borderStyle: "solid", borderColor: "red" }}>
        <Text
          style={{
            color: "red",
            fontWeight: "bold"
          }}
        >
          Cyfrowe przetwarzanie sygnału, zadanie 4 - Dawid Urbaniak
        </Text>
      </View>
    );
  }
}
