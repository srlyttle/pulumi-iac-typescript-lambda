import * as aws from "@pulumi/aws";
import { variables } from "../../variables";
import { handler } from "./handler";

export const setupLambdaWithApiGateway = () => {
  // Create the role for the Lambda to assume
  const lambdaRole = new aws.iam.Role("lambdaRole", {
    assumeRolePolicy: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "sts:AssumeRole",
          Principal: {
            Service: "lambda.amazonaws.com",
          },
          Effect: "Allow",
          Sid: "",
        },
      ],
    },
  });

  // Attach the fullaccess policy to the Lambda role created above
  const rolepolicyattachment = new aws.iam.RolePolicyAttachment(
    "lambdaRoleAttachment",
    {
      role: lambdaRole,
      policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
    }
  );

  // Create the Lambda to execute
  const lambda = new aws.lambda.CallbackFunction("promise-simulation-example", {
    runtime: "nodejs14.x",
    callback: handler,
    role: lambdaRole,
    environment: {
      variables: {
        MY_NAME: variables.myName,
      },
    },
  });

  // Give API Gateway permissions to invoke the Lambda
  const lambdapermission = new aws.lambda.Permission("lambdaPermission", {
    action: "lambda:InvokeFunction",
    principal: "apigateway.amazonaws.com",
    function: lambda,
  });

  // Set up the API Gateway
  const apigw = new aws.apigatewayv2.Api("httpApiGateway", {
    protocolType: "HTTP",
    routeKey: "GET /",
    target: lambda.invokeArn,
  });

  return apigw.apiEndpoint;
};
