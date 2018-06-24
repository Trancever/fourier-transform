import React from "react";
import { View, Text } from "@react-slate/core";

export default class SamplesPicker extends React.Component {
  render() {
    const { samples } = this.props;
    return (
      <View style={{ marginBottom: "1" }}>
        <Text
          style={{
            display: "inline",
            backgroundColor: "#BADA55",
            color: "black",
            padding: "0 1 0 1",
            marginRight: "1"
          }}
        >
          CONFIG
        </Text>
        <Text
          style={{ display: "inline", color: "#BADA55" }}
        >{`Aktualnie wybrane: ${samples} próbki. Zmień za pomocą strzałek ↑ ↓`}</Text>
      </View>
    );
  }
}
