const postcss = require('postcss')
const postcssImport = require('postcss-import')
const fs = require('node:fs')
const path = require('node:path')
const autoprefixer = require('autoprefixer')
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",
        outputDir: "./assets/images/",

		// output image formats
		formats: ["webp", "jpeg"],

		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
    
    // process css before eleventy builds
    eleventyConfig.on('eleventy.before', async() => {
        const cssSrc = path.join(__dirname, 'src/styles/index.css');
        const cssDest = path.join(__dirname, '_site/styles/index.css');

        const rawCss = fs.readFileSync(cssSrc, "utf8")
        const dest = path.dirname(cssDest);

        if(!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        try {
            const result = await postcss([
                postcssImport({
                    path: 'node_nodules',
                }),
                autoprefixer(),
            ])
            .process(rawCss, {from: cssSrc, to: cssDest });

            fs.writeFileSync(cssDest, result.css);
            console.log("CSS successfully processed and written to:", cssDest);
        } catch(err) {
            console.error("Error processing CSS with PostCSS:", err);
        }
    });

    eleventyConfig.addPassthroughCopy("src/assets/pdf");

    eleventyConfig.addWatchTarget('src/styles/index.css');

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
