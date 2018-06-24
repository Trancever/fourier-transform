import React from "react";
import { View, Text } from "@react-slate/core";
import { ProgressBar } from "@react-slate/components";

export default class Transform extends React.Component {
  render() {
    const { type, value, time, inProgress } = this.props;
    return (
      <View>
        <Text style={{ display: "inline", marginRight: "1" }}>{type}</Text>
        <ProgressBar
          value={value}
          barWidth={50}
          chars={{
            bar: { char: "#" },
            fill: { char: "-" },
            open: { style: { color: "blue" } },
            close: { style: { color: "blue" } }
          }}
          style={{
            display: "inline",
            marginRight: "1",
            color: inProgress ? "#56ff61" : value === 1 ? "yellow" : "#ffffff"
          }}
        />
        <Text style={{ display: "inline", marginRight: "1" }}>{`${value *
          100}%`}</Text>
        <Text style={{ display: "inline" }}>{`${time}s`}</Text>
      </View>
    );
  }
}
