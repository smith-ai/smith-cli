const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const write = (output) => {
    rl.write(`${output}\n`);
};

const listen = () => {
    rl.question('> ', async (input) => {
        if (input.toLowerCase() === 'thanks mr smith') {
            write('Goodbye');
    
            return rl.close();
        }
    
        const result = await axios.post('http://localhost:3500/api/invoke', {
            command: input.toLowerCase(),
        });
    
        write(result.data);

        listen();
    });
};

write('Hello');

listen();