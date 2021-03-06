const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

io.on('connection',function(socket) {
    console.log('a new socket connected');
});

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname + '/index.html');
});

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const mySerial = new SerialPort('COM5',{
baudRate:9600
});

mySerial.on('open',function(){
    console.log('Opened Serial Port');
});

mySerial.on('data', function(data){

    console.log(data.toString());
    io.emit('arduino:data',{
        value:data.toString()
    });
});

mySerial.on('err', function(err){
    console.log(err.message);
});

server.listen(3000,()=>{
console.log('server on port', 3000);
});