const http = require("http");

const apiBaseUrl = process.env.API_BASE_URL || "http://127.0.0.1:8000";

function postJson(path, payload)
{
	const url = new URL(path, apiBaseUrl);

	return new Promise((resolve, reject) =>
	{
		const request = http.request(
			url,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Content-Length": Buffer.byteLength(JSON.stringify(payload))
				}
			},
			(response) =>
			{
				let body = "";
				response.setEncoding("utf8");
				response.on("data", (chunk) => {
					body += chunk;
				});
				response.on("end", () => {
					resolve({
						status: response.statusCode,
						body: JSON.parse(body)
					});
				});
			}
		);

		request.on("error", reject);
		request.end(JSON.stringify(payload));
	});
}

describe("PHP API integration", () =>
{
	test("Login.php returns a seeded user", async () =>
	{
		const response = await postJson("/LAMPAPI/Login.php", {
			login: "testuser",
			password: "testpass"
		});

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.objectContaining({
			id: expect.any(Number),
			firstName: "Test",
			lastName: "User",
			error: ""
		}));
		expect(response.body.id).toBeGreaterThan(0);
	});

	test("AddColor.php adds a color and returns the API error key", async () =>
	{
		const login = await postJson("/LAMPAPI/Login.php", {
			login: "testuser",
			password: "testpass"
		});
		const response = await postJson("/LAMPAPI/AddColor.php", {
			color: "JestBlue",
			userId: login.body.id
		});

		expect(response.status).toBe(200);
		expect(response.body).toEqual({error: ""});
	});

	test("SearchColors.php finds the added color", async () =>
	{
		const login = await postJson("/LAMPAPI/Login.php", {
			login: "testuser",
			password: "testpass"
		});
		const response = await postJson("/LAMPAPI/SearchColors.php", {
			search: "JestBlue",
			userId: login.body.id
		});

		expect(response.status).toBe(200);
		expect(response.body.error).toBe("");
		expect(response.body.results).toContain("JestBlue");
	});
});
