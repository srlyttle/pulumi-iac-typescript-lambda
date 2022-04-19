import * as aws from "@pulumi/aws";

export const createCronTrigger = (
  lamdaFunction: aws.lambda.CallbackFunction<unknown, unknown>
) => {
  const morningTrigger = new aws.cloudwatch.EventRule("morningTrigger", {
    description: "Trigger lambda at 7 each morning",
    scheduleExpression: "cron(0 7 * * ? *)",
  });
  const lambda_target = new aws.cloudwatch.EventTarget("lambdaEventTarget", {
    rule: morningTrigger.name,
    arn: lamdaFunction.arn,
  });
  const lambdapermission = new aws.lambda.Permission("lambdaCronPermission", {
    action: "lambda:InvokeFunction",
    principal: "events.amazonaws.com",
    function: lamdaFunction,
    sourceArn: morningTrigger.arn,
  });
};
