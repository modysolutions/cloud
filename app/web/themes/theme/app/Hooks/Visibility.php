<?php

namespace App\Hooks;

/**
 * Content visibility — POC for dynamically swapping template parts.
 *
 * Technique: https://developer.wordpress.org/news/2026/06/dynamically-loading-template-parts-in-block-themes/
 *
 * When an anonymous user visits a single post, the render_block_data filter
 * intercepts the "post-content" template-part block and replaces its slug with
 * "post-content-anonymous" so the content gate is shown instead of the full article.
 *
 * Logged-in users receive the default "post-content" template part (full article).
 * No other blocks, pages, or template parts are affected.
 */
class Visibility {

	public function init(): void {
		add_filter( 'render_block_data', [ $this, 'filter_post_content_template_part' ], 10, 1 );
	}

	/**
	 * Swap "post-content" → "post-content-anonymous" for anonymous single-post visitors.
	 *
	 * @param array $parsed_block Parsed block data array.
	 * @return array Optionally modified parsed block data.
	 */
	public function filter_post_content_template_part( array $parsed_block ): array {
		// ── Fast exits ──────────────────────────────────────────────────────────
		// 1. Only act on the Template Part block.
		if ( ( $parsed_block['blockName'] ?? '' ) !== 'core/template-part' ) {
			return $parsed_block;
		}

		// 2. Only act on the specific "post-content" slug.
		if ( ( $parsed_block['attrs']['slug'] ?? '' ) !== 'post-content' ) {
//			return $parsed_block;
		}

		// 3. Only act on single post views.
		if ( ! is_singular( 'post' ) ) {
			return $parsed_block;
		}

		wp_die(print_r($parsed_block, true));
		// 4. Logged-in users always see the full content — nothing to swap.
		if ( is_user_logged_in() ) {
			return $parsed_block;
		}

		// ── Swap the slug ────────────────────────────────────────────────────────
		$anonymous_slug = 'post-content-anonymous';
		$parts_dir      = get_block_theme_folders()['wp_template_part'];

		if ( locate_template( "{$parts_dir}/{$anonymous_slug}.html" ) ) {
			$parsed_block['attrs']['slug'] = $anonymous_slug;
		}

		return $parsed_block;
	}
}

