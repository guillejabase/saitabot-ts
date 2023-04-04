import Client from "./classes/Client";
import config from "./assets/config.json";

new Client().login(config.token);