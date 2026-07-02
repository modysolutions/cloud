import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import metadata from '../../../../app/web/plugins/mody/blocks/sidebar/block.json';

/**
 * mody/sidebar — Sidebar Navigation container.
 *
 * Edit: renders a <nav> landmark with InnerBlocks restricted to mody/item (L1).
 * Save: static HTML written to post content; frontend interactivity via mody-frontend.js.
 */

/**
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @return {JSX.Element} Editor UI.
 */
function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({
		'aria-label': attributes.ariaLabel,
		className: 'mody-sidebar',
		style: attributes.sidebarBackgroundColor
			? { backgroundColor: attributes.sidebarBackgroundColor }
			: undefined,
	});

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__('Sidebar colors', 'mody')}
					colorSettings={[
						{
							value: attributes.sidebarBackgroundColor,
							onChange: (value) =>
								setAttributes({
									sidebarBackgroundColor: value || '',
								}),
							label: __('Sidebar background color', 'mody'),
						},
					]}
				/>
				<PanelBody title={__('Accessibility', 'mody')}>
					<TextControl
						label={__('Navigation label (aria-label)', 'mody')}
						value={attributes.ariaLabel}
						onChange={(value) =>
							setAttributes({ ariaLabel: value })
						}
						help={__(
							'Describes the navigation region for screen readers.',
							'mody'
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<nav {...blockProps}>
				<ul className="mody-sidebar__list">
					<InnerBlocks
						allowedBlocks={['mody/item']}
						placeholder={
							<p className="mody-sidebar__placeholder">
								{__('Add Level 1 navigation items.', 'mody')}
							</p>
						}
					/>
				</ul>
			</nav>
		</>
	);
}

function Save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: 'mody-sidebar',
		'aria-label': attributes.ariaLabel || 'Sidebar navigation',
		style: attributes.sidebarBackgroundColor
			? { backgroundColor: attributes.sidebarBackgroundColor }
			: undefined,
	});

	return (
		<nav {...blockProps}>
			<button
				type="button"
				className="mody-sidebar__toggle"
				aria-label="Open navigation"
				aria-expanded="false"
			>
				<span className="mody-sidebar__hamburger" aria-hidden="true">
					<span></span>
					<span></span>
					<span></span>
				</span>
			</button>
			<div className="mody-sidebar__nav-wrap">
				<ul className="mody-sidebar__list">
					<InnerBlocks.Content />
				</ul>
			</div>
		</nav>
	);
}

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	deprecated: [{ save: () => null }],
});
