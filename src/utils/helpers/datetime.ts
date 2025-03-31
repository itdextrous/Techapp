import moment from "moment-timezone";

// Function to update the displayed time
const UpdateTimeWithGMT = () => {
  // Get the user's time zone from the browser
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get the current time for the user's time zone
  const currentTime = moment.tz(userTimeZone).format('h:mm A');

  // Format the time zone offset in the required format
  const timeZoneOffsetFormatted = moment.tz(userTimeZone).format('Z').replace(/([+-])(\d{2}):(\d{2})/, 'GMT $1$2:$3');
  const currentTimeFormatted = `${currentTime} (${timeZoneOffsetFormatted})`;

  return currentTimeFormatted;
}

const UpdateTime = () => {
  // Get the user's time zone from the browser
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Get the current time for the user's time zone
  const currentTime = moment.tz(userTimeZone).format('h:mm A');

  // Format the time zone offset in the required format
  const timeZoneOffsetFormatted = moment.tz(userTimeZone).format('Z').replace(/([+-])(\d{2}):(\d{2})/, 'GMT $1$2:$3');

  // Combine the current time and time zone offset formatted
  const currentTimeFormatted = `${currentTime}`;

  // Update the displayed time
  return currentTimeFormatted;
}


const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const formatedDate = (dateString:any) =>{
  // Create a Date object from the ISO string
  const date = new Date(dateString);

  // Format the date to dd/mm/yyyy
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

if (day == 'NaN'){
  return null
}
  return `${day}/${month}/${year}`;
}


const convertMinutes = (totalMinutes: number) => {
  const minutesInADay = 1440;
  const minutesInAnHour = 60;

  // Calculate days
  const days = Math.floor(totalMinutes / minutesInADay);
  const remainingMinutesAfterDays = totalMinutes % minutesInADay;

  // Calculate hours
  const hours = Math.floor(remainingMinutesAfterDays / minutesInAnHour);
  const remainingMinutes = remainingMinutesAfterDays % minutesInAnHour;
  const result = [];

  if (days > 0) {
    result.push(`${days}${days > 0 && 'd'}`);
  }
  if (hours > 0) {
    result.push(`${hours}${hours > 0 && 'h'}`);
  }
  if (remainingMinutes > 0) {
    result.push(`${remainingMinutes}${remainingMinutes > 0 && 'min'}`);
  } else {
    result.push(`0min`);
  }

  return result.join(' ');
}

const formatDateString = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
  const localTime = new Date(milliseconds);
  // Get the parts of the date and time
  const options: any = { month: 'long', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  let hours = localTime.getHours();
  const minutes = String(localTime.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour time to 12-hour time
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${formattedDate}, ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

const convertDurationToMinutes = (durationString: string) => {
  // Split the duration string into components
  const components = durationString.split(' ');
  // Initialize variables for days, hours, and minutes
  let days = 0, hours = 0, minutes = 0;
  // Loop through each component to extract days, hours, and minutes
  components.forEach(component => {
    if (component.includes('d')) {
      days = parseInt(component.replace('d', ''));
    } else if (component.includes('h')) {
      hours = parseInt(component.replace('h', ''));
    } else if (component.includes('m')) {
      minutes = parseInt(component.replace('m', ''));
    }
  });
  // Calculate total minutes
  const totalMinutes = days * 24 * 60 + hours * 60 + minutes;
  return totalMinutes;
};

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);

  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
  const localTime = new Date(milliseconds);

  const utcDateString = localTime.toISOString();
  const localDate = new Date(utcDateString);

  const day = String(localDate.getDate()).padStart(2, '0');
  const monthIndex = date.getMonth(); // Months are zero-indexed
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[monthIndex];
  const year = String(localDate.getFullYear());

  let hours = localDate.getHours();
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${day} ${month} ${year} at ${hours}:${minutes} ${period}`;
}


const TimeDifference = (dateString:string | number | Date) => {
  const date = new Date(dateString);

  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
  const localTime = new Date(milliseconds);

  const utcDateString = localTime.toISOString();
  const localDate:any = new Date(utcDateString);

  // Get the current date-time
  const now:any = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now - localDate;

  // Convert time difference to a more human-readable format
  const differenceInSeconds = Math.floor(timeDifference / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  // Determine what to display
  let displayTime: string;

  if (differenceInSeconds < 60) {
    displayTime = "Now";
  } else if (differenceInMinutes < 60) {
    displayTime = `${differenceInMinutes} minutes ago`;
  } else if (differenceInHours < 24) {
    displayTime = `${differenceInHours} hours ago`;
  } else {
    displayTime = `${differenceInDays} days ago`;
  }

  return displayTime;
}

const formatDuration = (duration:number) =>{
  // Get minutes by dividing by 60 and taking the floor
  const minutes = Math.floor(duration / 60);
  // Get remaining seconds
  const seconds = Math.floor(duration % 60);

  // Pad single-digit seconds with a leading zero for display purposes
  const formattedSeconds = seconds.toString().padStart(2, '0');
  
  return `${minutes}:${formattedSeconds}`;
}

const getTime = {
  UpdateTimeWithGMT,
  UpdateTime,
  dateFormat,
  convertMinutes,
  formatDateString,
  convertDurationToMinutes,
  formatDate,
  formatedDate,
  TimeDifference,
  formatDuration
}
export default getTime;

