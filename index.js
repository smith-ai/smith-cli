const readline = require('readline');
const WebSocket = require('ws');

// Create a new WebSocket isntance for talking to smith-api
const ws = new WebSocket('ws://localhost:3500/api/invoke');

/**
 * smith-cli is a command line tool that will infinitely
 * listen for user commands until instructed to exit, so
 * it makes use of the readline console interface for
 * reading and writing to and from the console.
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Write the given string to console output
 * 
 * @param {string} output Message to output
 */
const write = (output) => {
    rl.write(`${output}\n`);
};

/**
 * Start an infinite loop that will listen for user
 * input and invoke smith-api with the given command,
 * this loop will only exit if instructed to or forced
 * via the command line.
 */
const listen = () => {
    // Provide a prompt to the user, prefixed with > 
    rl.question('> ', async (input) => {
        // Exit application if given this closing command
        if (input.toLowerCase() === 'thanks mr smith') {
            write('Goodbye');
    
            return rl.close();
        }
    
        // Invoke smith-api with the given input command
        await ws.send(input.toLowerCase());
    });
};

// Start listening when WebSocket connection has opened
ws.on('open', () => {
    write('Hello');

    listen();
});

// Write any WebSocket output
ws.on('message', (msg) => {
    const result = JSON.parse(msg);

    write(result.message);

    // If the command invocation is complete, start listening again for another
    if (result.complete) {
        listen();
    }
});