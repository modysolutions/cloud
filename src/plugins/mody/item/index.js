import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	URLInput,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import metadata from '../../../../app/web/plugins/mody/blocks/item/block.json';

const BORDER_STYLE_OPTIONS = [
	{ label: __('Default', 'mody'), value: '' },
	{ label: __('None', 'mody'), value: 'none' },
	{ label: __('Solid', 'mody'), value: 'solid' },
	{ label: __('Dashed', 'mody'), value: 'dashed' },
	{ label: __('Dotted', 'mody'), value: 'dotted' },
	{ label: __('Double', 'mody'), value: 'double' },
];

/**
 * Builds styles that belong on the visual link/button element.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object|undefined} React style object or undefined when empty.
 */
function getLinkStyle(attributes) {
	const {
		itemBackgroundColor,
		itemTextColor,
		itemPadding,
		itemBorderColor,
		itemBorderRadius,
		itemBorderStyle,
		itemBorderWidth,
	} = attributes;
	const styles = {};

	if (itemPadding) {
		styles.padding = itemPadding;
	}

	if (itemBackgroundColor) {
		styles.backgroundColor = itemBackgroundColor;
	}

	if (itemTextColor) {
		styles.color = itemTextColor;
	}

	if (itemBorderColor) {
		styles.borderColor = itemBorderColor;
	}

	if (itemBorderWidth) {
		styles.borderWidth = itemBorderWidth;
	}

	if (itemBorderStyle) {
		styles.borderStyle = itemBorderStyle;
	} else if (itemBorderColor || itemBorderWidth) {
		styles.borderStyle = 'solid';
	}

	if (itemBorderRadius) {
		styles.borderRadius = itemBorderRadius;
	}

	return Object.keys(styles).length ? styles : undefined;
}

/**
 * Builds styles that belong on the structural list item wrapper.
 *
 * @param {Object} attributes Block attributes.
 * @return {Object|undefined} React style object or undefined when empty.
 */
function getWrapperStyle(attributes) {
	const styles = {};

	if (attributes.itemMargin) {
		styles.margin = attributes.itemMargin;
	}

	return Object.keys(styles).length ? styles : undefined;
}

/**
 * Builds styles for the children panel container (submenu/mega-panel).
 *
 * @param {Object} attributes Block attributes.
 * @return {Object|undefined} React style object or undefined when empty.
 */
function getPanelStyle(attributes) {
	if (!attributes.itemChildrenGap) {
		return undefined;
	}

	return { marginTop: attributes.itemChildrenGap };
}

/**
 * mody/item — Navigation Item (L1 or L2).
 *
 * Edit: provides label/URL/style/target controls and InnerBlocks.
 * Save: static HTML mirroring render.php output.
 *
 * navLevel is received via block context and written back to attributes so the
 * save function (which cannot access context) can use it.
 */

/**
 * Edit component for mody/item.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @param {Object}   props.context       Block context.
 * @return {JSX.Element} Editor UI.
 */
function Edit({ attributes, setAttributes, context }) {
	const level = context['mody/navLevel'] ?? 1;
	const allowedChild = level === 1 ? ['mody/submenu'] : ['mody/mega-panel'];

	// Persist navLevel into attributes so save() can access it.
	useEffect(() => {
		if (attributes.navLevel !== level) {
			setAttributes({ navLevel: level });
		}
	}, [attributes.navLevel, level, setAttributes]);

	const blockProps = useBlockProps({
		className: [
			'mody-item',
			`mody-item--level-${level}`,
			`mody-item--${attributes.itemStyle}`,
		].join(' '),
		style: getWrapperStyle(attributes),
	});
	const linkStyle = getLinkStyle(attributes);
	const panelStyle = getPanelStyle(attributes);

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__('Item colors', 'mody')}
					colorSettings={[
						{
							value: attributes.itemBackgroundColor,
							onChange: (value) =>
								setAttributes({
									itemBackgroundColor: value || '',
								}),
							label: __('Background color', 'mody'),
						},
						{
							value: attributes.itemTextColor,
							onChange: (value) =>
								setAttributes({ itemTextColor: value || '' }),
							label: __('Text color', 'mody'),
						},
						{
							value: attributes.itemBorderColor,
							onChange: (value) =>
								setAttributes({ itemBorderColor: value || '' }),
							label: __('Border color', 'mody'),
						},
					]}
				/>
				<PanelBody title={__('Item settings', 'mody')}>
					{level <= 2 && (
						<SelectControl
							label={__('Style', 'mody')}
							value={attributes.itemStyle}
							options={[
								{
									label: __('Default', 'mody'),
									value: 'default',
								},
								{
									label: __('Button', 'mody'),
									value: 'button',
								},
								{
									label: __('Pill', 'mody'),
									value: 'pill',
								},
							]}
							onChange={(value) =>
								setAttributes({ itemStyle: value })
							}
							help={__(
								'Visual style applied to this navigation item.',
								'mody'
							)}
						/>
					)}
					<SelectControl
						label={__('Open in', 'mody')}
						value={attributes.target}
						options={[
							{
								label: __('Same tab', 'mody'),
								value: '_self',
							},
							{
								label: __('New tab', 'mody'),
								value: '_blank',
							},
						]}
						onChange={(value) => setAttributes({ target: value })}
					/>
				</PanelBody>
				<PanelBody
					title={__('Item spacing', 'mody')}
					initialOpen={false}
				>
					<TextControl
						label={__('Padding', 'mody')}
						value={attributes.itemPadding}
						onChange={(value) =>
							setAttributes({ itemPadding: value })
						}
						help={__(
							'CSS shorthand. Example: 0.5rem 1rem.',
							'mody'
						)}
					/>
					<TextControl
						label={__('Children panel gap', 'mody')}
						value={attributes.itemChildrenGap}
						onChange={(value) =>
							setAttributes({ itemChildrenGap: value })
						}
						help={__('CSS value. Example: 0.5rem, 8px.', 'mody')}
					/>
					<TextControl
						label={__('Margin', 'mody')}
						value={attributes.itemMargin}
						onChange={(value) =>
							setAttributes({ itemMargin: value })
						}
						help={__('CSS shorthand. Example: 0 0 1rem.', 'mody')}
					/>
				</PanelBody>
				<PanelBody
					title={__('Item border', 'mody')}
					initialOpen={false}
				>
					<SelectControl
						label={__('Border style', 'mody')}
						value={attributes.itemBorderStyle}
						options={BORDER_STYLE_OPTIONS}
						onChange={(value) =>
							setAttributes({ itemBorderStyle: value })
						}
					/>
					<TextControl
						label={__('Border width', 'mody')}
						value={attributes.itemBorderWidth}
						onChange={(value) =>
							setAttributes({ itemBorderWidth: value })
						}
						help={__('Example: 1px, 0.125rem, 2px.', 'mody')}
					/>
					<TextControl
						label={__('Border radius', 'mody')}
						value={attributes.itemBorderRadius}
						onChange={(value) =>
							setAttributes({ itemBorderRadius: value })
						}
						help={__('Example: 8px, 999px, 0.5rem.', 'mody')}
					/>
				</PanelBody>
			</InspectorControls>

			<li {...blockProps}>
				<div className="mody-item__row">
					<RichText
						tagName="span"
						className="mody-item__link"
						style={linkStyle}
						placeholder={__('Item label…', 'mody')}
						value={attributes.label}
						onChange={(value) => setAttributes({ label: value })}
						allowedFormats={[]}
					/>
				</div>
				<URLInput
					className="mody-item__url-input"
					value={attributes.url}
					onChange={(value) => setAttributes({ url: value })}
				/>
				<div
					className="mody-item__panel mody-item__panel--editor"
					style={panelStyle}
				>
					<InnerBlocks
						allowedBlocks={allowedChild}
						placeholder={
							<p className="mody-item__children-placeholder">
								{level === 1
									? __('Add a submenu (optional).', 'mody')
									: __(
											'Add a mega-panel (optional).',
											'mody'
										)}
							</p>
						}
					/>
				</div>
			</li>
		</>
	);
}

/**
 * Save component for mody/item.
 *
 * Renders the full <li> HTML that is stored in post content and served to
 * the frontend. The toggle button and panel wrapper are always present;
 * frontend.js removes them at runtime when the panel has no children.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} Saved HTML.
 */
function Save({ attributes }) {
	const { label, url, target, itemStyle, navLevel = 1 } = attributes;
	const isExternal = target === '_blank';

	const blockProps = useBlockProps.save({
		className: [
			'mody-item',
			`mody-item--level-${navLevel}`,
			`mody-item--${itemStyle}`,
		].join(' '),
		style: getWrapperStyle(attributes),
	});
	const linkStyle = getLinkStyle(attributes);
	const panelStyle = getPanelStyle(attributes);

	return (
		<li {...blockProps}>
			<div className="mody-item__row">
				{url ? (
					<a
						className="mody-item__link"
						href={url}
						style={linkStyle}
						target={isExternal ? '_blank' : undefined}
						rel={isExternal ? 'noopener noreferrer' : undefined}
					>
						<RichText.Content value={label} />
					</a>
				) : (
					<span
						className="mody-item__link mody-item__link--no-href"
						style={linkStyle}
					>
						<RichText.Content value={label} />
					</span>
				)}
				<button
					type="button"
					className="mody-item__toggle"
					aria-expanded="false"
				>
					<span
						className="mody-item__toggle-icon"
						aria-hidden="true"
					></span>
				</button>
			</div>
			<div className="mody-item__panel" style={panelStyle} hidden>
				<InnerBlocks.Content />
			</div>
		</li>
	);
}

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	deprecated: [{ save: () => null }],
});
