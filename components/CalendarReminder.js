import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Platform } from "react-native";
import Constants from "expo-constants";
import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";

function CalendarReminder() {
  const [calendars, setCalendars] = useState([]);
  const [granted, setGranted] = useState(false);
  const [defaultCalendar, setDefaultCalendar] = useState("");

  const openCalendarRequest = async () => {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if (status === "granted") {
      setGranted(true);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
        setCalendars(
          calendars.map((c) => c.name.toString() + "  " + c.source.name + "\n")
        );
      }
    })();
    const getDefault = async () => {
      const res = await Calendar.getDefaultCalendarAsync();
      console.log("Default Calendar::", res);
      setDefaultCalendar(res.id.toString() + "  " + res.source.name + "\n");
    };
    getDefault();
  }, []);

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar",
      color: "blue",
      entityType: Calendar.EntityTypes.REMINDER, //EVENT/REMINDER
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }

  async function createEventCalendar() {
    const eventDetails = {
      title: "Test Save Event 2",
      startDate: new Date("2021-06-04T20:00").toISOString(),
      endDate: new Date("2021-06-04T21:00").toISOString(),
      notes: "TestLink",
      alarms: [{ relativeOffset: 60 }],
    };
    const eventIdCalendar = await Calendar.createEventAsync(
      "8069DAC1-B35E-4C46-8703-85F1A2D057BC",
      eventDetails
    );
    console.log("Event detail:", eventDetails, "ID:", eventIdCalendar);
    Calendar.openEventInCalendar("7D613086-A438-4592-B08C-A478325515C3");
  }

  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendars = calendars.filter(
      (each) => each.source.name === "Default"
    );
    return defaultCalendars[0].source;
  }

  return (
    <>
      <Text>Calendarios: {calendars}</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
      <Button title="Create calendar event" onPress={createEventCalendar} />
      <Button
        title="Get default_calendars"
        onPress={getDefaultCalendarSource}
      />
      <Text>Default Calendar: {defaultCalendar}</Text>
    </>
  );
}

export default CalendarReminder;
