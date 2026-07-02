import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import metadata from '../../../../app/web/plugins/mody/blocks/submenu/block.json';

/**
 * mody/submenu — Level-2 submenu panel.
 *
 * Contains L2 mody/item blocks. Provides mody/navLevel = 2 via block context
 * so child items know they are at depth 2 and should allow mody/mega-panel.
 */

/**
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @return {JSX.Element} Editor UI.
 */
function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({
		className: 'mody-submenu',
		style: attributes.submenuBackgroundColor
			? { backgroundColor: attributes.submenuBackgroundColor }
			: undefined,
	});

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__('Submenu colors', 'mody')}
					colorSettings={[
						{
							value: attributes.submenuBackgroundColor,
							onChange: (value) =>
								setAttributes({
									submenuBackgroundColor: value || '',
								}),
							label: __('Submenu background color', 'mody'),
						},
					]}
				/>
			</InspectorControls>
			<ul {...blockProps}>
				<InnerBlocks
					allowedBlocks={['mody/item']}
					placeholder={
						<p className="mody-submenu__placeholder">
							{__('Add Level 2 submenu items.', 'mody')}
						</p>
					}
				/>
			</ul>
		</>
	);
}

/**
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} Saved HTML.
 */
function Save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: 'mody-submenu',
		style: attributes.submenuBackgroundColor
			? { backgroundColor: attributes.submenuBackgroundColor }
			: undefined,
	});

	return (
		<ul {...blockProps}>
			<InnerBlocks.Content />
		</ul>
	);
}

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	deprecated: [{ save: () => null }],
});
