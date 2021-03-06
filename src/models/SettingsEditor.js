function SettingsEditor(JakeCI){
    this.JakeCI = JakeCI;
}

SettingsEditor.prototype.getAllSettings = function(params){
    this.JakeCI.fs.readFileAsync(this.JakeCI.config.settingsFile,'utf8')
        .then(function(currentSettings) {
            currentSettings = JSON.parse(currentSettings);
            params.success({data:currentSettings});
        }).catch(function(e){
        params.error(e);
    });
};

SettingsEditor.prototype.saveSettings = function(params){
    sThis = this;
    var newSettings = params.data;
    this.JakeCI.fs.readFileAsync(this.JakeCI.config.settingsFile,'utf8')
        .then(function(currentSettings) {
            currentSettings = JSON.parse(currentSettings);
            for(var key in newSettings){
                currentSettings[key] = newSettings[key].trim();
                if(currentSettings.hasOwnProperty(key) && newSettings[key] !== null && newSettings[key].trim() == ""){
                    delete currentSettings[key];
                }
            }
            return sThis.JakeCI.fs.writeFileAsync(sThis.JakeCI.config.settingsFile,JSON.stringify(currentSettings));
        })
        .then(function(){
            return sThis.JakeCI.fs.readFileAsync(sThis.JakeCI.config.settingsFile,'utf8');
        })
        .then(function(newSettings){
            //update appSettings array;
            sThis.JakeCI.appSettings = JSON.parse(newSettings);
            params.success({data:sThis.JakeCI.appSettings});
        })
        .catch(function(e){
            console.error(e);
            params.error("Failed to Save Settings");
        });
};

module.exports = SettingsEditor;