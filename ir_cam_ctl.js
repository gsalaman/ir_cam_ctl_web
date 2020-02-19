var connected=false;

function handleLowerCold()
{
  //document.getElementById("text").innerText = "Clicked Lower Cold!!!";

  message = new Paho.MQTT.Message("-");
  message.destinationName = "ir_cam_display/set/low_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/low_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/high_temp";
  client.send(message);
}

function handleRaiseCold()
{
  //document.getElementById("text").innerText = "Clicked Raise Cold!!!";

  message = new Paho.MQTT.Message("+");
  message.destinationName = "ir_cam_display/set/low_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/low_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/high_temp";
  client.send(message);
}

function handleLowerHot()
{
  //document.getElementById("text").innerText = "Clicked Lower Hot!!!";

  message = new Paho.MQTT.Message("-");
  message.destinationName = "ir_cam_display/set/high_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/low_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/high_temp";
  client.send(message);
}

function handleRaiseHot()
{
  //document.getElementById("text").innerText = "Clicked Raise Hot!!!";

  message = new Paho.MQTT.Message("+");
  message.destinationName = "ir_cam_display/set/high_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/low_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/high_temp";
  client.send(message);
}

function handleShutdown()
{
  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam/shutdown";
  client.send(message);
}

function updateHot(hotValue)
{
  document.getElementById("hotBound").innerText = hotValue;
}

function updateCold(coldValue)
{
  document.getElementById("coldBound").innerText = coldValue;
}

document.getElementById("text").innerText = "Disconnected";
//client = new Paho.MQTT.Client("broker", 9001, "client_name");
//client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "ir_cam_ctlr");
uniqueID = 10000*Math.random(10000);
client_name = "ir_cam_ctlr" + uniqueID;
document.getElementById("text").innerText = client_name;
//client = new Paho.MQTT.Client("mqttbroker", 9001, "ir_cam_ctlr" + uniqueID);
client = new Paho.MQTT.Client("mqttbroker", 9001, client_name);
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect()
{
  document.getElementById("text").innerText = "Connected";

  client.subscribe("ir_cam_display/value/#");

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/low_temp";
  client.send(message);

  message = new Paho.MQTT.Message("0");
  message.destinationName = "ir_cam_display/query/high_temp";
  client.send(message);
}

function onMessageArrived(message)
{
  if (message.destinationName == "ir_cam_display/value/low_temp")
  {
    // update the low temp value
    updateCold(message.payloadString);
  }
  else if (message.destinationName == "ir_cam_display/value/high_temp")
  {
    // update the high temp value
    updateHot(message.payloadString);
  }
}

document.getElementById("lowerColdButton").addEventListener("click", handleLowerCold);
document.getElementById("raiseColdButton").addEventListener("click", handleRaiseCold);
document.getElementById("lowerHotButton").addEventListener("click", handleLowerHot);
document.getElementById("raiseHotButton").addEventListener("click", handleRaiseHot);
//document.getElementById("shutdownButton").addEventListener("click", handleShutdown);
