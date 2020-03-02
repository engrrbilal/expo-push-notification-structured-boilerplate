export default async function sendPushNotification(messageToSend) {
  console.log("#messageToSend : ", messageToSend);
  const message = {
    to: messageToSend.to,
    sound: "default",
    title: "Legermax Reporting Notification",
    body: "Income & Expenses !",
    data: { data: "goes here" }
  };
  console.log("#message : ", message);
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(messageToSend)
  });
  const data = response._bodyInit;
  console.log(
    `Status & Response ID in-> 1 : ${JSON.stringify(response.status)}`
  );
  return data;
}
