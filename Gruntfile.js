module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        watch: {
            scripts: {
                files: ["src/*.js"],
                tasks: ["browserify"]
            },
        },
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                },
                debug: true,
                transform: [["babelify", { "presets": ["es2015"] }]],
            },
            app: {
                expand: true,
                src: ["src/*.js"],
                dest: "dist/",
                flatten: true,
            }
        },
    });
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('esTask', ['browserify']);
};