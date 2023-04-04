import Event from "../../classes/Event";

export default new Event({
    name: "ready",

    run: (client1, client2) => {
        console.log(`${client1.user.username} online.`);

        client1.application.fetch();
        client1.application.commands.set(client1.commands.map((command) => command.data));
    },
});