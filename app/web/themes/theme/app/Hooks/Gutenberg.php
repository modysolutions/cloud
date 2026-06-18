<?php

namespace App\Hooks;

class Gutenberg {
	public function init() : void {
		$this->action();
		$this->filter();
	}

	public function action() : void {
		add_action('after_setup_theme', [ $this, 'after_setup_theme']);
		add_action('init', [ $this, 'register_block_styles' ]);
	}

	public function filter() : void {}

	public function register_block_styles() : void {
		register_block_style( 'core/button', [
			'name'  => 'secondary',
			'label' => __( 'Secondary', 'theme' ),
		] );
	}

	public function after_setup_theme() : void {
		// Core FSE supports for template and editor parity.
		add_theme_support('post-thumbnails');
		add_theme_support('title-tag');
		add_theme_support('custom-logo', [
			'height' => 120,
			'width' => 400,
			'flex-height' => true,
			'flex-width' => true,
			'unlink-homepage-logo' => true,
		]);
		add_theme_support('block-templates');
		add_theme_support('block-template-parts');
		add_theme_support('editor-styles');
		add_theme_support('wp-block-styles');
		add_theme_support('responsive-embeds');
		add_theme_support('appearance-tools');

		// Load Google Fonts in the block editor for Open Sans and Montserrat.
		add_editor_style('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
		add_editor_style('assets/css/editor-style.css');

		// Keep editor suggestions focused on project-owned patterns.
		remove_theme_support('core-block-patterns');
	}
}