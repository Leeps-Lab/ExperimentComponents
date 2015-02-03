Redwood.factory("ConfigManager", function() {
    return {
        load: function(rs, defaults) {
            var config = {};

            for (var key in defaults) {
                config[key] = defaults[key];
            }

            for (var key in rs.config) {
                config[key] = rs.config[key]
            }
            
            return config;
        }
    }
});