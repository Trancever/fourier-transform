import React from "react";
import { View, Text } from "@react-slate/core";
import { KeyPress } from "@react-slate/interactive";

import Header from "./Header";
import Transform from "./Transform";
import Info from "./Info";
import SamplesPicker from "./SamplesPicker";

import generator from "./signalGenerator";
import { descreteFourierTransform } from "./fourierTransform";

const READY_STATUS =
  "Gotowy do obliczeń. Wciśnij 1 aby wykonać zwykłą transformatę, 2 aby wykonać szybką transformatę lub 3 aby wyjść.";
const BUSY_STATUS = "W trakcie obliczeń.";

export default class App extends React.Component {
  state = {
    normalProgress: 0,
    fastProgress: 0,
    normalTime: 0,
    fastTime: 0,
    info: READY_STATUS,
    normalInProgress: false,
    fastInProgress: false,
    samples: 4
  };

  signal = null;

  componentDidMount() {
    this.signal = generator(Math.pow(2, this.state.samples), 50);
  }

  _onPress = (char, key) => {
    if (char === "1") {
      this.setState({ info: BUSY_STATUS, normalInProgress: true });
      const startTime = new Date();
      descreteFourierTransform(this.signal, Math.pow(2, this.state.samples), progress => {
        this.setState({
          normalProgress: progress,
          normalInProgress: progress === 1 ? false : true,
          info: progress === 1 ? READY_STATUS : BUSY_STATUS,
        });
      });
      const finishTime = new Date();
      this.setState({ normalTime: (finishTime - startTime) / 1000 });
    } else if (char === "2") {
      this.setState({ info: BUSY_STATUS, fastInProgress: true });
    } else if (char === "3") {
      process.exit(0);
    } else if (key.name === "up") {
      this.setState(({ samples }) => ({
        samples: samples === 10 ? 10 : samples + 1
      }), () => {
        this.signal = generator(Math.pow(2, this.state.samples), 50);
      });
    } else if (key.name === "down") {
      this.setState(({ samples }) => ({
        samples: samples === 1 ? 1 : samples - 1
      }), () => {
        this.signal = generator(Math.pow(2, this.state.samples), 50);
      });
    }
  };

  render() {
    const {
      normalProgress,
      fastProgress,
      normalTime,
      fastTime,
      info,
      normalInProgress,
      fastInProgress,
      samples
    } = this.state;
    return (
      <View style={{ marginLeft: "1" }}>
        <Header />
        <Info info={info} />
        <SamplesPicker samples={Math.pow(2, samples)} />
        <Transform
          type="Zwykła transformata fouriera"
          value={normalProgress}
          time={normalTime}
          inProgress={normalInProgress}
        />
        <Transform
          type="Szybka transformata fouriera"
          value={fastProgress}
          time={fastTime}
          inProgress={fastInProgress}
        />
        <KeyPress stream={process.stdin} onPress={this._onPress} />
      </View>
    );
  }
}
