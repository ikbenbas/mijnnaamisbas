/**
 * Domain types for the espresso notes app.
 * These mirror the Hygraph content model (see README.md for field descriptions).
 */

export interface EspressoNote {
	id: string;
	title: string;
	date: string;
	bean: string;
	roaster: string | null;
	grindSize: number | null;
	dosage: number;
	yield: number;
	brewTime: number;
	temperature: number | null;
	pressure: number | null;
	notes: string | null;
	rating: number | null;
	methodType: string;
	createdAt: string;
	updatedAt: string;
}

export interface EspressoNoteInput {
	title: string;
	date: string;
	bean: string;
	roaster?: string;
	grindSize?: number;
	dosage: number;
	yield: number;
	brewTime: number;
	temperature?: number;
	pressure?: number;
	notes?: string;
	rating?: number;
	methodType: string;
}
