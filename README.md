# pulumi aws lambda with apigateway

> I wanted to dabble with pulumi to see how nice it was to use. In this repo there is a sample lambda that is exposed with an api gateway endpoint. All code uses typescript and targets AWS.

## Technologies Used

- Typescript
- Pulumi
- AWS

## Prerequisites

### Create an account on AWS (https://aws.amazon.com/).

You will need to setup the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) on your local system, if you haven't already.

### Create an account on Pulumi (https://pulumi.com/).

You will need to setup the [Pulumi CLI](https://www.pulumi.com/docs/get-started/aws/begin/) and configure it with AWS.

## Setup

Install the dependencies:  
`npm install`

Use Pulumi to setup the stack in the cloud:  
`pulumi up`

This command will set up a stack consisting of the lambda and associated role and permission and api gateway endpoint in AWS.

When the `pulumi up` command has finished running, you will get an output of the api endpoint that invokes the lambda.
