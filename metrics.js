import xapi from 'xapi';

//init
xapi.Config.HttpClient.AllowHTTP.set('True'); //allow codec to do http
xapi.Config.HttpClient.AllowInsecureHTTPS.set('True'); //enable ssl 
xapi.Config.HttpClient.Mode.set('On'); //enable HTTP client to get the page
xapi.Config.Standby.Control.set('On'); //enable stanby mode
xapi.Config.Standby.Signage.Mode.set('On'); //enable signage mode
xapi.Config.RoomAnalytics.PeopleCountOutOfCall.set('On'); //enable count of person
xapi.Config.RoomAnalytics.PeoplePresenceDetector.set('On'); //enable people presence
xapi.Config.RoomAnalytics.ReverberationTime.Mode.set('On'); //not used on the macro
xapi.Config.RoomAnalytics.AmbientNoiseEstimation.Mode.set('On');//enable ambiant noise

const baseUrl = 'github.com/sensor-data';
const updateSec = 10;

async function updateUrl() {
  const temp = await xapi.Status.RoomAnalytics.AmbientTemperature.get();
  const hum = await xapi.Status.RoomAnalytics.RelativeHumidity.get();
  const anoise = await xapi.Status.RoomAnalytics.AmbientNoise.Level.A.get();
// AIR QUALITY 
//only avialable if RoomNavigator available
//  const airquality = await xapi.Status.RoomAnalytics.airquality.get();
  const url = baseUrl + '?temp=' + temp + '&humidity=' + hum + '&ambiantNoise=' +anoise; // + '&airquality' + airquality;
  xapi.Config.Standby.Signage.Url.set(url);
  console.log('signage url updated:', url);
}

setInterval(updateUrl, 1000 * updateSec); 
