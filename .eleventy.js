const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",
        outputDir: "./assets/images/",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

    eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
        postcss([tailwindcss(require('./tailwind.config.js')), 
                 autoprefixer()])
                .process(cssCode, { from: undefined })
                .then (
                    (r) => done(null, r.css),
                    (e) => done(e, null)
            );                                      
    });

    eleventyConfig.addPassthroughCopy("src/assets/pdf");

    eleventyConfig.addWatchTarget('styles/**/*.css');
    
    eleventyConfig.addCollection("projects", function(collectionApi) {
        return collectionApi.getFilteredByTag("project");
    });

    eleventyConfig.addCollection("paginatedPosts", function(collectionApi) {
        return collectionApi.getFilteredByTag("post").reverse();
    });   
    eleventyConfig.addCollection("postsWithNav", function(collectionApi) {
        const posts = collectionApi.getFilteredByTag("post").reverse(); // Reverse if posts are sorted by date
        
        // Loop through each post and add `previousPost` and `nextPost` references
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            post.data.previousPost = posts[i - 1] || null; // Previous post or null if first
            post.data.nextPost = posts[i + 1] || null; // Next post or null if last
        }
        return posts;
    });
    return {
        dir: {
            input: "./src",
            output: "_site"
        }
    };
};
