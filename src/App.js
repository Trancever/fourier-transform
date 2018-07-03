import React from "react";
import { View, Text } from "@react-slate/core";
import { KeyPress } from "@react-slate/interactive";

import Header from "./Header";
import Transform from "./Transform";
import Info from "./Info";
import SamplesPicker from "./SamplesPicker";
import FrequencyPicker from "./FrequencyPicker";

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
    samples: 4,
    frequency: 50,
  };

  signal = null;

  componentDidMount() {
    this.generateSignal()
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
      }), this.generateSignal);
    } else if (key.name === "down") {
      this.setState(({ samples }) => ({
        samples: samples === 1 ? 1 : samples - 1
      }), this.generateSignal);
    } else if (key.name === "left") {
      this.setState(({ frequency }) => ({
        frequency: frequency === 10 ? 10 : frequency - 20
      }), this.generateSignal);
    } else if (key.name === "right") {
      this.setState(({ frequency }) => ({
        frequency: frequency === 250 ? 250 : frequency + 20
      }), this.generateSignal);
    }
  };

  generateSignal = () => {
    const { samples, frequency } = this.state;
    this.signal = generator(Math.pow(2, samples), frequency);
  }

  render() {
    const {
      normalProgress,
      fastProgress,
      normalTime,
      fastTime,
      info,
      normalInProgress,
      fastInProgress,
      samples,
      frequency,
    } = this.state;

    return (
      <View style={{ marginLeft: "1" }}>
        <Header />
        <Info info={info} />
        <SamplesPicker samples={Math.pow(2, samples)} />
        {/* <FrequencyPicker frequency={frequency} /> */}
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
