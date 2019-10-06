const readline = require('readline');
const axios = require('axios');

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
        const result = await axios.post('http://localhost:3500/api/invoke', {
            command: input.toLowerCase(),
        });
    
        write(result.data);

        listen();
    });
};

write('Hello');

listen();