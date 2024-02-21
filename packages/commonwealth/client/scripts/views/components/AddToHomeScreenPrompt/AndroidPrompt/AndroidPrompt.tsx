import React, { useState } from 'react';
import { CWCheckbox } from '../../component_kit/cw_checkbox';
import { CWText } from '../../component_kit/cw_text';
import { CWButton } from '../../component_kit/new_designs/cw_button';
import { HIDE_PROMPT } from '../constants';
import './AndroidPrompt.scss';

export const AndroidPrompt = (hidePromptAction: () => void) => {
  let installPromptEvent = null;
  const [showPrompt, setShowPrompt] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();

    installPromptEvent = event;
  });

  const handleInstallClick = () => {
    installPromptEvent.prompt();

    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  const handleCancelClick = () => {
    // Hide the prompt for the rest of the session
    sessionStorage.setItem(HIDE_PROMPT, 'true');
    setShowPrompt(false);
    // If the checkbox is checked, hide the prompt for N days
    if (checkboxChecked) {
      hidePromptAction();
    }
  };

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
  };

  return (
    <div className="android-home-screen-prompt">
      <div className="prompt-content">
        <CWText className="title">Install App</CWText>
        <div className="header">
          <div className="icon">
            <img src="/static/img/branding/common.svg" alt="Commonwealth" />
          </div>
          <div className="app">
            <CWText className="app-name">Common</CWText>
            <CWText className="app-url">common.xyz</CWText>
          </div>
        </div>
        <CWText className="description">
          For the best mobile experience we recommend installing the Common
          web-app.
        </CWText>
        <CWCheckbox
          className="hide-prompt"
          label="Show less often"
          onChange={handleCheckboxChange}
        />
        <div className="button-container">
          <CWButton
            buttonType="tertiary"
            className="prompt-button"
            label="Cancel"
            onClick={handleCancelClick}
          />
          <CWButton
            buttonType="tertiary"
            className="prompt-button"
            label="Install"
            onClick={handleInstallClick}
          />
        </div>
      </div>
    </div>
  );
};
