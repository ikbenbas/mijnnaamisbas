/**
 * Form validation utilities
 * Provides reusable validation functions for form inputs
 */

import { isValidUrl } from './url';

export type ValidationResult = {
	valid: boolean;
	error?: string;
};

/**
 * Validate required field
 * @param value - The value to validate
 * @param fieldName - Name of the field for error message
 * @returns Validation result
 */
export const validateRequired = (value: unknown, fieldName = 'This field'): ValidationResult => {
	if (!value || (typeof value === 'string' && !value.trim())) {
		return {
			valid: false,
			error: `${fieldName} is required`
		};
	}
	return { valid: true };
};

/**
 * Validate URL field
 * @param url - The URL to validate
 * @param required - Whether the field is required
 * @returns Validation result
 */
export const validateUrlField = (url: string | null | undefined, required = true): ValidationResult => {
	if (!url || !url.trim()) {
		if (required) {
			return {
				valid: false,
				error: 'URL is required'
			};
		}
		return { valid: true };
	}

	if (!isValidUrl(url)) {
		return {
			valid: false,
			error: 'Invalid URL format. Please use http:// or https://'
		};
	}

	return { valid: true };
};

/**
 * Validate string length
 * @param value - The string to validate
 * @param options - Validation options
 * @returns Validation result
 */
export const validateLength = (
	value: string,
	options: { min?: number; max?: number; fieldName?: string } = {}
): ValidationResult => {
	const { min, max, fieldName = 'This field' } = options;
	const length = value.trim().length;

	if (min !== undefined && length < min) {
		return {
			valid: false,
			error: `${fieldName} must be at least ${min} characters`
		};
	}

	if (max !== undefined && length > max) {
		return {
			valid: false,
			error: `${fieldName} must be at most ${max} characters`
		};
	}

	return { valid: true };
};

/**
 * Validate number range
 * @param value - The number to validate
 * @param options - Validation options
 * @returns Validation result
 */
export const validateRange = (
	value: number,
	options: { min?: number; max?: number; fieldName?: string } = {}
): ValidationResult => {
	const { min, max, fieldName = 'Value' } = options;

	if (min !== undefined && value < min) {
		return {
			valid: false,
			error: `${fieldName} must be at least ${min}`
		};
	}

	if (max !== undefined && value > max) {
		return {
			valid: false,
			error: `${fieldName} must be at most ${max}`
		};
	}

	return { valid: true };
};
