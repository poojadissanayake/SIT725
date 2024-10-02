const expect = require("chai").expect;
const request = require("request");
// const chaiHttp = require("chai-http");

describe("Challenges API", function () {
    const baseUrl = "http://localhost:3000/challenges";

    it("renders challenges view correctly", function (done) {
        request(baseUrl, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.include("Challenges");
            done();
        });
    });
});