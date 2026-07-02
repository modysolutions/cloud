/**
 * Mody sidebar navigation — frontend interactive behaviour.
 *
 * Pure vanilla JS. No React, no jQuery, no external dependencies.
 * Handles:
 *  - L1 accordion expand/collapse
 *  - L2 mega-panel expand/collapse (closes siblings)
 *  - Full keyboard navigation (Enter, Space, Escape, Tab focus-trap in modal)
 *  - Mobile modal overlay with focus trapping
 *  - Resize handler (auto-close modal when exceeding breakpoint)
 */

const BREAKPOINT_MOBILE = 1024;

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
	document
		.querySelectorAll('.wp-block-mody-sidebar, .mody-sidebar')
		.forEach(initSidebar);
}

function initSidebar(sidebar) {
	// Remove toggle buttons and panel wrappers for items that have no inner
	// content. The save function always emits the toggle+panel pair; this
	// cleans them up at runtime so leaf items look and behave correctly.
	sidebar.querySelectorAll('.mody-item__panel').forEach((panel) => {
		if (!panel.children.length) {
			const item = panel.closest('.mody-item');
			if (item) {
				const toggle = item.querySelector(
					':scope > .mody-item__row > .mody-item__toggle'
				);
				if (toggle) {
					toggle.remove();
				}
			}
			panel.remove();
		}
	});

	// Item expand toggles (only those remaining after cleanup above)
	sidebar.querySelectorAll('.mody-item__toggle').forEach((btn) => {
		btn.addEventListener('click', () => togglePanel(btn));
		btn.addEventListener('keydown', handleToggleKeydown);
	});

	// Mobile hamburger
	const hamburger = sidebar.querySelector('.mody-sidebar__toggle');
	if (hamburger) {
		hamburger.addEventListener('click', () =>
			openModal(sidebar, hamburger)
		);
	}
}

// ─── Accordion toggle ─────────────────────────────────────────────────────────

function togglePanel(btn) {
	const isOpen = btn.getAttribute('aria-expanded') === 'true';

	// Close any open sibling at the same container level
	const parentLi = btn.closest('.mody-item');
	if (parentLi) {
		const siblings = parentLi.parentElement
			? parentLi.parentElement.querySelectorAll(
					':scope > .mody-item > .mody-item__row > .mody-item__toggle[aria-expanded="true"]'
				)
			: [];
		siblings.forEach((sibling) => {
			if (sibling !== btn) {
				closePanel(sibling);
			}
		});
	}

	if (isOpen) {
		closePanel(btn);
	} else {
		openPanel(btn);
	}
}

function openPanel(btn) {
	const panel = getPanelFor(btn);
	if (!panel) {
		return;
	}
	const item = btn.closest('.mody-item');
	btn.setAttribute('aria-expanded', 'true');
	if (item) {
		item.classList.add('mody-item--open');
	}
	panel.removeAttribute('hidden');
}

function closePanel(btn) {
	const panel = getPanelFor(btn);
	if (!panel) {
		return;
	}
	const item = btn.closest('.mody-item');
	btn.setAttribute('aria-expanded', 'false');
	if (item) {
		item.classList.remove('mody-item--open');
	}
	panel.setAttribute('hidden', '');

	// Recursively close any open children
	panel
		.querySelectorAll('.mody-item__toggle[aria-expanded="true"]')
		.forEach(closePanel);
}

function getPanelFor(btn) {
	const item = btn.closest('.mody-item');
	if (item) {
		const scopedPanel = item.querySelector(':scope > .mody-item__panel');
		if (scopedPanel) {
			return scopedPanel;
		}
	}

	const id = btn.getAttribute('aria-controls');
	return id ? document.getElementById(id) : null;
}

// ─── Keyboard navigation ──────────────────────────────────────────────────────

function handleToggleKeydown(e) {
	switch (e.key) {
		case 'Enter':
		case ' ':
			e.preventDefault();
			togglePanel(e.currentTarget);
			break;
		case 'Escape':
			if (e.currentTarget.getAttribute('aria-expanded') === 'true') {
				closePanel(e.currentTarget);
				e.currentTarget.focus();
			}
			break;
	}
}

// ─── Mobile modal ─────────────────────────────────────────────────────────────

let activeModal = null;
let modalTrigger = null;

function openModal(sidebar, trigger) {
	if (activeModal) {
		return;
	}

	modalTrigger = trigger;

	const ariaLabel = sidebar.getAttribute('aria-label') || 'Navigation';

	// Build modal DOM
	const modal = document.createElement('div');
	const backdrop = document.createElement('div');
	const inner = document.createElement('div');
	const closeBtn = document.createElement('button');

	modal.className = 'mody-modal';
	backdrop.className = 'mody-modal__backdrop';
	inner.className = 'mody-modal__inner';
	closeBtn.className = 'mody-modal__close';

	modal.setAttribute('role', 'dialog');
	modal.setAttribute('aria-modal', 'true');
	modal.setAttribute('aria-label', ariaLabel);
	closeBtn.setAttribute('aria-label', 'Close navigation');

	// Clone the nav-wrap so the original sidebar is unchanged
	const navWrap = sidebar.querySelector('.mody-sidebar__nav-wrap');
	const clone = navWrap
		? navWrap.cloneNode(true)
		: document.createElement('div');

	// Re-attach toggle listeners on the cloned DOM
	clone.querySelectorAll('.mody-item__toggle').forEach((btn) => {
		btn.addEventListener('click', () => togglePanel(btn));
		btn.addEventListener('keydown', handleToggleKeydown);
	});

	closeBtn.addEventListener('click', closeModal);
	backdrop.addEventListener('click', closeModal);

	inner.appendChild(closeBtn);
	inner.appendChild(clone);
	modal.appendChild(backdrop);
	modal.appendChild(inner);
	document.body.appendChild(modal);

	activeModal = modal;
	document.body.style.overflow = 'hidden';
	trigger.setAttribute('aria-expanded', 'true');

	// Listen for Escape at document level
	document.addEventListener('keydown', handleModalEscape);
	// Focus trap inside modal
	modal.addEventListener('keydown', trapFocus);

	// Move focus into the modal
	const firstFocusable = inner.querySelector(
		'button, a[href], input, [tabindex]:not([tabindex="-1"])'
	);
	if (firstFocusable) {
		firstFocusable.focus();
	}
}

function closeModal() {
	if (!activeModal) {
		return;
	}

	document.removeEventListener('keydown', handleModalEscape);
	document.body.style.overflow = '';
	activeModal.remove();
	activeModal = null;

	if (modalTrigger) {
		modalTrigger.setAttribute('aria-expanded', 'false');
		modalTrigger.focus();
		modalTrigger = null;
	}
}

function handleModalEscape(e) {
	if (e.key === 'Escape') {
		closeModal();
	}
}

function trapFocus(e) {
	if (e.key !== 'Tab' || !activeModal) {
		return;
	}

	const focusableSelectors =
		'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';
	const focusable = [...activeModal.querySelectorAll(focusableSelectors)];
	if (focusable.length === 0) {
		return;
	}

	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (e.shiftKey) {
		if (first.ownerDocument.activeElement === first) {
			e.preventDefault();
			last.focus();
		}
	} else if (last.ownerDocument.activeElement === last) {
		e.preventDefault();
		first.focus();
	}
}

// ─── Resize: close modal on desktop ──────────────────────────────────────────

window.addEventListener('resize', () => {
	if (window.innerWidth >= BREAKPOINT_MOBILE && activeModal) {
		closeModal();
	}
});

// ─── Boot ─────────────────────────────────────────────────────────────────────

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
