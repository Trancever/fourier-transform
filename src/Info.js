import React from "react";
import { View, Text } from "@react-slate/core";

export default class Info extends React.Component {
  render() {
    const { info } = this.props;
    return (
      <View style={{ marginTop: "1", marginBottom: "1" }}>
        <Text
          style={{
            display: "inline",
            backgroundColor: "#70e3ff",
            color: "black",
            padding: "0 1 0 1",
            marginRight: "1"
          }}
        >
          INFO
        </Text>
        <Text style={{ display: "inline", color: "#70e3ff" }}>{info}</Text>
      </View>
    );
  }
}
