var $ = require('jquery');
var Button = require('livefyre-bootstrap/button');
var Command = require('livefyre-bootstrap/command');
require('livefyre-bootstrap');

ShowAlertCommand = new Command(showAlert);
LogToConsoleCommand = new Command(logToConsole);
//TODO: Can we do this in bootstrap somehow?  
//(having trouble getting to correct "window" from bootstrap)
//OR bind all commands for all types in bootstrap?
Button.bindCommands(window);

function showAlert() {
	alert('Showing alert command!')
}

function logToConsole () {
        console.log('command');
}
