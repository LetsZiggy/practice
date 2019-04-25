/* eslint-disable unicorn/no-null */

// https://stackoverflow.com/a/44044858/7641789
export const mockResponseObject = (data, init) => {
	data = data || { data: "PLACEHOLDER" }
	init = init || { status: 200, statusText: "OK" }

	const blob = new Blob(
		[JSON.stringify(data, null, 2)],
		{ type: "application/json" },
	)

	return (new Response(blob, init))
}
