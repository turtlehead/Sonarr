import React from 'react';
import styles from './LoadingMessage.css';

const messages = [
  'Downloading more RAM',
  'Now in Technicolor',
  'Previously on Sonarr...',
  'Bleep Bloop.',
  'Locating the required gigapixels to render...',
  'Spinning up the hamster wheel...',
  'at least you\'re not on hold',
  'hum something loud while others stare',
  'Loading humorous message... Please Wait',
  'I could\'ve been faster in Python',
  'Don\'t forget to rewind your episodes',
  'Congratulations! you are the 1000th visitor.',
  'HELP!, I\'m being held hostage and forced to write these stupid lines!',
  'RE-calibrating the internet...',
  'I\'ll be here all week',
  'Don\'t forget to tip your waitress',
  'Apply directly to the forehead',
  'Voted best App EVER!',
  'Loading Battlestation'
];

function LoadingMessage() {
  const index = Math.floor(Math.random() * messages.length);
  const message = messages[index];

  return (
    <div className={styles.loadingMessage}>
      {message}
    </div>
  );
}

export default LoadingMessage;
