import { expect } from "chai";
import request from "request";

describe("Feedback API", function () {

    const serverUrl = "http://localhost:3000";

    //test the root route
    it("should return the index.html file", function (done) {
        request(`${serverUrl}/`, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.include('text/html');
            done();
        });
    });

    //successful feedback submission
    it("submits feedback successfully", function (done) {
        const feedbackData = {
            name: "Logan",
            email: "logan@abc.com",
            review: "Amazing coffee!"
        };

        request.post({
            url: `${serverUrl}/feedback`,
            json: feedbackData
        }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.have.property('message', 'Thank you for your feedback!');
            done();
        });
    });

    //retrieving all feedback
    it("retrieves all feedback", function (done) {
        request(`${serverUrl}/feedback`, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            const feedbackList = JSON.parse(body);
            expect(feedbackList).to.be.an('array');
            done();
        });
    });

});