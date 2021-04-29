const EventEmitter = require('events');
const time = process.argv;

class Handler {
    static timer(element) {
        let intervalId = setInterval(() => {
            console.log(`Timer ${element.numberTimer}: ${element.time}`);
            element.time--;
            if (element.time < 0) {
                clearInterval(intervalId);
                console.log(`Timer ${element.numberTimer} stop!`);
            }
        },
            1000
        );
    }
}

class MyEmitter extends EventEmitter { };

const emitterObject = new MyEmitter();

emitterObject.on('timer', Handler.timer);

function run(element) {
    emitterObject.emit('timer', element);
};

for (let i = 2; i < time.length; i++) {
    const element = {
        'time': +time[i],
        'numberTimer': i - 2
    };

    run(element);
}