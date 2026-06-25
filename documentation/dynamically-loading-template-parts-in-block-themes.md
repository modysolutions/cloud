Title: Dynamically loading template parts in block themes
Author: Justin Tadlock
Published: June 18, 2026

---

# Dynamically loading template parts in block themes

By [Justin Tadlock](https://profiles.wordpress.org/greenshady/)

June 18, 2026

[Themes](https://developer.wordpress.org/news/category/themes/)

My team and I have been working on a music-related WordPress project. For the project,
I needed a way to display a different sidebar depending on what page the site visitor
was viewing. It’s a question that comes up from time to time from block theme authors.

In classic themes, this always felt straightforward: you just dropped your logic
for loading a different template part right in the template itself. While there
are architectural design issues with putting logic code in templates—which are largely
irrelevant for this post—it simply worked. You could call `get_sidebar()`, `get_header()`,`
get_footer()`, or `get_template_part()` and pass any variable to the functions’
parameters to get what you needed.

For block themes, you cannot do that in HTML-based templates. Even in PHP-registered
patterns, you don’t have access to most data before they are processed (patterns
are registered on `init`), so contextually loading [template parts](https://developer.wordpress.org/themes/templates/template-parts/)
won’t work.

The answer for block themes has been to use multiple top-level templates. Create
a template for this category, another one for that tag, a third for something else
entirely. It works, but it also means maintaining a growing pile of nearly identical
templates that differ only in which template part they load.

There’s a better way. WordPress lets you intercept block data before it renders
and swap out a template part’s slug on the fly—replacing a default template part
with a context-specific one. And while my use case is sidebars, the same technique
works for any template part: headers, footers, banners, comments sections, whatever
your theme needs.

This tutorial will walk you through how to build this system, starting with the
core filter and expanding into broader use cases.

Table of Contents

1. [The render_block_data filter hook](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/#the-render-block-data-filter-hook)
2. [Building the category-based sidebar](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/#building-the-category-based-sidebar)
3. [Setting up the template parts](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/#setting-up-the-template-parts)

## The `render_block_data` filter hook

The [`render_block_data`](https://developer.wordpress.org/reference/hooks/render_block_data/)
filter hook fires just before any block is rendered. It gives you the parsed block
data as an array—including the block name and its attributes—and lets you modify
that data before WordPress does anything with it.

For the Template Part block ([`core/template-part`](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-theme/core-block-template-part/)),
the most useful attribute is `slug`, which tells WordPress which template part file
to load. Change that slug, and WordPress loads a completely different template part.

Here’s the filter signature:

    ```php
    add_filter( 'render_block_data', 'themeslug_render_template_part_data' );

    function themeslug_render_template_part_data( array $parsed_block ): array 
    {
    	// Your logic here.
    	return $parsed_block;
    }
    ```

The key rule: always return `$parsed_block`, whether you’ve modified it or not.
This filter runs for every block on the page, so the first thing you’ll want to
do in any implementation is bail early for blocks you don’t care about.

## Building the category-based sidebar

Let’s walk through a concrete example. For the music project, it only needed a sidebar
on single post views, named `sidebar-post.html` (located in the  theme’s `/parts`
folder), so this is a narrow use case that we can look at.

In my theme’s `templates/single-post.html` file, the sidebar template is called
via this markup:

    ```language-markup
    <!-- wp:template-part {"slug":"sidebar-post"} /-->
    ```

Here’s what the normal template part looks like when viewing the site:

![Single blog post view from a music article. It has a title and image that spans
in a wide width across the screen, sitting above two columns. Content on the left
and a sidebar on the right (showing the latest posts and a subscription form).](
https://developer.wordpress.org/news/files/2026/06/sidebar-template-part.webp)

As shown above, it displays the latest posts and a subscription button. But for
this project, I needed single post sidebars to display different data for two additional
scenarios:

* `sidebar-post-artist-spotlight.html`: Artist Spotlight category
* `sidebar-post-album-reviews.html`: Album Reviews category

Here’s the full filter:

    ```php
    add_filter( 'render_block_data', 'themeslug_render_template_part_data' );

    function themeslug_render_template_part_data( array $parsed_block ): array 
    {
    	// Only target the Template Part block with a `sidebar-post` slug and
    	// when viewing a single post.
    	if (
    		( $parsed_block['blockName'] ?? '' ) !== 'core/template-part'
    		|| ( $parsed_block['attrs']['slug'] ?? '' ) !== 'sidebar-post'
    		|| ! is_singular( 'post' )
    	) {
    		return $parsed_block;
    	}

    	$post = get_queried_object();

    	if ( ! $post instanceof WP_Post ) {
    		return $parsed_block;
    	}

    	// Get the directory where template parts live.
    	$parts_dir = get_block_theme_folders()['wp_template_part'];

    	// Loop through the post's categories and look for a matching template part.
    	foreach ( get_the_category( $post->ID ) as $category ) {
    		$slug = "sidebar-post-{$category->slug}";

    		if ( locate_template( "{$parts_dir}/{$slug}.html" ) ) {
    			$parsed_block['attrs']['slug'] = $slug;
    			return $parsed_block;
    		}
    	}

    	// No category-specific part found; return the original unchanged.
    	return $parsed_block;
    }
    ```

There are a few things worth calling out in this code.

The early return checks at the top are important. This filter fires for every block
on every page, so you want to exit as fast as possible for anything that doesn’t
match your criteria:

* The block name is `core/template-part`.
* The slug name is `sidebar-post`.
* The user is currently viewing a singular post.
* The current queried object is a `WP_Post`.

The call to `get_block_theme_folders()['wp_template_part']` returns the directory
your theme uses for template parts—by default `parts`.

Notice that if no category-specific template part is found, the function returns`
$parsed_block` without modifying it. That means WordPress loads the original `sidebar-
post.html`—the one defined in the template itself. You get the fallback behavior
for free, without any extra logic.

The loop through `get_the_category()` also handles priority automatically. If a
post belongs to multiple categories, the categories are returned in term order.
The first matching template part file wins. If you need a different priority order,
you can sort the categories however you like before iterating.

## Setting up the template parts

For this system to work, you need the template part files in place. At minimum,
you need the default `parts/sidebar-post.html`.

Then add category-specific versions as needed:

* `parts/sidebar-post-author-spotlight.html`
* `parts/sidebar-post-album-reviews.html`

Only create the ones you actually need. If `sidebar-post-author-spotlight.html`
doesn’t exist, the loop skips it and keeps checking. This is what makes the system
resilient: you don’t have to create a template part for every possible category,
only the ones where you want something different.

My block markup for `sidebar-post.html` looks like the following, but yours should
fit your theme:

    ```language-markup
    <!-- wp:group {"style":{"layout":{"selfStretch":"fit","flexSize":null}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch"}} -->
    <div class="wp-block-group">

    	<!-- wp:group {"className":"is-style-section-3","style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"flex","orientation":"vertical"}} -->
    	<div class="wp-block-group is-style-section-3">

    		<!-- wp:heading {"level":3,"className":"is-style-text-widget-heading"} -->
    		<h3 class="wp-block-heading is-style-text-widget-heading">Latest Posts</h3>
    		<!-- /wp:heading -->

    		<!-- wp:query {"queryId":3,"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"ignore","inherit":false,"taxQuery":null,"parents":[],"format":[]},"className":"is-style-query-numbered"} -->
    		<div class="wp-block-query is-style-query-numbered">

    			<!-- wp:post-template {"style":{"spacing":{"blockGap":"var:preset|spacing|40"}},"layout":{"type":"default"}} -->

    				<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"constrained"}} -->
    				<div class="wp-block-group">

    					<!-- wp:post-title {"level":3,"isLink":true} /-->

    					<!-- wp:group {"className":"is-style-meta","style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"fontSize":"3-xs","layout":{"type":"flex","flexWrap":"nowrap"}} -->
    					<div class="wp-block-group is-style-meta has-3-xs-font-size">
    						<!-- wp:post-date {"format":"human-diff","metadata":{"bindings":{"datetime":{"source":"core/post-data","args":{"field":"date"}}}}} /-->
    					</div>
    					<!-- /wp:group -->

    				</div>
    				<!-- /wp:group -->

    			<!-- /wp:post-template -->

    		</div>
    		<!-- /wp:query -->

    	</div>
    	<!-- /wp:group -->

    	<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch"}} -->
    	<div class="wp-block-group">

    		<!-- wp:paragraph {"className":"is-style-default","style":{"typography":{"textAlign":"center"}},"fontSize":"3-xs","fontFamily":"mono"} -->
    		<p class="has-text-align-center is-style-default has-mono-font-family has-3-xs-font-size">Join 12K Subscribers</p>
    		<!-- /wp:paragraph -->

    		<!-- wp:buttons -->
    		<div class="wp-block-buttons">
    			<!-- wp:button {"width":100} -->
    			<div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link wp-element-button">Subscribe</a></div>
    			<!-- /wp:button -->
    		</div>
    		<!-- /wp:buttons -->

    	</div>
    	<!-- /wp:group -->

    </div>
    <!-- /wp:group -->
    ```

`sidebar-post-artist-spotlight.html` and `sidebar-post-album-reviews.html` could
be entirely different, showcasing whatever content you wanted.

Here’s a screenshot of the Album Reviews sidebar in action:

![Single blog post view from a music article about an album. It has a title and
image that spans in a wide width across the screen, sitting above two columns. Content
on the left and a sidebar on the right (showing an album spotlight and a subscription
form).](https://developer.wordpress.org/news/files/2026/06/sidebar-template-part-
album-review.webp)

For this case, the `sidebar-post-album-reviews.html` part is connected to a music
album that’s being reviewed. This is handled via a custom Query block variation
and post meta. To learn more about that technique, read [Building a book review grid with a Query Loop block variation](https://developer.wordpress.org/news/2022/12/building-a-book-review-grid-with-a-query-loop-block-variation/).

The important piece is that this didn’t require a custom single post template for
each category. I only needed to add a template part for the section of the page
that needed to change. This reduces code duplication.

---

The `render_block_data` filter doesn’t get nearly enough attention in the block
theme space. It’s a clean, low-footprint way to make your theme layouts genuinely
dynamic without duplicating templates. Once you have the pattern down, you’ll find
yourself reaching for it for all sorts of things—not just sidebars.

Give it a try and see what you come up with.

_Props to [@bph](https://profiles.wordpress.org/bph/), [@areziaal](https://profiles.wordpress.org/areziaal/),
[@welcher](https://profiles.wordpress.org/welcher/), and [@juanmaguitar](https://profiles.wordpress.org/juanmaguitar/)
for feedback on this article._

**Share the post: **

**Categories:** [Themes](https://developer.wordpress.org/news/category/themes/)

## 5 responses to “Dynamically loading template parts in block themes”

1.  ![Anh Tran Avatar](https://secure.gravatar.com/avatar/64b51769e7b80312023eb6c3f766cb512cf79adf7265812b15442f9573a9a056?
    s=40&d=identicon&r=g)
2.  [Anh Tran](https://metabox.io)
3.  [June 19, 2026](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/#comment-25178)
4.  This is a brilliant workaround! Thanks for sharing.
5.  TIL a new function `get_block_theme_folders()`, haven’t seen it before!
6.  A small note, I think this line should be rewritten like this:
7.  `if ( ! ( $post instanceof WP_Post ) ) {`
8.  [Reply](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/?replytocom=25178#respond)
9.   a. ![Justin Tadlock Avatar](https://secure.gravatar.com/avatar/8013a62d7397c006bae48b96d6832a573ea71a7d5d3597fe584210567b508c05?
     s=40&d=identicon&r=g)
     b. [Justin Tadlock](https://profiles.wordpress.org/greenshady/)
     c. [June 19, 2026](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/#comment-25182)
     d. It is a cool function. The important thing is that `get_block_theme_folders()`
     ensures that your code is compatible with the standard `templates` and `parts`
     folders and the older `block-` prefixed ones, regardless of what the theme uses.
     e. As for `! ( $post instanceof WP_Post ) )`, it’s functionally identical to `! 
         $post instanceof WP_Post`. The extra parentheses are unnecessary because `!`
     has a lower precedence than `instanceof`.
     f. [Reply](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/?replytocom=25182#respond)
     g.  a. ![Weston Ruter Avatar](https://secure.gravatar.com/avatar/63b496ec3806485229b4f934b26643dad6e734ca6e6ef7b38c846205b01cd37f?
     s=40&d=identicon&r=g)
     b. [Weston Ruter](https://weston.ruter.net/)
     c. [June 21, 2026](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/#comment-25311)
     d. It’s tricky because the operator precedence is different in JavaScript: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#not_an_instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#not_an_instanceof)
     e. I typically always include the parentheses just so devs (including me) don’t
     have to remember whether there is a problem here or not.
     f. [Reply](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/?replytocom=25311#respond)
10. ![WebMan Design | Oliver Juhas Avatar](https://secure.gravatar.com/avatar/34c19c0923466a5bf3c232ad7885b9985cd075c79ac0beb4b802c3ee80d71452?
    s=40&d=identicon&r=g)
11. [WebMan Design | Oliver Juhas](https://profiles.wordpress.org/webmandesign/)
12. [June 19, 2026](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/#comment-25180)
13. Amazing tutorial, as always, Justin! Thank you!
14. Just a small note:
    This only works when creating template part **files** or possibly
    when using English version of WordPress only. As currently it is not possible
    to set custom slug for Template Parts and Templates in Site Editor (check [issue #57629](https://github.com/WordPress/gutenberg/issues/57629)
    in Gutenberg GitHub repo).
15. [Reply](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/?replytocom=25180#respond)
16.  a. ![Justin Tadlock Avatar](https://secure.gravatar.com/avatar/8013a62d7397c006bae48b96d6832a573ea71a7d5d3597fe584210567b508c05?
     s=40&d=identicon&r=g)
     b. [Justin Tadlock](https://profiles.wordpress.org/greenshady/)
     c. [June 19, 2026](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/#comment-25181)
     d. I’ve never tried creating a template part in the Site Editor. I just always do
     it on the filesystem. That way, I have control over it.
     e. [Reply](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/?replytocom=25181#respond)

### Leave a Reply 󠀁[Cancel reply](https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/?ref=dailydev&output_format=md#respond)󠁿

Your email address will not be published. Required fields are marked *

Comment *

Name *

Email *

Website

Save my name, email, and website in this browser for the next time I comment.

Notify me of follow-up comments by email.

Notify me of new posts by email.

Δ

## Have an idea for a new post?

### 󠀁[Learn how to contribute](https://developer.wordpress.org/news/how-to-contribute/)󠁿

Share your knowledge with fellow WordPress developers.

Search

### 󠀁[Review tips and guidelines](https://developer.wordpress.org/news/tips-and-guidelines-for-writers/)󠁿

Everything you need to know about writing for the Blog.

## Subscribe to the Blog

Email Address

Join 1,884 other subscribers

* [About](https://wordpress.org/about/)
* [News](https://wordpress.org/news/)
* [Hosting](https://wordpress.org/hosting/)
* [Privacy](https://wordpress.org/about/privacy/)

* [Showcase](https://wordpress.org/showcase/)
* [Themes](https://wordpress.org/themes/)
* [Plugins](https://wordpress.org/plugins/)
* [Patterns](https://wordpress.org/patterns/)

* [Learn](https://learn.wordpress.org/)
* [Documentation](https://wordpress.org/documentation/)
* [Developers](https://developer.wordpress.org/)
* [WordPress.tv ](https://wordpress.tv/)

* [Get Involved](https://make.wordpress.org/)
* [Events](https://events.wordpress.org/)
* [Donate ](https://wordpressfoundation.org/donate/)
* [Five for the Future](https://wordpress.org/five-for-the-future/)

* [WordPress.com ](https://wordpress.com/?ref=wporg-footer)
* [Matt ](https://ma.tt/)
* [bbPress ](https://bbpress.org/)
* [BuddyPress ](https://buddypress.org/)

* [Visit our X (formerly Twitter) account](https://www.x.com/WordPress)
* [Visit our Bluesky account](https://bsky.app/profile/wordpress.org)
* [Visit our Mastodon account](https://mastodon.world/@WordPress)
* [Visit our Threads account](https://www.threads.net/@wordpress)
* [Visit our Facebook page](https://www.facebook.com/WordPress/)
* [Visit our Instagram account](https://www.instagram.com/wordpress/)
* [Visit our LinkedIn account](https://www.linkedin.com/company/wordpress)
* [Visit our TikTok account](https://www.tiktok.com/@wordpress)
* [Visit our YouTube channel](https://www.youtube.com/wordpress)
* [Visit our Tumblr account](https://wordpress.tumblr.com/)

![Code is Poetry](https://s.w.org/style/images/code-is-poetry-for-dark-bg.svg)

The WordPress® trademark is the intellectual property of the WordPress Foundation.