const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Testing API Endpoint Responses:", () =>
{
    describe("GET default path of the API /api/v1/", () =>
    {
        it("Should return a message that it is working with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/v1/").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(2);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("It works, home page!");

                done();
            });
        });
    });

    describe("GET hello world endpoint on /api/v1/hello-world", () =>
    {
        it("Should return a message that it is working with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/v1/hello-world").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(2);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("It works, Hello World");

                done();
            });
        });
    });

    describe("GET wind-forecast endpoint on /api/v1/wind-forecast", () =>
    {
        it("Should return a message error and a status code of NOT FOUND (404)", (done) =>
        {
            chai.request(app).get("/api/v1/wind-forecast").end((err, response) =>
            {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(2);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("Postcode not specified");

                done();
            });
        });

        it("Should return an empty array and a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/v1/wind-forecast/llllllll").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(2);
                expect(response.body).to.have.a.property("message").and.to.be.a("array").and.to.be.empty;

                done();
            });
        });

        it("Should return a message containing an array of objects with wind forecast and a status code of OK (200) ", (done) =>
        {
            chai.request(app).get("/api/v1/wind-forecast/ls97ug").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(2);
                expect(response.body).to.have.a.property("message").and.to.be.a("array").and.to.not.be.empty.and.to.include.a("object");

                done();
            });
        });
    });

    describe("GET unknown path", () =>
    {
        it("Should return a message endpoint is not found with a code of NOT FOUND (404)", (done) =>
        {
            chai.request(app).get("/api/").end((err, response) =>
            {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(2);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("Sorry, can't access the endpoint you are looking for");

                done();
            });
        });

        it("Should return a message endpoint is not found with a code of NOT FOUND (404)", (done) =>
        {
            chai.request(app).get("/api/v2").end((err, response) =>
            {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(2);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("Sorry, can't access the endpoint you are looking for");

                done();
            });
        });

        it("Should return a message endpoint is not found with a code of NOT FOUND (404)", (done) =>
        {
            chai.request(app).get("/api/dsadsad/v2/dsadasdsa").end((err, response) =>
            {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(2);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("Sorry, can't access the endpoint you are looking for");

                done();
            });
        });
    });

});
