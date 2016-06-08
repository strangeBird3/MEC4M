module.exports = function(grunt) {
    //Project config
    grunt.initConfig({
        pgk: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,         
            },
            css: {
                files: ['public/css/*.css', 'public/js/*.js'],     
            },
            templates:{
                files: ['views/*.handlebars', 'views/layouts/*.handlebars'],
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'        
            },
            build: {
                src: 'src/<%= pkg.name %>.js', 
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['uglify']);
};
