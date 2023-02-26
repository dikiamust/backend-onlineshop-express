import app from "./app";
import {socketInit} from './utils/socket_io'

const PORT: number = parseInt(process.env.PORT) || 2200;
const mainServer = app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});

// socketInit(mainServer)
