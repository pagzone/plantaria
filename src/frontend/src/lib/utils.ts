import { type ClassValue, clsx } from "clsx";
import parse from "html-react-parser";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getPlainTextFromHtml = (html: string): string => {
	const parsedHtml = parse(html);

	const extractText = (element: React.ReactNode): string => {
		if (Array.isArray(element)) {
			return element.map(extractText).join('\n');
		} else if (React.isValidElement(element) && element.props) {
			return extractText(element.props.children);
		} else if (typeof element === 'string') {
			return element;
		}
		return '';
	};

	const plainText = extractText(parsedHtml);

	return plainText.trim();
};