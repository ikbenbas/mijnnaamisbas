# Unified Design System

A comprehensive, accessible design system with OKLCH colors for consistent branding across the entire application.

## Brand Colors

- **Primary (Mint)**: `#17ffbe` → `oklch(0.89 0.18 166)`
- **Secondary (Pink)**: `#ef729e` → `oklch(0.70 0.16 350)`

## Why OKLCH?

OKLCH is a perceptually uniform color space that provides:
- **Better color manipulation**: Consistent lightness across hues
- **Accessibility**: Easier to maintain proper contrast ratios
- **Future-proof**: CSS Color Module Level 4 standard

## Design Tokens

All design tokens are defined in [`src/lib/styles/base/variables.css`](../../src/lib/styles/base/variables.css):

### Colors
- `--color-primary`, `--color-primary-light`, `--color-primary-dark`, `--color-primary-hover`
- `--color-secondary`, `--color-secondary-light`, `--color-secondary-dark`, `--color-secondary-hover`
- `--gradient-primary`, `--gradient-primary-hover`
- Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-inverse`
- Backgrounds: `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`
- States: `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- Borders: `--color-border-primary`, `--color-border-secondary`, `--color-border-focus`

### Spacing (8px base unit)
- `--space-xs` (4px) → `--space-3xl` (64px)

### Typography
- Font families: `--font-primary`, `--font-mono`
- Sizes: `--font-size-xs` (12px) → `--font-size-5xl` (48px)
- Weights: `--font-weight-normal` (400) → `--font-weight-bold` (700)
- Line heights: `--line-height-tight` (1.2) → `--line-height-relaxed` (1.75)

### Borders & Radius
- `--radius-xs` (2px) → `--radius-2xl` (16px), `--radius-full`

### Shadows
- `--shadow-sm` → `--shadow-xl`, `--shadow-focus`

### Transitions
- `--transition-fast` (150ms), `--transition-base` (250ms), `--transition-slow` (350ms)

### Z-Index Layers
- `--z-dropdown` (1000) → `--z-tooltip` (1070)

## Base Components

All base components are exported from `$lib` and follow WCAG 2.2 accessibility guidelines.

### Button

```svelte
<script>
	import { Button } from '$lib';
</script>

<Button variant="primary" size="md" onclick={() => alert('Clicked!')}>
	Click me
</Button>

<!-- Variants: default, primary, secondary, ghost, danger -->
<!-- Sizes: sm, md, lg -->
<!-- Props: fullWidth, disabled, loading -->
```

### Input

```svelte
<script>
	import { Input } from '$lib';
	let email = $state('');
</script>

<Input
	bind:value={email}
	type="email"
	label="Email Address"
	hint="We'll never share your email"
	required
/>
```

### Textarea

```svelte
<script>
	import { Textarea } from '$lib';
	let description = $state('');
</script>

<Textarea
	bind:value={description}
	label="Description"
	rows={5}
	hint="Maximum 500 characters"
/>
```

### Select

```svelte
<script>
	import { Select } from '$lib';
	let country = $state('');
</script>

<Select bind:value={country} label="Country" required>
	<option value="">Select a country</option>
	<option value="nl">Netherlands</option>
	<option value="be">Belgium</option>
</Select>
```

### Form

```svelte
<script>
	import { Form, Input, Button } from '$lib';

	const handleSubmit = () => {
		// Handle form submission
	};
</script>

<Form onsubmit={handleSubmit}>
	<Input bind:value={name} label="Name" required />
	<Button type="submit" variant="primary">Submit</Button>
</Form>
```

### Card

```svelte
<script>
	import { Card } from '$lib';
</script>

<Card variant="elevated" hoverable padding="lg">
	{#snippet header()}
		<h3>Card Title</h3>
	{/snippet}

	<p>Card content goes here</p>

	{#snippet footer()}
		<Button variant="primary">Action</Button>
	{/snippet}
</Card>

<!-- Variants: default, bordered, elevated -->
<!-- Padding: none, sm, md, lg -->
```

### Modal

```svelte
<script>
	import { Modal, Form, Input, Button } from '$lib';
	let showModal = $state(false);
</script>

<Modal bind:open={showModal} title="Add Item" maxWidth={600}>
	<Form>
		<Input label="Item name" required />
	</Form>

	{#snippet actions()}
		<Button variant="ghost" onclick={() => showModal = false}>Cancel</Button>
		<Button variant="primary" type="submit">Save</Button>
	{/snippet}
</Modal>
```

## Component Patterns

### Form with Validation

```svelte
<script>
	import { Form, Input, Textarea, Select, Button } from '$lib';

	let title = $state('');
	let description = $state('');
	let category = $state('');
	let errors = $state({});

	const handleSubmit = () => {
		errors = {};

		if (!title) errors.title = 'Title is required';
		if (!category) errors.category = 'Category is required';

		if (Object.keys(errors).length === 0) {
			// Submit form
		}
	};
</script>

<Form onsubmit={handleSubmit}>
	<Input
		bind:value={title}
		label="Title"
		error={errors.title}
		required
	/>

	<Textarea
		bind:value={description}
		label="Description"
		rows={5}
	/>

	<Select
		bind:value={category}
		label="Category"
		error={errors.category}
		required
	>
		<option value="">Select category</option>
		<option value="work">Work</option>
		<option value="personal">Personal</option>
	</Select>

	<Button type="submit" variant="primary" fullWidth>
		Submit
	</Button>
</Form>
```

### Card Grid

```svelte
<script>
	import { Card, Button } from '$lib';
</script>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-lg);">
	{#each items as item}
		<Card variant="bordered" hoverable>
			<h3>{item.title}</h3>
			<p>{item.description}</p>

			{#snippet footer()}
				<Button variant="primary" size="sm">View Details</Button>
			{/snippet}
		</Card>
	{/each}
</div>
```

## Accessibility Features

All components include:

✅ **Keyboard Navigation**: Full keyboard support
✅ **Focus Management**: Visible focus states with `--shadow-focus`
✅ **ARIA Attributes**: Proper roles, labels, and states
✅ **Screen Reader Support**: Semantic HTML and descriptive text
✅ **Color Contrast**: WCAG 2.2 AA minimum (AAA preferred)
✅ **Error Handling**: `role="alert"` for validation errors

## Migration Guide

### From Old Components

**Old:**
```svelte
<input type="text" placeholder="Name" />
<button class="btn-primary">Submit</button>
```

**New:**
```svelte
<Input label="Name" placeholder="Enter your name" />
<Button variant="primary">Submit</Button>
```

### From Espresso Styles

The espresso section now uses the unified design system. Replace:

**Old:**
```css
background: var(--color-accent);
color: var(--color-bg);
```

**New:**
```css
background: var(--gradient-primary);
color: var(--color-text-inverse);
```

## Best Practices

1. **Use Design Tokens**: Never use hardcoded colors or spacing
2. **Semantic HTML**: Use proper elements (`<button>` not `<div onclick>`)
3. **Component Composition**: Build complex UIs from base components
4. **Accessibility First**: Test with keyboard and screen readers
5. **Performance**: Components are lightweight and tree-shakeable

## Browser Support

- Chrome/Edge: 111+
- Firefox: 113+
- Safari: 16.4+

All modern browsers support OKLCH colors. Legacy fallbacks are not needed for this application.

## Further Reading

- [OKLCH Color Picker](https://oklch.com/)
- [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
