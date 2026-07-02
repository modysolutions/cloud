import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import metadata from '../../../../app/web/plugins/mody/blocks/mega-panel/block.json';

/**
 * mody/mega-panel — Level-3 mega-menu panel.
 *
 * An absolutely-positioned free-content container that appears when an L2 item
 * is activated. Editors can drop any block inside it.
 *
 * The `layout` attribute controls the CSS column structure.
 * The `width` attribute controls how wide the panel stretches.
 */

const LAYOUT_OPTIONS = [
	{ label: __('Single column', 'mody'), value: 'single' },
	{ label: __('Two columns', 'mody'), value: 'two-column' },
	{ label: __('Three columns', 'mody'), value: 'three-column' },
	{ label: __('Featured (2:1)', 'mody'), value: 'featured' },
];

const WIDTH_OPTIONS = [
	{ label: __('Auto (fits content)', 'mody'), value: 'auto' },
	{ label: __('Full width (100vw)', 'mody'), value: 'full' },
	{ label: __('Container (1160px)', 'mody'), value: 'container' },
];

/** Default inner blocks template — one columns block with a heading + list. */
const TEMPLATE = [
	[
		'core/columns',
		{ className: 'mody-mega-panel__columns' },
		[
			[
				'core/column',
				{},
				[
					[
						'core/heading',
						{
							level: 6,
							placeholder: __('Category heading…', 'mody'),
						},
					],
					['core/list', {}],
				],
			],
		],
	],
];

/**
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 */
function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({
		className: [
			'mody-mega-panel',
			`mody-mega-panel--layout-${attributes.layout}`,
			`mody-mega-panel--width-${attributes.width}`,
		].join(' '),
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Mega-panel settings', 'mody')}>
					<SelectControl
						label={__('Column layout', 'mody')}
						value={attributes.layout}
						options={LAYOUT_OPTIONS}
						onChange={(value) => setAttributes({ layout: value })}
						help={__(
							'Controls how inner content is arranged in columns.',
							'mody'
						)}
					/>
					<SelectControl
						label={__('Panel width', 'mody')}
						value={attributes.width}
						options={WIDTH_OPTIONS}
						onChange={(value) => setAttributes({ width: value })}
						help={__(
							'How wide the panel stretches when open.',
							'mody'
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks
					template={TEMPLATE}
					templateLock={false}
					placeholder={
						<p className="mody-mega-panel__placeholder">
							{__(
								'Add mega-menu content — any blocks are allowed.',
								'mody'
							)}
						</p>
					}
				/>
			</div>
		</>
	);
}

/**
 * @param {Object} props
 * @param {Object} props.attributes
 * @return {JSX.Element} Saved HTML.
 */
function Save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: [
			'mody-mega-panel',
			`mody-mega-panel--layout-${attributes.layout}`,
			`mody-mega-panel--width-${attributes.width}`,
		].join(' '),
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	deprecated: [{ save: () => null }],
});
