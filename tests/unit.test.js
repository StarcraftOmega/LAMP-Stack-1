const {
	normalizeColor,
	isValidColor,
	buildLoginPayload,
	buildAddColorPayload,
	buildSearchPayload
} = require("../js/code.js");

describe("frontend color and payload helpers", () =>
{
	test("normalizes valid color text", () =>
	{
		expect(normalizeColor("  Midnight   Blue  ")).toBe("Midnight Blue");
		expect(isValidColor("Midnight Blue")).toBe(true);
	});

	test("rejects empty, oversized, and invalid color inputs", () =>
	{
		expect(normalizeColor("   ")).toBe("");
		expect(isValidColor("")).toBe(false);
		expect(isValidColor("A".repeat(51))).toBe(false);
		expect(isValidColor("blue<script>")).toBe(false);
		expect(buildAddColorPayload("", 1)).toBeNull();
		expect(buildAddColorPayload("Red", "not-a-user")).toBeNull();
	});

	test("builds login, add-color, and search JSON payloads", () =>
	{
		expect(JSON.parse(buildLoginPayload("  testuser ", "testpass")))
			.toEqual({login: "testuser", password: "testpass"});
		expect(JSON.parse(buildAddColorPayload("  Teal  ", 7)))
			.toEqual({color: "Teal", userId: 7});
		expect(JSON.parse(buildSearchPayload("  blue ", 7)))
			.toEqual({search: "blue", userId: 7});
	});
});
