export class TitleCaseValueConverter {
	toView (value) {
		return value
			.toLowerCase()
			.replaceAll(/(^[a-z]| [a-z])/g, (match) => match.toUpperCase())
	}
}
