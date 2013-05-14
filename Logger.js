var Logger = {
    logName: 'xnovaLogs',
    log: function(message/*, section*/) {
        //section = section || 'debug';
        var now = new Date();

        var textDate = now.getDate() + '.' + now.getMonth() + '.' + now.getFullYear() +
            ' ' + now.toLocaleTimeString();
        var logMsg = '[' + textDate + '] ' + message;

        console.log(logMsg);
        this.saveLog(logMsg);
    },
    saveLog: function(message) {
        var logs = localStorage.getItem(this.logName) || '';
        logs = logs + "\n" + message;
        localStorage.setItem(this.logName, logs);
    },
    getLogs: function() {
        var logs = localStorage.getItem(this.logName) || '';

        return logs.split("\n");
    }
};