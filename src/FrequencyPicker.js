import React from "react";
import { View, Text } from "@react-slate/core";

export default class FrequencyPicker extends React.Component {
  render() {
    const { frequency } = this.props;
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
          CZĘSTOTLIWOŚĆ
        </Text>
        <Text
          style={{ display: "inline", color: "#BADA55" }}
        >{`Aktualnie wybrana częstotliwość: ${frequency}. Zmień za pomocą strzałek ← →`}</Text>
      </View>
    );
  }
}
