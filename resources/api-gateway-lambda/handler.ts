const promiseSimulator = () =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(`Hello ${process.env.MY_NAME}`);
    }, 300);
  });

export const handler = async function (event: unknown, context: unknown) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  const result = await promiseSimulator();
  return {
    statusCode: 200,
    body: result,
  };
};
