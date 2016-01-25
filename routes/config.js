// Global Router Configuration

Router.configure({
  // Outer HTML Layout
  layoutTemplate: 'main'
});

Router.onBeforeAction("loading"); // Template to display while waiting on data
