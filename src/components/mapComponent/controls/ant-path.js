import { antPath } from "leaflet-ant-path";

export const antPathPlugin = () => {
  return antPath(
    [
      [10.490869, -75.12587],
      [10.494624, -75.128065],
      [10.495528, -75.128231],
      [10.498345, -75.126943],
    ],
    {
      delay: 800,
      dashArray: [10, 20],
      weight: 5,
      color: "#0000FF",
      pulseColor: "#FFFFFF",
      paused: false,
      reverse: false,
      hardwareAccelerated: true,
    }
  );
};
