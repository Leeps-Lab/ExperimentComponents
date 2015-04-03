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
        },
        loadPerSubject: function(rs, defaults) {
            var config = {};

            // load experiment defaults
            for (var key in defaults) {
                config[key] = defaults[key];
            }

            // get all configs for current period
            var configs = rs.configs.filter(function(config) {
                return config.period === rs.period;
            });

            // get default config for current period
            var periodDefaultConfig = configs.filter(function(config) {
                return config.subject === "default";
            })[0];

            if (periodDefaultConfig) {
                // load period default config
                for (var key in periodDefaultConfig) {
                    config[key] = periodDefaultConfig[key];
                }
            }

            // get subject specific config
            var subjectConfig = configs.filter(function(config) {
                if (!config.hasOwnProperty("subject")) {
                    console.log("Warning: Configuration does not have a 'subject' field.")
                }
                if (config.subject instanceof Array) {
                    return config.subject.filter(function(id) {
                        return id.toString() === rs.user_id.toString();
                    }).length > 0;
                } else {
                    return config.subject.toString() === rs.user_id.toString();
                }
            })[0];

            if (subjectConfig) {
                // load subject config
                for (var key in subjectConfig) {
                    config[key] = subjectConfig[key]
                }
            }
            
            return config;
        }
    }
});